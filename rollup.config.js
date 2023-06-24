import { terser } from 'rollup-plugin-terser';
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer"
import cssnano from "cssnano";
import strip from "@rollup/plugin-strip";
import json from './package.json' assert {type: "json"}
export default {
    input: "./packages/main.js",
    output: [{
        file: `dist/${json.name}.cjs.js`,
        format: "cjs",
        name:json.name
    }, {
        file: `dist/${json.name}.esm.js`,
        format: "esm",
        name:json.name
    },
    {
        file: `dist/${json.name}.global.js`,
        format: "iife",
        name:json.name
    }],
    plugins: [
        commonjs(),
        terser(),
        postcss({
            plugins: [autoprefixer(), cssnano()],
        }),
        strip(),
    ]
}