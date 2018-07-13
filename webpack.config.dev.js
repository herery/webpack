const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entryConfig = require('./webpack.config.entry');

let config = {
    entry: entryConfig,
    output: {
        'path': path.resolve(__dirname, 'build'),
        'filename': '[name]/[name].js'
    },
    module: {
        'rules': [{
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                'test': /\.css$/,
                'use': ExtractTextPlugin.extract({
                    'fallback': 'style-loader',
                    'use': [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ]
                })
            },
            {
                'test': /\.less$/,
                'use': ExtractTextPlugin.extract({
                    'fallback': 'style-loader',
                    'use': [
                        'css-loader',
                        'postcss-loader',
                        'less-loader',
                    ]
                })
            },
            {
                'test': /\.js$/,
                'loader': 'babel-loader',
                'exclude': /node_modules/
            }
        ]
    },
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        port: '4321',
        host: '127.0.0.1',
        overlay: {
            errors: true,
        },
        open: true,
        hot: true
    },
    plugins: [
        new ExtractTextPlugin('[name]/main.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]

};

Object.keys(entryConfig).forEach(
    (item) => {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: 'src/pages/' + item + '/' + item + '.html',
                filename: 'src/pages/' + item + '/' + item + '.html',
                inject: 'head',
                chunks: [item],
                minify: {
                    removeComments: true,
                    collopaseWhitespace: true,
                }
            }));
    }
);

console.log(JSON.stringify(config));

module.exports = config;