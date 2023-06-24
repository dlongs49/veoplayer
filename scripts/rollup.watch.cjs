const rollup = require('rollup');
const dir = 'test'
const watchOptions = {
    watch: {
        exclude: 'node_modules/**'
    },
    input: './packages/main.js',
    output: [{
        dir,
        format: "esm",
        entryFileNames: `veoplayer.esm.js`,
    }],
}

const watcher = rollup.watch(watchOptions);


watcher.on('event', async event => {
    switch (event.code) {
        case 'START':
            console.info('启动中...');
            break;
        case 'BUNDLE_START':
           
            console.info('构建中...');
            break;
        case 'BUNDLE_END':
            console.info('文件构建完成...');
            break;
        case 'END':
            console.info('构建完成...');
            break;
        case 'ERROR':
        case 'FATAL':
            console.error("错误: ", event);
    }
});

process.on('exit', () => {
    watcher.close();
});