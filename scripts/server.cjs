const Koa = require('koa');
const static = require('koa-static');
const path = require('path')
const app = new Koa()
app.use(static(path.resolve(__dirname, "../"), {extensions: ["html"]}))
//app.use(path.join(__dirname, '../'))

app.listen(3000, () => {
    console.log("koa服务启动:http:127.0.0.1:3000")
})