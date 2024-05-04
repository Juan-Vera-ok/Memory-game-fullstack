const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

var webpack = require('webpack');

const config = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        fallback: {
            // 👇️👇️👇️ add this 👇️👇️👇️ 
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            util: require.resolve("util")
        }
    },
    module: {
        rules: [{

        },
            {
                test: /\.tsx$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }, { test: /.html$/, use: 'raw-loader' }, { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(s*)css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new webpack.DefinePlugin({
            'BACKEND_URL': JSON.stringify(process.env.BACKEND_URL||"http://localhost:3000"),
        }),
        new CopyPlugin({
            patterns: [
                { from: 'public', to: '' }, // Copy all files from 'public' to root of 'dist'
            ],
        })
    ]
};

function getEnv(varName){
    const value = process.env[varName];

    if (!value) {
        throw new Error(`Missing environment variable: ${varName}`);
    }

    return value;
}

module.exports = config;

