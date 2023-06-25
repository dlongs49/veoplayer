const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path')
const app = new Koa()
app.use(koaStatic(path.resolve(__dirname, "../"), {extensions: ["html"]}))

app.listen(3000, () => {
    console.log("koa服务启动:http:127.0.0.1:3000")
})