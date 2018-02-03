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
app.use(express.static( path.join(__dirname, '../app') ))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
});

app.get('/', (request, response) => {
    // response.sendFile('../app/index.html', {root: __dirname })
    response.sendFile(path.join(__dirname, '../app/index.html'))
})

app.post('/build', (request, response) => {
    const job = request.body.job
    const server = request.body.server

    const builder = new Builder(job, server);

    builder.deploy()
        .then(() => {
            response.send({job, server})
        })
        .catch((err) => {
            response.status(500).send({
                message: 'Something broke!',
                err
            })
        })
})



app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})
