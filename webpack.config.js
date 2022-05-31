const HtmlWebpackPlugin = require("html-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: {
        js: "./src/index.js"
    },
    output: {
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        },
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "./"
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: "file-loader?name=assets/img/[name].[ext]"
            },
            {
                test: /\.(wav|mp3)$/i,
                use: "file-loader?name=assets/audio/[name].[ext]"
            }
        ]
    },
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            favicon: "./src/assets/img/favicon.svg"
        }),
        new MiniCssExtractPlugin()
    ]
};