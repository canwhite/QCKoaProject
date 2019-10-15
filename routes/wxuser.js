const route = require('koa-route');
module.exports = function(app){

      
    const main = ctx => {
        ctx.response.body = '这里是用户界面';
    };

    app.use(route.get("/user",main));

    
};