
//登录js
// 1. 构建web服务
// 2. 通过npm安装MySQL模块 -> 使用方法操作数据库，然后响应

// 一、导入模块
const http  = require('http')
const mysql = require('mysql');
const url = require('url');

// 配置
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'h5'
});
connection.connect();
 

// 二、创建web服务器
http.createServer((req, res) => {

    // 1. 接受数据 

    let params = url.parse(req.url, true).query  // { uname: 'z3', pwd: 'root' }
    let username = params.username
    let pwd = params.pwd
    
    if (!username || !pwd) 
    {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({
            meta: {
                msg: '参数有误',
                status: 400
            },
            data: null
        }))
        return
    }

    // 执行查询SQL语句
    connection.query(`select * from user where username = '${username}'`, function (error, results, fields) {
        if (error) throw error;

        if (!results[0]) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({
                meta: {
                    msg: '用户名或密码有误',
                    status: 400
                },
                data: null
            }))
            return
        }

        if (results[0].pwd != pwd) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({
                meta: {
                    msg: '用户名或密码有误',
                    status: 401
                },
                data: null
            }))
            return
        }
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({
            meta: {
                msg: '登录成功',
                status: 200
            },
            data: {
                id:results[0].id,
                username:results[0].username
            }
        }))
        return
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({
            meta: {
                msg: '操作成功',
                status: 200
            },
            // data: null
            data: results
        }))
    });
}).listen(3001)


//注册 得js
http.createServer((req, res) => {
    let params=url.parse(req.url,true).query
    let username=params.username
    let pwd=params.pwd
    connection.query(`select * from user where username = '${username}'`, function (error, results, fields) {
        if (error) throw error;
         res.setHeader('Access-Control-Allow-Origin', '*')
        // if(results[0].username == username){
        if(results[0]!=null){
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({
                    meta: {
                        msg: '该用户名已被注册',
                        status: 400
                    },
                    data: null
                }))
            }else{
                connection.query(`insert into user(username,pwd) values('${username}','${pwd}')`, function (error, results, fields) {
                    if (error) throw error;
                    res.setHeader('Access-Control-Allow-Origin', '*')
                   
                    if(results){
                        res.setHeader('content-type', 'application/json')
                        res.end(JSON.stringify({
                            meta: {
                                msg: '注册成功',
                                status: 200
                            },
                            data: null
                        }))
                    }else{
                        res.setHeader('content-type', 'application/json')
                        res.end(JSON.stringify({
                            meta: {
                                msg: '网络繁忙',
                                status: 403
                            },
                            data: null
                        }))
                    }
                })
            }
        });
}).listen(3002)
//goods.js 商品展示
http.createServer((req, res) => {
    connection.query(`select * from goods `, function (error, results, fields) {
        if (error) throw error;
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({
            meta: {
                msg: '登录成功',
                status: 200
            },
            data:results    
        }))
        return
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({
            meta: {
                msg: '操作成功',
                status: 200
            },
            // data: null
            data: results
        }))
    });
}).listen(3005)