const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const sveltePreprocess = require("svelte-preprocess");
const Dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

const serverConfig = {
  inline:true,
  port: 8080
};

module.exports = {
  entry: {
    bundle: ["./src/main.js"],
  },
  devServer: serverConfig,
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs)$/,

        exclude: [/\bcore-js\b/, /\bwebpack\b/, /@babel(?:\/|\\{1,2})runtime|core-js/],
        loader: "babel-loader",
        options: {
          babelrc: false,
          configFile: path.resolve(__dirname, "babel.config.js"),
          compact: false,
          cacheDirectory: true,
          sourceMaps: false,
        },
      },
      {
        test: /\.svelte$/,
        include: /src|svelte/,
        use: [
          "babel-loader",
          {
            loader: "svelte-loader",
            options: {
              preprocess: sveltePreprocess({ postcss: true }),
              emitCss: true,
              hotReload: true,
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  mode,
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ],
  node: {
    fs: 'empty',
    child_process: 'empty',
  },
  devtool: prod ? false : "source-map",
};
