const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/main/script.js',
    articles: './src/articles/articles.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name]/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader:
          "babel-loader"
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
    },
        {
        test: /\.css$/i,
        use: [
          (isDev ? 'style-loader': { loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            }),
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
            'file-loader?name=./images/[name].[ext]',
                {
                  loader: 'image-webpack-loader',

                },
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './[name]/[name].[contenthash].css',
    }),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/main/index.html',
      filename: 'index.html',
      chunks: ['main'],
      minify:{
        collapseWhitespace: true
      }


    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './src/articles/articles.html',
      filename: 'articles.html',
      chunks: ['articles'],
      minify:{
        collapseWhitespace: true
      }


    }),
    new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackMd5Hash(),
  ]
};