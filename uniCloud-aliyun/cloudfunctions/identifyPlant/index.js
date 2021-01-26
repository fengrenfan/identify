'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// let tokenMsg = await uni.request({
	// 	url:"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=wFy3Pe3RLGnYTQUW9wQ6ykrA&client_secret=rGQYkGxW6Z878cHA4Yu8GroqGnQWyEMR",
	// 	success:(res)=>{
	// 		console.log(res,"11111")
	// 		return res
	// 	}
	// })
	console.log(uni)
	// let data = await uni.request({
	// 	url:"https://aip.baidubce.com/rest/2.0/image-classify/v1/plant",
	// 	headers:{
	// 		"Content-Type":"application/x-www-form-urlencoded"
	// 	},
	// 	data:{
	// 		"access_token":tokenMsg.access_token,
	// 		"image":event.imgBs64,
	// 	},
	// 	success:(res)=>{
	// 		console.log(res,"123")
	// 		return res;
	// 	}
	// })
	//返回数据给客户端
	return tokenMsg
};
