const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs')
const gitP = require('simple-git/promise');

const Builder = require("./builder")

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// app.set('views', __dirname + '/client/views');
app.use(express.static( path.join(__dirname, '../dist') ))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
});

app.get('/', (request, response) => {
    // response.sendFile('../dist/index.html', {root: __dirname })
    response.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.get('/build', (request, response) => {
    const data = {
        repository: 'git@bitbucket.org:shakogegia/vue.js-georgian-keyboard.git',
        gitProvider: "github",
        gitUser: "shakogegia",
        gitRepository: "vue.js-georgian-keyboard",
    }

    // const workingDirectory = path.join(__dirname, `../repos/${data.gitProvider}_${data.gitUser}`)
    // const localRepoPath = path.join(workingDirectory, `/${data.gitRepository}`)

    const builder = new Builder(data);

return    builder.deploy()
            .then(() => {
                // repoFetched(localRepoPath)
                response.send({finished: true})
            })
            .catch((err) => response.send({err: err}))
            .catch((err) => response.send({err: err}))
    

    // const workingDirectory = path.join(__dirname, `../repos/github`)
    const workingDirectory = path.join(__dirname, `../repos/${data.gitProvider}_${data.gitUser}`)
    const localRepoPath = path.join(workingDirectory, `/${data.gitRepository}`)

    // const PASS = 'shakogegia';
    // const REPO = 'bitbucket.com/username/plot';

    // const remote = `https://${data.gitUser}:${PASS}@${REPO}`;

   

    const USER = 'shakogegia';
    const PASS = 'shakogegia';
    const REPO = 'github.com/shakogegia/vue.js-georgian-keyboard';
    const remote = `https://${USER}:${PASS}@${REPO}`;

    if (!fs.existsSync(workingDirectory)) {
        fs.mkdirSync(workingDirectory)
    }    

    let git = gitP(workingDirectory);

    if (!fs.existsSync(localRepoPath)) {
        
        git.clone(remote)
            .then(() => {
                repoFetched(localRepoPath)
                response.send({finished: true})
            })
            .catch((err) => response.send({err: err}))
    
    } else {

        let git = gitP(localRepoPath);

        git.pull()
            .then(() => {
                repoFetched(localRepoPath)
                response.send({finished: true})
            })
            .catch((err) => response.send({err: err}))
    
        // response.send({})

    }


})


function repoFetched(localRepoPath) {
    console.log(localRepoPath)
}


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})
