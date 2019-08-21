const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env = {}) => {
    const commonConfig = common(env);
    return merge(commonConfig, {
        plugins: [
            new UglifyPlugin({
                sourceMap: true
            }),
            new webpack.HashedModuleIdsPlugin()
        ],
        devtool: 'source-map',
        
    });
}