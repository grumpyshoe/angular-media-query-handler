'use strict';

module.exports = function(grunt) {
  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['src/{,**/}*.js'],
        tasks: ['build'],
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
    },
    yo: {
      src: 'src',
      dist: 'dist'
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['.tmp', '<%= yo.dist %>/*', '!<%= yo.dist %>/.git*']
        }]
      },
      server: '.tmp'
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= yo.src %>/{,*/}*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    // karma: {
    //   options: {
    //     configFile: 'karma.conf.js',
    //     browsers: ['PhantomJS']
    //   },
    //   unit: {
    //     singleRun: true
    //   },
    //   server: {
    //     autoWatch: true
    //   }
    // },
    ngmin: {
      dist: {
        src: ['<%= yo.src %>/<%= pkg.name %>.js'],
        dest: '<%= yo.dist %>/<%= pkg.name %>.js'
      }
    },
    concat: {
      options: {
        stripBanners: true
      },
      dist: {
        src: ['<%= yo.src %>/<%= pkg.name %>.js'],
        dest: '<%= yo.dist %>/<%= pkg.name %>.js'
      }
    },
    sass: { // Task
      dist: { // Target
        options: { // Target options
          style: 'expanded',
          debugInfo: false
        },
        files: { // Dictionary of files
          '<%= yo.dist %>/<%= pkg.name %>.css': '<%= yo.src %>/<%= pkg.name %>.scss'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yo.dist %>/<%= pkg.name %>.min.js': ['<%= yo.dist %>/<%= pkg.name %>.js']
        }
      }
    }

  });

  grunt.registerTask('build', [
    'clean:dist',
    'concat:dist',
    'ngmin:dist',
    'uglify:dist',
    'sass:dist'
  ]);
  grunt.registerTask('default', [
    'build'
  ]);
};
