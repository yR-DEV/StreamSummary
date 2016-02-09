//Main application file
//Express backend
'use-strict';

//imports hopefully grunt works here
//I feel like I have to use express grunt to compile everything
import express from 'express';
import path from 'path';
import config from './development';

//setting up the server
import http from 'http';
let app = express();
let server = http.createServer(app);

//Starting the server
function startServer() {
      server.listen(config.port, function() {
            console.log('** EXPRESS SERVER **');
            console.log('*** LISTENING ON ***');
            console.log('PORT: ' + config.port);
      })
}

setImmediate(startServer);

//exposing the application
exports = module.exports = app;
