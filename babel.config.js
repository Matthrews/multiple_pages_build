module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];
  const plugins = [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-transform-runtime"],
    ["@babel/plugin-syntax-dynamic-import"],
    ["@babel/plugin-transform-modules-commonjs"],
    [
      "import",
      {
        libraryName: "Cube",
        libraryDirectory: "es",
        style: false,
      },
      "Cube",
    ],
  ];

  return {
    presets,
    plugins,
  };
};
