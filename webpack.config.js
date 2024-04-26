const path = require('path');

const {
    NODE_ENV = 'development'
} = process.env;

module.exports = {
    entry: './src/main.js',
    devtool: 'eval-source-map',
    mode: NODE_ENV,
    output: {
        filename: 'bundle.js',
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
}