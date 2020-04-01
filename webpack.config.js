const path = require('path');

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
};