const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    console.log('中间件1 开始处理')
    await next()
    console.log('中间件1 处理结束')
})
app.use(async (ctx, next) => {
    console.log('中间件2 开始处理')
    await next()
    console.log('中间件2 处理结束')
})
app.use(async (ctx, next) => {
    console.log('中间件3 开始处理')
    await next()
    console.log('中间件3 处理结束')
})
app.use(async ctx => {
    ctx; // is the Context
    ctx.request; // is a koa Request
    ctx.response; // is a koa Response
});
app.listen(3000, () => {
    console.log('server is listen in 3000~')
})