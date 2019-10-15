const wxroot = require('./wxroot');
const wxuser = require('./wxuser');

//路由配置文件
module.exports = function(app){




    //根目录路由
    wxroot(app);

    //用户目录路由
    wxuser(app);

    

};