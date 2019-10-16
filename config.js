//常量的一些配置
module.exports = {
    port:3500,
    //session的内容估计要变化
    session:{
        key:'',
        path: '/',//cookie key (默认就是koa:sess)
        maxAge:24 * 60 * 60 * 1000,//cookie的过期时间,毫秒，默认为一天
        httpOnly:false,//cookie是否只有服务端可以访问，默认为true
    },
    mongodb:'mongodb://127.0.0.1:27017/microblog',//express session的时候使用
    client_url:'mongodb://127.0.0.1:27017',//操作链接
    client_dbname:'microblog',//db名字
    keys:["this is secret"],
    //mysql设置
    MYSQL_CONF:{
        host: 'localhost',
        user: 'root',
        password: '******',
        database: 'myblog'
    },
    // redis
    REDIS_CONF:{
        port: 6379,
        host: '127.0.0.1'
    }
}