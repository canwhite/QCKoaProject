An easy-to-use project of [Koa](http://koajs.com/), a web application framework for Node.

![Logo](logo.png)

## How to use

First of all, check your Node version.

```bash
$ node -v
v8.0.0
```

Koa requires node v7.6.0+. If your version is older than that, upgrade Node first.


```bash
$ git clone https://github.com/canwhite/QCKoaProject
```

Install the dependencies.

```bash
$ cd QCKoaProject
$ npm install  
or  
$ cnpm i
```

run
```
$ npm run dev
or
$ node app.js
```

##  各模块介绍
###  入口：app.js
```
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

//5./lib下  session-redis.js，注意要安装redis
session_redis(app);

//6./lib下  morgan.js 线上日志
morgan(app);


//7./routes下 路由入口
route(app);


// app.use(main);
app.listen(config.port);

```
###  ⚠️使用session-redis的前提：pc上要先安装redis