const mysql = require('mysql')
const myconfig = require('../config')

// 创建链接对象
const con = mysql.createConnection(myconfig.MYSQL_CONF)

// 开始链接
con.connect()

// 执行 sql 函数
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

// 输出
module.exports = {
  exec,
  escape: mysql.escape
}