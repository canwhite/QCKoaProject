/*
这里要注意，使用koa-redis要安装redis
*/
const myconfig = require('../config');
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
//路由配置文件
module.exports = function(app){

    // redis-session配置
    app.keys = myconfig.keys;
    app.use(session({
        // 配置 cookie
        cookie: myconfig.session,
        // 配置 redis
        store: redisStore({
            // all: '127.0.0.1:6379' // 写死本地的 redis
            all: `${ myconfig.REDIS_CONF.host}:${myconfig.REDIS_CONF.port}`
        })
    }));

    //测试一下
    const testsession = (ctx,next) =>{

        ctx.session.test = "session test";
        console.log(`
        ---------get session-------
        ${ctx.session.test}
        `);
        next();//往下走，让路由去response

    };

    app.use(testsession);


};



