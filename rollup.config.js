import { terser } from 'rollup-plugin-terser';
// import postcss from "rollup-plugin-postcss";
// import autoprefixer from "autoprefixer"
// import cssnano from "cssnano";
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import nodePolyfills from 'rollup-plugin-node-polyfills'
import strip from "@rollup/plugin-strip";
import json from './package.json' assert {type: "json"}
export default {
    input: "./packages/main.js",
    output: [{
        file: `dist/${json.name}.esm.min.js`,
        format: "esm",
        name: json.name
    },
    {
        file: `dist/${json.name}.global.min.js`,
        format: "iife",
        name: json.name
    }],
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        terser(),
        // postcss({
        //     plugins: [autoprefixer(), cssnano()],
        // }),
        commonjs(),
        strip(),
        nodeResolve(),
        livereload(),
        nodePolyfills(),
        serve({
            port: 3000,
            openPage: '/index.html',
            contentBase: ''
        })
    ]
}