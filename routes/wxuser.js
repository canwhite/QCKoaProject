module.exports = function(app,router){

      
    const main = ctx => {
        ctx.response.body = '这里是用户界面';
    };
    router.get('/user',main);
    app.use(router.routes());

    
};