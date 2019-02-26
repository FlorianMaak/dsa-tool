const devMode = process.env.NODE_ENV !== 'production';
const PACKAGE = require('./package.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: [
            path.resolve('src/client/js/app.mjs'),
            path.resolve('src/client/style/_export.scss')
        ]
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve('dist')
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: devMode
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: devMode ? null : 'cssnano'
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.webmanifest$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    },
                    {
                        loader: 'webmanifest-loader',
                        options: {
                            name: PACKAGE.title,
                            shortName: PACKAGE.name,
                            description: PACKAGE.description
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                        name: '[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*']),
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css'
        }),
        new HtmlWebpackPlugin({
            title: PACKAGE.title,
            meta: {
                description: PACKAGE.description,
                keywords: PACKAGE.keywords.join(','),
                author: PACKAGE.author.name,
                viewport: 'width=device-width, initial-scale=1.0'
            },
            template: path.resolve('src/client/template/index.ejs')
        }),
    ]
};
