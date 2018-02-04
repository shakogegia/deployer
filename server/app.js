const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const path = require('path')
const Datastore = require('nedb')
const db = new Datastore({ filename: path.join(__dirname, './database.db'), autoload: true });


const Builder = require("./builder")

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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
                err: err.message || err
            })
        })
})

app.post('/db', (request, response) => {
    let data = {
        name: 'SERVERS',
        id: 1,
        data: request.body.data
    }
    db.update({ id: 1 }, data, {upsert: true}, function (err, numReplaced) {
        response.send(data)
    });
})

app.get('/db', (request, response) => {
    db.findOne({ id: 1 }, function (err, doc) {
        const servers = doc ? doc.data : []
        response.send({servers:  servers})
    });
})



app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})
