const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: ["react-hot-loader/patch", "./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/dist/",
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(ttf|eot|svg|otf|gif|png|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  devServer: {
    contentBase: "./dist",
    compress: true,
    port: 3000,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "Typescript pet",
      filename: "index.html",
      templateContent: `
        <html>
          <body>
          <div id="root"></div>
          </body>
        </html>
      `,
    }),
  ],
};

module.exports = config;
