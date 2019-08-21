const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = (env = {}) => {
    const commonConfig = common(env);
    return merge(commonConfig, {
        devtool: 'inline-source-map',
        devServer: {
            // contentBase: path.join(__dirname, 'dist'),
            hot: true
        }
    });
}