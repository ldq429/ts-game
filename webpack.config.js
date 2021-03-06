const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/*
 * @Author: your name
 * @Date: 2020-05-24 09:18:00
 * @LastEditTime: 2020-05-29 10:23:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/webpack.config.js
 */
module.exports = {
    mode: "development",
    entry: './src/index.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}