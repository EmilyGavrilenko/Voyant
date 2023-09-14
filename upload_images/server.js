// Set up absolute paths
require('module-alias/register')

// Include and initialize Express
const express = require("express")
const app = express()

// Properly parse and read server calls
const bodyParser = require('body-parser')
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 * Only allow the backend methods to be accessed from rydecarpoool.com on the production server
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', "GET,HEAD,PUT,PATCH,POST,DELETE")
    res.header('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization')

    next()
})

/*
 * Create new files in src and import them here
 */
var images = require('./src/images.js')
app.use('/images', images)

app.get('/', (req, res) => {
    res.send('Hello world')
})

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});

// Create the express server
var http = require('http');
var server = http.createServer(app);

// Start the Express Server
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));

module.exports = app;
