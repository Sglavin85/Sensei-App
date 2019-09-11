const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#A7F2D7',
            '@box-shadow-base': 'box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
            '@body-background': '#F0F7EE',
            '@menu-bg': '#DCE0D9',
            '@menu-inline-toplevel-item-height': '80px',
            '@menu-item-height': '75px',
            '@background-color-light': '#F0F7EE',
            '@layout-header-background': '#DCE0D9',
            '@layout-header-height': '100px'
        },
    }),
);