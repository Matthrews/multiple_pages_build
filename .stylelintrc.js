module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [
      true,
      { ignoreAtRules: ["mixin", "extend", "content", "include"] },
    ],
    indentation: 4,
    "no-descending-specificity": null, // 禁止特异性较低的选择器在特异性较高的选择器之后重写
  },
};
