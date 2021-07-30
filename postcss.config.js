const isProd = process.env.NODE_ENV === "production";
module.exports = ({ env }) => ({
  plugins: {
    "postcss-preset-env": {},
    "postcss-pxtorem": isProd
      ? {
          rootValue: 10,
          unitPrecision: 3,
          propList: ["*"],
          exclude: /(node_module)/,
        }
      : false,
    autoprefixer: {},
  },
});
