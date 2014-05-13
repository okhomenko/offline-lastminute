// Karma configuration
// Generated on Sun May 11 2014 16:39:08 GMT+0300 (EEST)

module.exports = function (config) {
    'use strict';
    config.set({

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/js/**/*.js': ['coverage']
        },

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'sinon-chai'],


        // list of files / patterns to load in the browser
        files: [
            'app/js/modules.js',
            'app/js/deps/utils.js',
            'app/js/deps/*.js',
            'test/**/*.js'
        ],


        // list of files to exclude
        exclude: [
            '**/*.swp'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO

    });
};
