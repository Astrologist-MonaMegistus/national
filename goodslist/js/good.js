
//商品列表 接口 3010 3011 3012
// 步骤1：导入模块

const http = require('http')
const mysql = require('mysql');
const url = require('url');
// var $ = require("jquery");
// 步骤2：配置
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'h5'
});
connection.connect();
// 步骤3：创建web服务器响应数据
//默认商品展示 127 3011
http.createServer((req, res) => {
	connection.query('select * from goods', function (error, results, fields) {
		if (error) throw error;
		// console.log(results);
		res.setHeader("Access-Control-Allow-Origin", "*"); // 设置可访问的源
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
}).listen(3011)
// 时间排序 127 3010端口
http.createServer((req, res) => {
	connection.query('select * from goods Order By created_at Desc', function (error, results, fields) {
		if (error) throw error;
		// console.log(results);
		res.setHeader("Access-Control-Allow-Origin", "*"); // 设置可访问的源
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
}).listen(3010)

//价格排序  127 3012端口
http.createServer((req, res) => {
	connection.query('select * from goods Order By goods_price Desc', function (error, results, fields) {
		if (error) throw error;
		// console.log(results); 4
		//价格类型 用decimal 排序 可查询 
		res.setHeader("Access-Control-Allow-Origin", "*"); // 设置可访问的源
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
}).listen(3012)
//添加购物车  127 3013端口

//mysql用法
//配置数据库
//创建数据
var goodsImg;
var goodsTitle;
var goodsPrice;
// 步骤3：创建web服务器响应数据
http.createServer((req, res) => {
	let params = url.parse(req.url, true).query;
	var userId = params.userId;
	var goodsId = params.goods_id
	//跨域header头
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader('content-type', 'application/json')
	res.setHeader('content-type', 'text/html;charset="utf-8"')
	//获取数据
	// console.log(goodsId)
	//var userId = params.userId;
	var buyNum = 1;
	if (!userId) {
		res.end(JSON.stringify({
			meta: {
				msg: '参数有误goodid',
				status: 200
			},
			data: null
		}))
		return;
	}
	//响应数据库
	connection.query(`select * from cart where user_id=${userId}and goods_id=${goodsId}`, function (error, results, fields) {
		if (error) {
			console.log(error)

		};
		res.end(JSON.stringify({
			meta: {
				msg: '操作成功',
				status: 200
			},
			data: results
		}))
	})
}).listen(3020)



http.createServer((req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader('content-type', 'application/json')
	res.setHeader('content-type', 'text/html;charset="utf-8"')
	let params = url.parse(req.url, true).query;
	
	goodsId = params.goodsId
	goodsImg = params.goodsImg
	goodsTitle = params.goodsTitle
	goodsPrice = params.goodsPrice
	buyNum = params.buyNum
	userId = params.userId



	connection.query(`insert into cart (goods_id,goods_img,goods_title,goods_price,buy_num,user_id)
values (${goodsId}, '${goodsImg}', '${goodsTitle}', '${goodsPrice}',' ${buyNum}','${userId}') `, function (error, results, fields) {
		//   if (error) throw error;
		// console.log(results)s
		res.end(JSON.stringify({
			meta: {
				msg: '操作成功',
				status: 201
			},
			data: 2
			// data: results


		

	}))
})
}).listen(3021)
//模糊查询
http.createServer((req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader('content-type', 'application/json')
	res.setHeader('content-type', 'text/html;charset="utf-8"')
	let params = url.parse(req.url, true).query;
	goodsTitle = params.goodsTitle
	connection.query(`select * from goods where goods_title like '%${goodsTitle}%'`, function (error, results, fields) {
		//   if (error) throw error;
		// console.log(results)s
		res.end(JSON.stringify({
			meta: {
				msg: '操作成功',
				status: 201
			},
			data: results


		

	}))
})
}).listen(3017)

