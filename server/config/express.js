'use-strict';

//node module exports
import express from 'express';
import path from 'path';
import favicon from 'favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';

//development server configuration
import config from './development';

module.exports = function(app) {
      //loading env
      let env = app.get('env');

      //setting views and view engines
      app.set('views', config.root + '/client/');
      app.engine('html', require('ejs').renderFile);
      app.set('view engine', 'html');

      //compression, middlewear, and parsers
      app.use(compression());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      app.use(methodOverride());
      app.use(cookieParser());

      app.set('appPath', path.join(config.root + '/client/'));

      if('production' === env) {
            app.use(favicon(path.join(config.root, '/client/', 'favicon.ico')));
            app.use(express.static(app.get('appPath')));
            app.use(morgan('dev'));
      }

      if('development' === env) {
            app.use(require('connect-livereload')());
      }

      if('development' === env || 'test' === env) {
            app.use(express.static(path.join(config.root, '.tmp')));
            app.use(express.static(app.get('appPath')));
            app.use(morgan('dev'));
            app.use(errorHandler()); //error handler HAS to be last.
      }
}
