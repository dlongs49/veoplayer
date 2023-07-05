import postcss from "rollup-plugin-postcss"; // 处理css
import babel from 'rollup-plugin-babel'; // es5
import serve from 'rollup-plugin-serve'; // 服务
import livereload from 'rollup-plugin-livereload';
import cssnext from 'postcss-cssnext'; // 兼容 css
import json from './package.json' assert {type: 'json'}

export default {
    input: ["./packages/main.js"],
    external: ["hls.js"],
    globals: {
        Hls: "Hls"
    },
    output: [{
        file: `dist/${json.name}.esm.min.js`,
        format: "esm",
        name: json.name
    },
    {
        file: `dist/${json.name}.global.min.js`,
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
        // strip(),
        // nodeResolve(),
        // terser(),
        // nodePolyfills(),
        livereload(),
        serve({
            port: 3000,
            openPage: '/index.html',
            contentBase: ''
        }),
    ],
}
