const { task, series } = require('gulp');
const open = require('open');
const spawn = require("cross-spawn-async");
const path = require("path");
const rimraf = require("rimraf");

const config = require(path.resolve("webpack.dev.js"));
const port = (config && config.devServer && config.devServer.port) ? config.devServer.port : 8080;
const ishttps = (config && config.devServer && config.devServer.https);

const package = (done) => {
    let webpackCompiler = spawn("node", ["node_modules/webpack/bin/webpack.js",
        "--config", "./webpack.prod.js",
        "--env.NODE_ENV=production",
    ], {
            stdio: 'inherit'
        });

    webpackCompiler.on("close", done);
}

const serveDev = (done) => {
    let webpackDevServer = spawn("node", ["node_modules/webpack-dev-server/bin/webpack-dev-server.js",
        "--config", "./webpack.dev.js",
        "--inline", "--hot",
        "--env.NODE_ENV=development",
        `--env.PORT=${port}`,
        "--open"
    ], {
            stdio: 'inherit'
        });

    webpackDevServer.on("close", done);
}

const clean = (done) => {
    rimraf("{dist/,.tmp/,node_modules/codemirror/mode/rpm/changes/*}", done);
};

// For development
exports.default = series(clean, serveDev);
exports.run = series(clean, serveDev);

// For Production
exports.build = series(clean, package);