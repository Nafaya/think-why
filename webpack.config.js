/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/app.ts',
    devtool: 'inline-source-map',
    output: {
        filename: 'js/app.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: [{
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.webpack.json'
                }
            }], exclude: /node_modules/ ,},
        ]
    },
    devServer: {
        contentBase: './dist',
        overlay: true,
        hot: true
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [ {
                context: __dirname + '/assets',
                from: '**/*',
                to: '.'
            } ]
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
};
