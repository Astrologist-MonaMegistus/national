//导入模块
const http = require('http')
const mysql = require('mysql');
const url = require('url');

//配置
var connection = mysql.createConnection({
    host   : 'localhost',
    user   : 'root',
    password  :  'root',
    database  :  'gq'

});
connection.connect();

//创建WEB服务器
http.createServer((req,res)=>{
    //接受数据
    console.log(req.url)
    let params = url.parse(req.url,true).query
    let goodsId = params.goodsId
    let userId = params.userId
    let buyNum = params.buyNum
    if(!goodsId || !userId || !buyNum)
    {
        // response('参数有误',401)
        res.setHeader('content-type','application/json') 
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.end(JSON.stringify({
            meta:{
                msg:'参数有误',
                status:401
            },
            data:null
        }))
        return
    };


    // console.log(uname)
    // console.log(pwd)
    // res.end('oiiiii')

    connection.query(`select * from goods where goods_id='${goodsId}'`,function(error,results,fields){
        if(error) throw error;
        // console.log(results)

        if(!results[0])
    {
        // response('无商品',400)
        res.setHeader('content-type','application/json') 
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.end(JSON.stringify({
            meta:{
                msg:'无商品',
                status:400
            },
            data:null
        }))
        return
    };
        
        if(results[0].goods_num < buyNum)
        {
            // response('库存不足',400);
            res.setHeader('content-type','application/json') 
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.end(JSON.stringify({
            meta:{
                msg:'库存不足',
                status:400
            },
            data:null
        }))
        return
    }
    });


    connection.query(`update cart set buy_num = '${buyNum}' where goods_id = '${goodsId}' and user_id = '${userId}'`,function(error,results,fields){
    
        if(error) throw error;
        console.log(results.affectedRows)
        if(results.affectedRows == 1){
            // response('成功',200)
            res.setHeader('content-type','application/json') 
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.end(JSON.stringify({
                meta:{
                    msg:'成功',
                    status:200
                },
                data:null
            }))
          
        } else{
            // response('失败',200);
            res.setHeader('content-type','application/json') 
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.end(JSON.stringify({
            meta:{
                msg:'失败',
                status:400
            },
            data:null
        }))
        
        }
    });             
}).listen(3001)

 
// function response(msg,status,data = null){
//     res.setHeader('content-type','application/json') 
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.end(JSON.stringify({
//         meta:{
//             msg:msg,
//             status:status
//         },
//         data:data
//     }))
//     return
// };
