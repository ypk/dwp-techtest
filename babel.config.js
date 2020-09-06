module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: { version: 3 },
        useBuiltIns: "usage",
        targets: ["last 2 versions", "ie >= 11"],
      },
    ],
  ],
  sourceType: "unambiguous",
  plugins: [],
};
