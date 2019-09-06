 const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
 
module.exports = {
    mode:'production',
    // 이 부분은 entry와 output의 기본값으로 생략 가능합니다.
    entry: path.resolve(__filename, '../routes/index.js'),
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    }, 
    module: {
        rules: [
            {
            test: /\.js$/,
            include: path.join(__dirname),
            exclude: "/node_modules/",
            use: {
                loader:'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    node : {
        fs: "empty",
        net : "empty",
        tls : "empty"
    },
    plugins: [
        new HtmlWebPackPlugin({
            template:'../views/main.ejs',
            filename:'./main.ejs'
        })
    ]
};