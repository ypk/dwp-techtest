module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: { version: 3 },
        useBuiltIns: "usage",
        targets: "> 0.25%, not dead, IE 11",
      },
    ],
  ],
  sourceType: "unambiguous",
  plugins: [],
};
