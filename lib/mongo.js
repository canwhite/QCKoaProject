//monggo 公用的一些内容 设置成module exports的一些属性
var config = require('../config.js')
exports.MongoClient = require('mongodb').MongoClient;
exports.dbname = config.client_dbname;
exports.url = config.client_url;
