const devMode = process.env.NODE_ENV !== 'production';
const PACKAGE = require('./package.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const dotenv = require('dotenv');

// Load environment variables
dotenv.load();

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
        // Clear dist folder
        new CleanWebpackPlugin(),

        // Extract and minify css
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css'
        }),

        // Create index.html
        new HtmlWebpackPlugin({
            title: PACKAGE.title,
            meta: {
                description: PACKAGE.description,
                keywords: PACKAGE.keywords.join(','),
                author: `${PACKAGE.author.name}, ${PACKAGE.author.email}`,
                viewport: 'width=device-width, initial-scale=1.0'
            },
            template: path.resolve('src/client/template/index.ejs'),
        }),

        // Add CSP and nounce to index.html
        new CspHtmlWebpackPlugin({
            'base-uri': '\'self\'',
            'object-src': '\'none\'',
            'script-src': ['\'self\'', '\'unsafe-eval\''],
            'style-src': ['\'self\'']
        }, {
            enabled: process.env.SET_SECURITY_HEADERS === 'true',
        }),

        // Cleanup html
        new HtmlBeautifyPlugin({
            config: {
                html: {
                    preserve_newlines: false,
                }
            },
        })
    ]
};
