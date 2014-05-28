module.exports = function(grunt) {

  var paths = {
    js: ['*.js', 'server/**/*.js', 'public/**/*.js', 'test/**/*.js', '!test/coverage/**', '!public/system/lib/**', 'packages/**/*.js'],
    html: ['public/**/views/**', 'server/views/**', 'packages/**/public/**/views/**', 'packages/**/server/views/**'],
    css: ['public/**/css/*.css', '!public/system/lib/**', 'packages/**/public/**/css/*.css']
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'public/core.min.js' : 'public/core.js'
        }
      }
    },
    watch: {
      js: {
        files: paths.js,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      html: {
        files: paths.html,
        options: {
          livereload: true
        }
      },
      css: {
        files: paths.css,
        tasks: ['csslint'],
        options: {
          livereload: true
        }
      }
    },
    nodemon: {
      dev: {
      script: 'server.js',
        options: {
          args: [],
          ignore: ['public/**', 'node_modules/**'],
          ext: 'js,html',
          nodeArgs: ['--debug'],
          delayTime: 1,
          env: {
            PORT: 8080
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['watch', 'nodemon'],
      options: {
        logConcurrentOutput: true
      }
    }
  });
    
  // Load the plugin that provides the "uglify" task.
  require('load-grunt-tasks')(grunt);   

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concurrent']);

};
