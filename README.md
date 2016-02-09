STREAMS SUMMARY
=====

## Getting Started

### What ya need

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt  grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod` in a separate shell


### Set up for development

1. `npm install` to install server dependencies.

2. `bower install` to install front-end dependencies.

3. `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready, and update upon changes to files.


## buildin and developin

Run `grunt build` for building and `grunt serve` for preview.


## Testing

Running `npm test` will run the unit tests with karma.
