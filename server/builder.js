const path = require('path')
const fs = require('fs')
const gitP = require('simple-git/promise');
const Rsync = require('rsync');
const moment = require('moment');
const { WebClient } = require('@slack/client');

class Builder {
    constructor(job, server) {
        
        this.config = {
            job: job,
            server: server,
            workingDirectory: path.join(__dirname, `../repos/${job.source.service}_${job.source.username}`),
            localRepoPath: path.join(__dirname, `../repos/${job.source.service}_${job.source.username}/${job.source.repository}`),
            remoteUrl: `https://${job.source.username}@github.com/${job.source.username}/${job.source.repository}`
        }
        
        this.checkWorkingDirectoryPath()

        this.git = gitP(this.config.workingDirectory);
    }

    checkWorkingDirectoryPath() {
        if (!fs.existsSync(this.config.workingDirectory)) {
            fs.mkdirSync(this.config.workingDirectory)
        }   
    }
    
    getLocalRepositoryPath() {
        return fs.existsSync(this.config.localRepoPath)
    }


    clone(){
        return this.git.clone(this.config.remoteUrl)
    }
    
    pull(){
        this.git = gitP(this.config.localRepoPath);
        return this.git.pull()
    }

    createOrUpdateLocalRepo() {
        if(this.getLocalRepositoryPath()) {
            return this.pull()
        } else {
            return this.clone()
        }
    }

    slack(err, config) {
        if(this.config.job.slack
            && this.config.job.slack.token
            && this.config.job.slack.channel) {
            // const token = conf.job.slack.token;
            const token = this.config.job.slack.token
            const web = new WebClient(token);
            const channelId = this.config.job.slack.channel;
            // See: https://api.slack.com/methods/chat.postMessage
            const now = moment().format('DD-MM-YYYY HH:mm:ss')
            const message = err ? `Job ${config.job.title} errored!` : `Job ${config.job.title} successfully executed!`
            const icon = path.join(__dirname, '../app/icon.png')
            const options = {
                attachments: [
                  {
                    "fallback": message,
                    "color": err ? "#eb1515" : "#36a64f",
                    "author_icon": icon,
                    "title": `Job status update - ${now}`,
                    "text": message,
                    "image_url": icon,
                    "thumb_url": icon,
                    "footer": "Deployer",
                    "footer_icon": icon,
                    username: "Deployer",
                    as_user: true,
                  }
                ]
            }
            
            web.chat.postMessage(channelId, message, options)
                .then((res) => {
                    console.log('Message sent: ', res.ts);
                })
                .catch(console.error);
        }
    }

    syncLocalDirToServer(config) {
        return new Promise(function(resolve, reject) {
            const rsync = new Rsync()
                .shell('ssh')
                .flags('az')
                .source(config.localRepoPath)
                .destination(`${config.server.username}@${config.server.host}:${config.job.directory}`);

            // Execute the command
            rsync.execute(function(err, code, cmd) {
                // Async send slack message
                if(err) {
                    return reject({err, code, cmd})
                }
                resolve('s')
            });
        })
    }

    deploy() {
        return new Promise((resolve, reject) => {
            this.createOrUpdateLocalRepo()
                .then(() => {
                    return this.syncLocalDirToServer(this.config)
                })
                .then((s) => {
                    this.slack(null, this.config)
                    resolve(s)
                })
                .catch(err => {
                    this.slack(err, this.config)
                    reject(err)
                })
        })
    }
}

module.exports = Builder