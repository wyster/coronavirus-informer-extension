const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    devtool: false,
    entry: {
        background: './src/background.js',
        content: './src/content.js',
        toggleHighlighting: './src/toggleHighlighting.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin({verbose: true}),
        new FileManagerPlugin({
            onEnd: {
                copy: [
                    {
                        source: './dist/**/*',
                        destination: './dist/extension/dist'
                    },
                    {
                        source: './_locales/**/*',
                        destination: './dist/extension/_locales'
                    },
                    {
                        source: './*.html',
                        destination: './dist/extension'
                    },
                    {
                        source: './icons/**/*',
                        destination: './dist/extension/icons'
                    },
                    {
                        source: './manifest.json',
                        destination: './dist/extension'
                    },
                    {
                        source: './LICENSE',
                        destination: './dist/extension/LICENSE.txt'
                    },
                ],
                archive: [
                    {
                        source: './dist/extension',
                        destination: './dist/extension.zip',
                        format: 'zip'
                    }
                ]
            }
        })
    ]
};