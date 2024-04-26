const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const {
    NODE_ENV = 'development'
} = process.env;

module.exports = {
    entry: {
        bundle: './src/main.js'
    },
    devtool: 'eval-source-map',
    devServer:{
        static: {
            directory: path.resolve(__dirname, "dist"),
        }
        
    },
    mode: NODE_ENV,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(
            {
                title:'OutputManagement',
                template: 'src/index.html'
            }
        )
    ]
}