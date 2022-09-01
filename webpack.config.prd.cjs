const webpack = require('webpack');

const path = require('path');
const fs = require('fs');
const Dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const APP_PATH = path.resolve(__dirname, './src/demo.js'),
    BUILD_PATH = path.resolve(__dirname, './dist'),
    TMP_PATH = path.resolve(__dirname, './src/demo.html');

function resolve(dir) {
    return path.join(__dirname, dir);
}
const workDir = process.cwd();
const s = Dotenv.parse(fs.readFileSync(path.join(workDir, '.env.development')));
module.exports = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: '[name].js' // 输出js
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.json'],
        modules: [
            'node_modules',
            path.resolve(__dirname)
        ],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        minimize: false,
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 200000,
            minChunks: 1,
            maxAsyncRequests: 10,
            maxInitialRequests: 5,
            automaticNameDelimiter: '~',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(s)
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'Earth',
            template: TMP_PATH,
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './static'),
            to: path.resolve(__dirname, './dist'),
            ignore: ['.*']
        }]),
        // webpack-dev-server enhancement plugins
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js[x]{0,1}$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                'transform-class-properties',
                                '@babel/plugin-syntax-jsx'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.ts[x]{0,1}$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true, // 为true会解决ts文件热更新异常的问题,但会丢失类型检查
                            compilerOptions: {
                                sourceMap: false
                            },
                            happyPackMode: true // 解决hooks is undefined
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }]
            },
            {
                test: /\.(png|jpg|gif|woff2|ttf|svg|eot|fbx|FBX)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    }
};
