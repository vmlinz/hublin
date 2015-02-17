'use strict';

/**
 *
 * @param {object} grunt
 */
module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      }
    },

    splitfiles: {
      options: {
        chunk: 10
      },
      backend: {
        options: {
          common: ['test/unit-backend/all.js'],
          target: 'mochacli:backend'
        },
        files: {
          src: ['test/unit-backend/**/*.js']
        }
      },
      midway: {
        options: {
          common: ['test/midway-backend/all.js'],
          target: 'mochacli:midway'
        },
        files: {
          src: ['test/midway-backend/**/*.js']
        }
      }
    },
    mochacli: {
      options: {
        require: ['chai', 'mockery'],
        reporter: 'spec',
        timeout: process.env.TEST_TIMEOUT || 20000
      },
      backend: {
        options: {
          files: ['test/unit-backend/all.js', grunt.option('test') || 'test/unit-backend/**/*.js']
        }
      },
      midway: {
        options: {
          files: ['test/midway-backend/all.js', grunt.option('test') || 'test/midway-backend/**/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.loadTasks('tasks');

  grunt.registerTask('test-unit-backend', 'run the backend unit tests (to be used with .only)', ['splitfiles:backend']);
  grunt.registerTask('test-midway-backend', 'run midway tests (to be used with .only)', ['splitfiles:midway']);
  grunt.registerTask('test-backend', 'run both the unit & midway tests', ['test-unit-backend', 'test-midway-backend']);

  grunt.registerTask('test', ['test-backend']);
  grunt.registerTask('default', ['test']);
};
