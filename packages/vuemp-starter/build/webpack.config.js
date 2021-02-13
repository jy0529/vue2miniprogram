const path = require('path');
const glob = require('glob');
const relative = require('relative');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
  
function getEntry(src) {
    let entries = {};
    glob.sync(src + '/pages/**/main.js')
        .forEach(file => {
            let key = relative(src, file).replace('.js', '');
            entries[key] = file;
        })
    return entries;
}

const webpackConfig = {
    mode: 'development',
    entry: getEntry(resolve('src')),
    devtool: false,
    output: {
        path: resolve('dist'),
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
          'vue': 'vuemp',
          '@': resolve('src')
        },
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve('static'),
                    to: resolve('dist/static/'),
                },
                {
                    from: resolve('src/app.json'),
                    to: resolve('dist'),
                },
                {
                    from: resolve('project.config.json'),
                    to: resolve('dist'),
                },
            ]
        }),
    ],
};

module.exports = {
    webpackConfig,
}