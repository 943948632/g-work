const Koa = require('koa');
const app = new Koa();
const path = require('path');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const Router = require('koa-router');
// var MysqlStore = require('koa-mysql-session');
const router = new Router();



app.use(bodyParser());

// 加载模板引擎
app.use(views(path.join(__dirname, './html'), {
    extension: 'ejs'
}))

//静态资源路径
const staticPath = './static'
app.use(static(
  path.join( __dirname,  staticPath)
))
 

// session存储配置
// const sessionMysqlConfig = {
//     user: config.database.USERNAME,
//     password: config.database.PASSWORD,
//     database: config.database.DATABASE,
//     host: config.database.HOST,
// }

// // 配置session中间件
// app.use(session({
//     key: 'USER_SID',
//     store: new MysqlStore(sessionMysqlConfig)
// }))







//路由加载项
//用户路由
const user = require('./router/user')
const admin = require('./router/admin')

//装载所有子路由
router.use('/api', user.routes(), user.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)
console.log('http://localhost:3000/');