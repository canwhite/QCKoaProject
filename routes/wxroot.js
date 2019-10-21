
module.exports = function(app,router){

    const about = ctx => {
        ctx.response.type = 'json';
        ctx.response.body = {data:{message:'details'}};
      };
      
    const main = ctx => {
        ctx.response.type = 'json';
        ctx.response.body = {data:{message:'hello world'}};
    };
    
    router.get("/",main);
    router.post("/about",about);

    app.use(router.routes());

};
