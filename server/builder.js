const path = require('path')
const fs = require('fs')
const gitP = require('simple-git/promise');
const Rsync = require('rsync');


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

    syncLocalDirToServer(config) {
        return new Promise(function(resolve, reject) {
            const rsync = new Rsync()
                .shell('ssh')
                .flags('az')
                .source(config.localRepoPath)
                .destination(`${config.server.username}@${config.server.host}:${config.job.directory}`);

            // Execute the command
            rsync.execute(function(err, code, cmd) {
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
                .then((s) => resolve(s))
                .catch(err => reject(err))
        })
    }
}

module.exports = Builder