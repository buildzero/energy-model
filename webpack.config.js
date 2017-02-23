var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'dist');

var config = {
    entry: {
        model: SRC_DIR + "/model/model.js"
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].bundle.js',
        libraryTarget: 'amd'
    },
    module: {
        loaders: [
            {
                test : /\.js$/,
                include : SRC_DIR,
                loader : 'babel'
            }
        ]
    },
    resolve: {
        extensions: ["", ".webpack.js", ".js"],
        alias: {
            "model": SRC_DIR + "/model",
            "util":  SRC_DIR + "/util",
            "underscore": __dirname + "/node_modules/underscore/underscore-min.js",
        }
    }
};

module.exports = config;
