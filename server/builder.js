const path = require('path')
const fs = require('fs')
const gitP = require('simple-git/promise');
const gulp = require('gulp')
const rsync = require('gulp-rsync')

class Builder {
    constructor(data) {
        this.rsyncConf = {
            progress: true,
            incremental: true,
            relative: true,
            emptyDirectories: true,
            recursive: true,
            syncDest: true,
            // clean: true,
            hostname: '',
            username: '',
            destination: '',
            exclude: [
               // 'EXLUDED_FOLDERS'
              './node_modules',
              '.notes',
              '.vscode',
              'bot.log'
            ]
        }

        this.config = data

        this.workingDirectory = null
        this.localRepoPath = null

        this.workingDirectory = path.join(__dirname, `../repos/${data.gitProvider}_${data.gitUser}`)
        this.localRepoPath = path.join(this.workingDirectory, `/${data.gitRepository}`)

        this.rsyncPaths = [ this.localRepoPath ]

        this.remoteUrl = 'https://shakogegia:shakogegia@github.com/shakogegia/vue.js-georgian-keyboard'

        this.checkWorkingDirectoryPath()

        this.git = gitP(this.workingDirectory);

        // this.syncLocalDirToServer = this.syncLocalDirToServer().bind(this)
    }

    checkWorkingDirectoryPath() {
        if (!fs.existsSync(this.workingDirectory)) {
            fs.mkdirSync(this.workingDirectory)
        }   
    }
    
    getLocalRepositoryPath() {
        return fs.existsSync(this.localRepoPath)
    }


    clone(){
        return this.git.clone(this.remoteUrl)
    }
    
    pull(){
        this.git = gitP(this.localRepoPath);
        return this.git.pull()
    }

    createOrUpdateLocalRepo() {
        if(this.getLocalRepositoryPath()) {
            return this.pull()
        } else {
            return this.clone()
        }
    }

    syncLocalDirToServer(rsyncdPaths, rsyncConf) {
        console.log("rsyncdPaths")
        return new Promise(function(resolve, reject) {
            // resolve()
            // gulp.src(rsyncdPaths)
            //     .pipe(rsync(rsyncConf))
            //     .on('end', resolve)
            //     .on('error', reject)
        })
    }

    deploy() {
        const syncLocalDirToServer = this.syncLocalDirToServer(this.rsyncdPaths, this.rsyncConf)
        return new Promise((resolve, reject) => {
            
            this.createOrUpdateLocalRepo()
                // .syncLocalDirToServer()
                .then(() => resolve())
                .catch(err => reject)

        })
    }
}

module.exports = Builder