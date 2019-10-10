//导入模块
const http = require('http')
const mysql = require('mysql');
const url = require('url');
//配置
var connection = mysql.createConnection({
    host   : 'localhost',
    user   : 'root',
    password  :  'root',
    database  :  'h5'

});
connection.connect();

//创建WEB服务器
http.createServer((req,res)=>{

    //执行sql语句
    var pathname  = url.parse(req.url).pathname
    // console.log(pathname)
    if(pathname == '/cartnode.js'){
        connection.query('select * from cart',function(error,results,fields){
            if(error) throw error;
            if(!results[0]){
                res.setHeader('content-type','application/json') 
                res.setHeader("Access-Control-Allow-Origin", "*")
                res.end(JSON.stringify({
                    meta:{
                        msg:'商品不存在',
                        status:400
                    },
                    data:null
                }))
                return
            }
            res.setHeader('content-type','application/json') 
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.end(JSON.stringify({
                meta:{
                    msg:'查询成功',
                    status:200
                },
                data:results
            }))
            return
        });

    }
    if(pathname == '/add.js'){
        var query = url.parse(req.url,true).query;
        connection.query(`update cart set buy_num = ${query.num} where goods_id = ${query.id}`)
    }
    if(pathname == '/dim.js'){
        var query = url.parse(req.url,true).query;
        // console.log(query)
        connection.query(`update cart set buy_num = ${query.num} where goods_id = ${query.id}`)
    }
    if(pathname == '/del.js'){
        var query = url.parse(req.url,true).query;
        connection.query(`delete from cart where goods_id = ${query.id}`)
    }
             
    
}).listen(3003)

 http.createServer((req,res)=>{
     res.setHeader('content-type','application/json') 
     res.setHeader("Access-Control-Allow-Origin", "*")
     var pathname  = url.parse(req.url,true).query
    let goodsId=pathname.goodsId;
    // console.log(goodsId)
    connection.query('select * from goods where id="'+goodsId+'"',function(error,results,fields){
        res.end(JSON.stringify({
            data:results
        }))

    })
 }).listen(3033)
