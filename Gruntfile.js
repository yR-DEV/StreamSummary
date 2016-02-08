'use-strict';

module.exports = function(grunt) {

      require('load-grunt-tasks')(grunt);
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-qunit');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-execute');

      //initial project configuration
      grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            //configurable paths
            dirs: {
                  client: require('./bower.json').appPath || 'client',
                  server: 'server',
                  dist: 'dist'
            },

            //cleaning the distribution directory
            clean: {
                  dist: {
                        files: [{
                              src: ['<%= dirs.dist']
                        }]
                  },
                  server: '.tmp'
            },


            //babel to convert es6 to usable es5
            // babel: {
            //       options: {
            //             sourceMap: true,
            //             presets: ['es2015'],
            //             modules: 'common'
            //       },
            //       client: {
            //             files: [{
            //                   expand: true,
            //             }]
            //       },
            // }

            //concatenates all the js files together
            concat: {
                  options: {
                        //defines a string ti put between each file in the concat'd output
                        separator: ','
                  },
                  dist: {
                        //source files to concatenate
                        src: ['./client/**/*.js'],
                        //the location of the resulting js file
                        dest: './dist/client/all.js'
                  }
            },
            //minifies all of the concatenated files
            uglify: {
                  options: {
                        //at the top of the output (file?)
                        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                  },
                  dist: {
                        files: {
                              'dist/client/all.min.js': ['<%= concat.dist.dest %>']
                        }
                  }
            },
            //unit testing
            qunit: {
                  files: ['test/**/*.html']
            },
            //javascript hints/validation
            jshint: {
                  //defining the files to validate through js hint
                  files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
                  //configuring jshint, docs are on the website
                  options: {
                        //options that override jshint defaults go here
                        globals: {
                              jQuery: true,
                              console: true,
                              modue: true
                        }
                  }
            },
      });

      //task for testing
      grunt.registerTask('test', ['jshint', 'qunit']);

      //default task. runs when `grunt` is run from terminal
      grunt.registerTask('default', [ 'concat' , 'uglify' ]);

};
