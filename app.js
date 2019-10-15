const Koa = require('koa');
const app = new Koa();
const config = require('./config');//配置文件
const route = require('./routes/index');//路由
const path = require('path');//路径
const serve = require('koa-static');//静态文件库
const onerror = require('koa-onerror');//error监听
const logger = require('koa-logger');//logger的输出
const koaBody = require('koa-body');//form表单解析
const session_redis = require('./lib/session-redis');
const morgan = require('./lib/morgan');

//1.request参数解析
app.use(koaBody());

//2.错误的监听
onerror(app);

//3.logger的输出
app.use(logger());

//4.静态文件管理
app.use(serve(__dirname+'/public'));

//5.session-redis，注意要安装redis
session_redis(app);

//6.线上日志
morgan(app);


//7.路由入口
route(app);


// app.use(main);
app.listen(config.port);