const express = require('express');
const path = require('path');
const fs = require('fs');

const key = fs.readFileSync('deu.key');
const cert = fs.readFileSync('deu.crt');
const https = require("https");

const app = express();


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = https.createServer({key, cert}, app);
const port = 8080;

server.listen(port, () => { 
  console.log('Server is listening..');
});
