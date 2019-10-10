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
    // let buyNum = params.buyNum
    if(!goodsId || !userId)
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

    connection.query(`select * from goods where id='${goodsId}'`,function(error,results,fields){
        if(error) throw error;
        // console.log(results)

        if(!results[0])
    {
        // response('参数有误',400)
        res.setHeader('content-type','application/json') 
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.end(JSON.stringify({
            meta:{
                msg:'参数有误',
                status:400
            },
            data:null
        }))
        return
    };
    });


    connection.query(`select * from cart where goods_id = ${goodsId} and user_id = ${userId}`,function(error,results,fields){
    
        if(error) throw error;
        // console.log(results)
        if(results[0]){
            // response('成功',200)
            connection.query(`update cart set buy_num = buy_num+1 where goods_id = '${goodsId}' and user_id = '${userId}'`);
            console.log('增加')
        } else {
            // response('失败',200);
            connection.query(`select * from goods where goods_id='${goodsId}'`);
            if(error) throw error;
            var results;
            console.log(results)
    //         goodsImg = results['goods_img'];
    //         goodsTitle = results['goods_title'];
    //         goodsPrice = results['goods_price_small'];
    //         createdAt = updatedAt = date('Y-m-d H:i:s');  
    //         connection.query(`insert into cart (goods_id,goods_img,goods_title,goods_par,goods_price,buy_num,user_id,created_at,updated_at) 
    // values (${goodsId},'${goodsImg}','${goodsTitle}','','${goodsPrice}',1,${userId},'${createdAt}','${updatedAt}')`);
        }
    });             
}).listen(3002)

 
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
