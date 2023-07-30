const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

// 添加中间件
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    await next();
});
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
// 假设这里使用了一个模拟数据库的 users 对象来存储用户信息
const users = {
    'user1': {
      username: 'user1',
      password: 'password1'
    },
    'user2': {
      username: 'user2',
      password: 'password2'
    }
};

router.post('/login', (ctx) => {
    const { username, password } = ctx.request.body
    const user = users[username]
    if (!user) {
        ctx.status = 401
        ctx.body = { message: 'User is Not Found' }
        return;
    }
    if (user.password !== password) {
        ctx.status = 401
        ctx.body = { message: 'Error Password' }
        return;
    }
    ctx.body = { username: user.username }
})

// 启动服务
app.listen(3000, () => {
    console.log('Server running on port 3000');
});