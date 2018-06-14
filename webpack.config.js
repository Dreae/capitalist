const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    entry: "./src/index",
    target: 'electron-renderer',
    watch: true,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    externals: [
      'sqlite3'
    ],
    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            "@": path.resolve(__dirname, "node_modules"),
            "#": path.resolve(__dirname, "src")
        }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        inject: false,
        template: 'src/index.html'
      }),
      new VueLoaderPlugin()
    ],
    module: {
      rules: [
        { test: /\.vue$/, loader: "vue-loader", options: {
          optimizeSSR: false
        } },
        { test: /\.css$/, use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ] },
        { test: /\.ttf|\.woff|\.woff2|\.eot|\.svg$/, use: "file" }
      ]
    }  
};