module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportwidth: 375,
            viewportheight: 667,
            unitPrecision: 5, //指定'px'转换为视窗单位值的小数位数(很多时候无法整除)
            viewportUnit: "vw", //指定需要转换的视窗单位，建议用vw
            // selectorBlackList: ["ignore", "tab-bar", "tab-bar-item"], //指定不需要转换的类
            minPixelValue: 1, //小于或等于'1px'不转换为视窗单位
            mediaQuery: false //不允许在媒体查询中转换为'px'
        }
    }
};
