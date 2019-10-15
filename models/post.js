var mongo = require('../lib/mongo');
var MongoClient = mongo.MongoClient;
var url = mongo.url;
var dbname = mongo.dbname;

function Post(username,post,time,gtitle,goodsimage){
    this.user = username;
    this.post = post;
    //如果传入的有时间
    if(time){
        this.time = time;
    }else{
        this.time = new Date();
    }
    this.gtitle = gtitle;
    this.goodsimage = goodsimage;
}
//相当于整个exports对象都等于Post
module.exports = Post;

//增加
Post.prototype.save = function save(callback){
    //存入mongodb的文档
    var post = {
        user:this.user,
        post:this.post,
        time:this.time,
        gtitle:this.gtitle,
        goodsimage:this.goodsimage
    };
    //mongodb打开和写入
    MongoClient.connect(url,function(err,client){
        if(err){
           client.close();
           return callback(err);
        }
        var collection = client.db(dbname).collection('image_posts');
         //为user属性添加索引
        // collection.ensureIndex('user');
        collection.createIndex({user:1});
         //写入post文档
        collection.insertOne(post,{safe:true},function(err,post){
             client.close();
             callback(err,post);
        });

    });
}

//查询
Post.get = function get(username,callback){

    //打开mongodb
    MongoClient.connect(url,function(err,client){
        if(err){
            client.close();
            return callback(err);
        }
        var collection = client.db(dbname).collection('image_posts');
        var query={};
        if(username){
            query.user = username;
        }
        //排序条件参数
        var sortq = {time:-1};
        //开始查找
        collection.find(query).sort(sortq).toArray(function(err,docs){
            //得到结果之后，关闭mongodb
            client.close();
            //如果失败了就返回错误
            if(err){
               return callback(err,null);
            }
            //封装posts为post对象
            var posts = [];
            docs.forEach(function(doc,index){
                //封装post对象，并在最后添加
                var post = new Post(doc.user,doc.post,doc.time,doc.gtitle,doc.goodsimage);
                posts.push(post);
            });
            callback(null,posts);
        });

    });
}

//删除
Post.deleteone = function(myimage,callback){
    //和mongo建立链接
    MongoClient.connect(url,function(err,client){
        //如果出错了，关闭和返回错误
        if(err){
            client.close();
            //最外层的callback返回
            return  callback(err,null);
        }
        //need to fix
        var collection = client.db(dbname).collection('image_posts');
        //删除对应的那个
        collection.deleteOne({goodsimage:myimage},function(err,docs){
            if(err){
                //最外层的callback返回
                return callback(err,null)
            }
            else{
                //如果删除成功，我们会成功请求揭秘哪
                //最外层的callback返回
                return callback(null,"success");
            }
        });
    });
}

//更改
Post.updateone = function(oldpost,newpost,callback){
    //mongodb打开和写入
    MongoClient.connect(url,function(err,client){
        if(err){
           client.close();
           return callback(err,null);
        }
        var collection = client.db(dbname).collection('image_posts');
        //写一下更新方法
        collection.updateOne(oldpost,{$set:post},function(err,result){
            if(err){
                //如果更新失败
                return callback(err,null);
            }
            //如果更新成功
            return callback(null,"success");
        });
    });
}