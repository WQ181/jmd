import cfg from 'cfg.js'; //域名配置
import all from 'common/global.js';

// import jweixin from "http://res2.wx.qq.com/open/js/jweixin-1.4.0.js";

var jweixin = require('jweixin-module')
// console.log(jweixin);


// jweixin
//初始化sdk配置  
function getAppid(url) {
	//服务端进行签名 ，可使用uni.request替换。 签名算法请看文档 
	uni.request({
		url: cfg.originUrl + '/wx/mp/js_sig.do',
		data: {
			route: url
		},
		method: 'GET',
		success: (res) => {
			// alert(JSON.stringify(res.data));
			jweixin.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: res.data.appId, // 必填，公众号的唯一标识
				timestamp: res.data.timestamp, // 必填，生成签名的时间戳
				nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
				signature: res.data.signature, // 必填，签名
				jsApiList: ['getLocation', 'scanQRCode'] // 必填，需要使用的JS接口列表
			});

			jweixin.ready(function() {
				// alert("开始获取位置");
				// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

				jweixin.getLocation({
					type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success: function(res) {
						// alert(res)
						// console.log("获取位置成功");
						var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						var speed = res.speed; // 速度，以米/每秒计
						var accuracy = res.accuracy; // 位置精度
						// alert("经度:" + longitude + "纬度:" + latitude + "速度:" + speed + "位置精度:" + accuracy);

						uni.setStorageSync('lon', longitude.toString());
						uni.setStorageSync('lat', latitude.toString())
						all.globalData.lon = longitude.toString();
						all.globalData.lat = latitude.toString();

					},
					fail: function(res) {
						alert("获取位置失败")
					}
				});
			});
			jweixin.error(function(res) {
				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				console.log("验证失败！")
			});
		}
	})
}

//支付接口测试
function test(url,data) {
	uni.request({
		url: cfg.originUrl + '/wx/mp/js_sig.do',
		data: {
			route: url
		},
		method: 'GET',
		success: (res) => {
			// alert(JSON.stringify(res.data));
			jweixin.config({
				debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: res.data.appId, // 必填，公众号的唯一标识
				timestamp: res.data.timestamp, // 必填，生成签名的时间戳
				nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
				signature: res.data.signature, // 必填，签名
				jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
			});

			jweixin.ready(function() {
				// alert("开始获取位置");
				// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
				
				uni.request({
					url: cfg.originUrl + "/wx/pay/init.do",
					method: 'POST',
					header: {
						'Content-type': "application/x-www-form-urlencoded",
					},
					data: JSON.stringify(data),
					success: function(res) {
						alert("下单成功");
						alert(JSON.stringify(res));
						jweixin.chooseWXPay({
							timestamp: res.data.payParams.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
							nonceStr: res.data.payParams.nonceStr, // 支付签名随机串，不长于 32 位
							package: res.data.payParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
							signType: res.data.payParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
							paySign: res.data.payParams.paySign, // 支付签名
							success: function(res) {
								alert(JSON.stringify(res)); // 支付成功后的回调函数
							}
						});
					}
				})
			});
			jweixin.error(function(res) {
				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				console.log("验证失败！")
			});
		}
	})
}

//微信充值
//支付接口
function balance(url, data) {
	uni.request({
		url: cfg.originUrl + '/wx/mp/js_sig.do',
		data: {
			route: url
		},
		method: 'GET',
		success: (res) => {
			jweixin.config({
				debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
				appId: res.data.appId, // 必填，公众号的唯一标识
				timestamp: res.data.timestamp, // 必填，生成签名的时间戳
				nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
				signature: res.data.signature, // 必填，签名
				jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
			});

			jweixin.ready(function() {
				uni.request({
					url: cfg.originUrl + '/wx/recharge/pay.do',
					method: 'POST',
					header: {
						'Content-type': "application/x-www-form-urlencoded",
					},
					data: JSON.stringify(data),
					success: function(res) {
						alert("下单成功");
						alert(JSON.stringify(res));
						// alert(res.data.order_id);
						uni.setStorageSync('orderId', res.data.order_id);

						jweixin.chooseWXPay({
							timestamp: res.data.payParams.timeStamp, // 支付签名时间戳
							nonceStr: res.data.payParams.nonceStr, // 支付签名随机串
							package: res.data.payParams.package, // 接口返回的prepay_id参数
							signType: res.data.payParams.signType, // 签名方式
							paySign: res.data.payParams.paySign, // 支付签名
							success: function(e) {
								alert("支付成功");
								alert(JSON.stringify(e)); // 支付成功后的回调函数
							}
						});
					}
				})
			});
			jweixin.error(function(res) {
				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				console.log("验证失败！")
			});
		}
	})
}

//授权登录，获取code
function Auth() {
	var a = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4728bf231787e2f9&redirect_uri=" +
		'https://shop.foxcodes.cn' + "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
	return a;
}

//利用code获取openid
function getOpenid(code) {
	var url = 'https://jmd.foxcodes.cn/b/wx/mp/auth.do?code=' + code;
	location.href = url;
}

//提取字符
function GetUrlParam(paraName, web_url) {
	var a = web_url;
	var url = a;
	var arrObj = url.split("?");
	if (arrObj.length > 1) {
		var arrPara = arrObj[1].split("&");
		var arr;
		for (var i = 0; i < arrPara.length; i++) {
			arr = arrPara[i].split("=");
			if (arr != null && arr[0] == paraName) {
				return arr[1];
			}
		}
		return "";
	} else {
		return "";
	}
}

export default {
	getAppid,
	Auth,
	GetUrlParam,
	getOpenid,
	test,
	balance
}
