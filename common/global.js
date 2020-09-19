const globalData = {
	level: '',
	balance: 0, //余额
	openid: null, // 服务器传回的hash后的openId，与user.openid一致
	lon: 0,
	lat: 0,
	code: '',
	coupons: 0,
	couponsOwn: 0,
	orderId: null, //订单的id号码
	identity: '分销商'
}

module.exports = {
	globalData
}
export default {
	globalData
}
