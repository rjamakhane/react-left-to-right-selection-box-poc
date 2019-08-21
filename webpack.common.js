require("@babel/polyfill");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => {
    console.log(env);
    const isDevelopment = env.NODE_ENV === 'development';
    const port = env.PORT;
    return {
        entry: [
            "@babel/polyfill",
            "./app/index.js"
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js'
        },
        devServer: {
            historyApiFallback: true,
            port : port
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            "plugins": [
                                [
                                    "@babel/plugin-proposal-class-properties"
                                ]
                            ]
                        }
                    }
                },
                {
                    test: /\.(s*)css$/, // match any .scss or .css file, 
                    use: [
                        env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                filename: '../dist/index.html',
                template: './app/index.html'
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ]
    }
}