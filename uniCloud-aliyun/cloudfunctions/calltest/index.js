'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let sum = event.a+event.b
	//返回数据给客户端
	return sum
};
