import { terser } from 'rollup-plugin-terser'; // 打包混淆压缩代码
import postcss from "rollup-plugin-postcss"; // 处理css
import babel from 'rollup-plugin-babel'; // es5
import serve from 'rollup-plugin-serve'; // 服务
import livereload from 'rollup-plugin-livereload';
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 定位 node-modules 模块
import cssnext from 'postcss-cssnext'; // 兼容 css
import nodePolyfills from 'rollup-plugin-node-polyfills'
import strip from "@rollup/plugin-strip";
import j from "./package.json"   assert {"json" }
import json from '@rollup/plugin-json';

export default {
    input: ["./packages/main.js"],
    external: ["hls.js"],
    globals: {
        Hls: "Hls"
    },
    output: [{
        file: `dist/${j.name}.esm.min.js`,
        format: "esm",
        name: j.name
    },
    {
        file: `dist/${j.name}.global.min.js`,
        format: "iife",
        name: "VeoPlayer"
    }],
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        postcss({
            plugins: [
                cssnext({warnForDuplicates: false,}),
            ],
            extensions: ['.css'],
            // extract: 'css/index.css'
        }),
        strip({
            debugger: true,
            functions: [ 'console.log', 'assert.*', 'debug', 'alert' ],
        }),
        json(),
        nodeResolve(),
        terser(),
        nodePolyfills(),
        livereload(),
        serve({
            port: 3000,
            openPage: '/index.html',
            contentBase: ''
        }),
    ],
}
