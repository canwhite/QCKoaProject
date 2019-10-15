const route = require('koa-route');
module.exports = function(app){

    const about = ctx => {
        ctx.response.type = 'json';
        ctx.response.body = {data:{message:'details'}};
      };
      
    const main = ctx => {
        ctx.response.type = 'json';
        ctx.response.body = {data:{message:'hello world'}};
    };

    app.use(route.get("/",main));
    app.use(route.get("/about",about));

};
