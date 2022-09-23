const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : './src/app.js',
    //какой файл мы перенастраиваем
    mode: 'development',
    //development значит что приложение общедоступное
    output: {
        filename: 'app.js',
        //название кофигурированого файла
        path: path.resolve(__dirname,'dist'),
        //таким образом собирает правильный путь в зависимсоти от того
        // на какой операционке мы паботаем
    },
    //output конфигурация папки dist
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            //название папки с приложением
        },
        port: 4200,
        //порт на котором будет запускаться прилажуха
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ],
    // module: {
    //     rules: [
    //         {
    //             test: /\.css$/i,
    //             use: [
    //                 "style-loader",
    //                 "css-loader"
    //             ],
    //         },
    //     ],
    // },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
}