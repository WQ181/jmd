<script>
	import GetUrlParam from 'auth.js';
	import Auth from 'auth.js';
	import all from 'common/global.js';
	import getOpenid from 'auth.js';
	import getAppid from 'auth.js';
	import cfg from 'cfg.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')

			if (window.location.href.toString().length == 24 || window.location.href.toString().length == 25) {
				var codeUrl = Auth.Auth(); //授权拿带code参数的url
				// alert("code获取:" + codeUrl);
				location.href = codeUrl; //跳转
			} else if (window.location.href.toString().match('state')) {
				// alert(window.location.href.toString());
				var code = GetUrlParam.GetUrlParam("code", window.location.href.toString());
				// alert("code:" + code);
				// all.globalData.code = code;
				// alert(all.globalData.code);
				// alert(window.location.href);
				getOpenid.getOpenid(code); //跳转

			} else if (window.location.href.toString().match('openid')) {
				// alert("qqq");
				// alert(window.location.href.toString());
				var openid = GetUrlParam.GetUrlParam("openid", window.location.href.toString());
				uni.setStorageSync('openid', openid);
				// alert("openid=" + openid);
			}
		},
		onShow: function() {
			console.log('App Show');
			//按进入人员的类型来实现
			var openid = uni.getStorageSync('openid');
			//获取信息
			uni.request({
				url: cfg.originUrl + '/qrcode/get_user_info',
				method: 'GET',
				data: {
					openid: openid
				},
				success: (res) => {
					console.log(res.data.data);
					// alert(JSON.stringify(res.data.data))
					uni.setStorageSync('userInfo', res.data.data);
				}
			})
			//实际用
			// //判断是否为分销商
			// uni.request({
			// 	url: cfg.originUrl + '/ec/person/member/is_spreader',
			// 	method:'GET',
			// 	data:{
			// 		openid:openid
			// 	},
			// 	success: (res) => {
			// 		console.log(res);
			// 		// alert(JSON.stringify(res));
			// 		if(res.data.code == 0){
			// 			var identity = '分销商';
			// 			uni.setStorageSync('identity',identity);
			// 			this.$store.dispatch('distribution');
			// 			return;
			// 		}
			// 	}
			// })
			// //判断是否为商家
			// uni.request({
			// 	url: cfg.originUrl + '/ec/person/member/is_staff',
			// 	method:'GET',
			// 	data:{
			// 		openid:openid
			// 	},
			// 	success: (res) => {
			// 		console.log(res);
			// 		// alert(JSON.stringify(res));
			// 		if(res.data.code == 0){
			// 			var identity = '商家';
			// 			uni.setStorageSync('identity',identity);
			// 			this.$store.dispatch('retailer');
			// 			return;
			// 		}
			// 	}
			// })
			
			uni.setStorageSync('identity','member');
			console.log('member');
			this.$store.dispatch('member');
			
			// //调试用
			if (all.globalData.identity == '商家') {
				this.$store.dispatch('retailer');
				// uni.navigateTo({
				// 	url:'pages/index/detail/retailer'
				// })
			} else if (all.globalData.identity == '分销商') {
				this.$store.dispatch('distribution')
				// uni.navigateTo({
				// 	url:'pages/index/detail/distrubitionCenter'
				// })
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'common/uni.css';
	@import "common/main.css";
	@import "common/icon.css";

	page {
		margin-bottom: 100upx;
	}

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>
