const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
module.exports = {
    entry: {
        // 插件使用文件入口
        background: "./src/extension/background.ts",
        popup: "./src/extension/popup.ts",
        setting: "./src/extension/setting.ts",
        // 页面使用文件入口
        // bilibili_get_video_img: "./src/page_use/bilibili_get_video_img.ts",
        bilibili_page_inject: "./src/page_use/bilibili_page_inject.ts",
        bilibili_video_page_inject: "./src/page_use/bilibili_video_page_inject.ts",
        // 其他打包文件入口
        bilibili_dark_inject: "./css/bilibili_dark_inject.css"
    },
    output: {
        publicPath: './',
        filename: "[name].js",
        path: path.resolve(__dirname, "dist/js")
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.css/,
                use: [{
                        loader: MiniCssExtractPlugin.loader, // 创建link标签，引入样式文件
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath
                            publicPath: '../css',
                        },
                    },
                    // 将css文件整合到js中
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        // css打包
        new MiniCssExtractPlugin({
            filename: "../css/[name].css",
        }),
        // css压缩
        new CssMinimizerPlugin(),
        // html打包
        new HtmlWebpackPlugin({
            filename: "../page/background.html", //相对于js输出位置
            template: "public/background.html",
            inject: 'head', //注入到head
            chunks: ['background'],
            collapseWhitespace: true, //去除空格
            keepClosingSlash: true, //在单例元素上保留尾部斜杠
            removeComments: true, //去除注释
            publicPath: '../js',
        }),
        new HtmlWebpackPlugin({
            filename: '../page/popup.html',
            template: "public/popup.html",
            inject: 'body', //注入到body底部
            chunks: ['popup'],
            collapseWhitespace: true, //去除空格
            keepClosingSlash: true, //在单例元素上保留尾部斜杠
            removeComments: true, //去除注释
            publicPath: '../js',
        }),
        new HtmlWebpackPlugin({
            filename: '../page/setting.html',
            template: "public/setting.html",
            inject: 'body', //注入到body底部
            chunks: ['setting'],
            collapseWhitespace: true, //去除空格
            keepClosingSlash: true, //在单例元素上保留尾部斜杠
            removeComments: true, //去除注释
            publicPath: '../js',
        }),
    ]
};