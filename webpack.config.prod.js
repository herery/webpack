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
    // 'externals': {
    //     'jquery': 'window.jQuery'
    // },
    module: {
        'rules': [{
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
    plugins: [
        new CleanWebpackPlugin(['build']),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: 'base.js'
        // }),
        new ExtractTextPlugin('[name]/[name].css'),
        // new HtmlWebpackPlugin({ 
        //     templete: 'src/pages/detail/detail.html',
        //     filename: 'detail/detail.html',
        //     inject: 'head',
        //     chunks: ['detail'],
        //     minify: {
        //         removeComments: true,
        //         collopaseWhitespace: true,
        //     }
        // })
    ]

};

Object.keys(entryConfig).forEach(
    (item) => {
        config.plugins.push(
            new HtmlWebpackPlugin({ 
                template: 'src/pages/'+item+'/'+item+'.html',
                filename: item+'/'+item+'.html',
                inject: 'head',
                chunks: [item],
                minify: {
                    removeComments: true,
                    collopaseWhitespace: true,
                }
            }));
    }
);

module.exports = config;