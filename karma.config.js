var path = require('path');

var TEST_DIR = path.resolve(__dirname, 'test');

var webpackConfig = require('./webpack.config');
webpackConfig.resolve.alias.testdata = TEST_DIR + "/testdata";

module.exports = function(config) {
    config.set({
        basePath: TEST_DIR,
        files: [
            { pattern: '**/*.spec.js', watched: false, included: true, served: true }
        ],
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['progress'],
        preprocessors: {
            '**/*.spec.js': ['webpack']
        },
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    }
                ]
            },
            resolve: webpackConfig.resolve,
            watch: true
        },
        webpackServer: {
            noInfo: true
        }
    });
};
