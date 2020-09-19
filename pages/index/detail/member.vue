<template>
	<view class="container">
		<!-- 会员相关信息 -->
		<!-- <text class="cuIcon-settings install" @click="install"></text> -->
		<view class="myinfo">
			<view class="recharage" style="color: antiquewhite;">
				<view class="recharage-balance">
					<view>余额</view>
					<view style="text-align: center;">{{balance}}</view>
				</view>
				<view class="recharage-buy" @tap="reCharge">
					充值
				</view>
			</view>
			<view class="myicon">
				<view style="width:150rpx;height:150rpx;border-radius:50%;"></view>
				<image :src="avatar" @click="install"></image>
				<view class="head">
					<text style="font-size:28rpx;color:antiquewhite;text-align: center;">{{ nickname }}</text>
					<text style="font-size:28rpx;color:antiquewhite;padding-right:4px;">[{{ level }}]</text>
				</view>
			</view>
			<view class="intergral" style="color: antiquewhite;">
				<view>积分</view>
				<view style="text-align: center;">{{intergral}}</view>
				<view class="intergral-btn" @tap="intergralTap">
					商城
				</view>
			</view>
		</view>

		<view class="myOrder">
			<image src="../../static/image/dingdan.png" class="order-img"></image>
			<view class="right" :data-id="0" @click="jumpTo">
				<view class="order-word">我的订单</view>
				<view class="cuIcon-right"></view>
			</view>
		</view>

		<!-- 导航按钮 1-->
		<view class="mynavigator">
			<block v-for="(item, index) in navitems" :key="index">
				<button class="navitems" :open-type="item.type" :plain="item.plain" :data-id="item.id" @click="jumpTo" style="border:0">
					<view>
						<image :src="item.imgurl" />
					</view>
					<view>{{ item.title }}</view>
				</button>
			</block>
		</view>

		<view class="dividingstrip" />

		<view class="user-design" v-if="identity !='分销商'&&identity!='商家'">
			<view class="discount" @click="toSpreader">
				<view class="left">
					<image src="../../static/image/fenxiaoshang.png" class="discount-img"></image>
					<view class="discount-name">申请成为分销商</view>
				</view>
				<view class="cuIcon-right"></view>
			</view>
			<view class="discount" @click="toRetailerUnit">
				<view class="left">
					<image src="../../static/tabbar/shouye2.png" class="discount-img"></image>
					<view class="discount-name">商户入驻</view>
				</view>
				<view class="cuIcon-right"></view>
			</view>
		</view>
		<view class="dividingstrip" v-if="identity !='分销商'&&identity!='商家'" />
		<!-- 具体的主要素 -->
		<view class="user-design">
			<!-- 优惠券等-->
			<view class="discount" v-for="(item, index) in commondList" :key="index" :data-where="item.where" @click="skip">
				<view class="left">
					<image :src="item.image" class="discount-img"></image>
					<view class="discount-name">{{ item.name }}</view>
				</view>
				<view class="cuIcon-right"></view>
			</view>
		</view>

		<!-- 客服 -->
		<view class="service" @tap="service">
			<image src="../../static/image/kefu.png" class="service-img"></image>
			客服
		</view>
	</view>
</template>

<script>
	import cfg from '../../../cfg.js';
	import all from '../../../common/global.js';
	export default {
		data() {
			return {
				avatar: '../../../static/image/buzhihuo.jpg', //头像
				balance: 0, //账户余额
				level: '普通等级', //等级
				nickname: '匿名', //昵称
				intergral: 0, //积分
				phoneValue: '18126219727', //客服
				identity: '',
				navitems: [{
						id: 1,
						imgurl: '../../static/image/daifukuan.png',
						title: '待付款',
						plain: true
					},
					{
						id: 2,
						imgurl: '../../static/image/daifahuo.png',
						title: '待发货',
						plain: true
					},
					{
						id: 3,
						imgurl: '../../static/image/daishouhuo.png',
						title: '待收货',
						plain: true
					},
					{
						id: 4,
						imgurl: '../../static/image/daipingjia.png',
						title: '待评价',
						plain: true
					}
				],
				commondList: [{
						id: 1,
						image: '../../static/image/youhuiquan.png',
						name: '领取优惠券',
						where: '../coupon/coupon'
					}, {
						id: 2,
						image: '../../static/image/wodeyouhuiquan.png',
						name: '我的优惠券',
						where: '../coupon/mycoupon'
					},
					{
						id: 3,
						image: '../../static/image/guanzhu.png',
						name: '我的关注',
						where: '../attention/attention'
					},
					{
						id: 4,
						image: '../../static/image/chongzhijilu.png',
						name: '充值记录',
						where: '../balance/rechargeInfo/rechargeInfo'
					},
					{
						id: 5,
						image: '../../static/image/dizhi.png',
						name: '收货地址管理',
						where: '../address/address'
					}
				]
			};
		},
		created: function(options) {
			var that = this;
			that.identity = all.globalData.identity;
			var openid = uni.getStorageSync('openid');

			var value = uni.getStorageSync('userInfo');
			console.log(JSON.stringify(value));
			that.avatar = value.headimgurl;
			that.nickname = value.nickname;
		},
		methods: {
			//积分商城
			intergralTap() {
				var value = uni.getStorageSync('identity');
				this.identity = value;
				if (this.identity != '分销商') {
					uni.showToast({
						title: '您不是分销商，无法进入哟',
						icon: 'none'
					})
					return;
				}
				uni.navigateTo({
					url: '../intergral/intergral'
				})
			},
			// 个人信息
			install() {
				uni.navigateTo({
					url: '../install/install'
				})
			},
			jumpTo(e) {
				var id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: '../indent/indent?id=' + id
				});
			},
			// 跳转
			skip(e) {
				let where = e.currentTarget.dataset.where;
				// 验证是否已登录
				console.log('jump to ', where);
				uni.navigateTo({
					url: where
				});
			},
			//订单管理
			order(e) {
				var id = e.currentTarget.dataset.id;
				console.log(id);
				uni.navigateTo({
					url: '../indent/indent?id=' + id
				});
			},
			// 我的余额
			reCharge() {
				var balance = this.balance;
				uni.navigateTo({
					url: '../balance/balance?balance=' + balance
				});
			},
			//客服
			service() {
				uni.makePhoneCall({
					phoneNumber: this.phoneValue,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			toSpreader() {
				uni.navigateTo({
					url: '../distribution/distribution'
				})
			},
			toRetailerUnit() {
				uni.navigateTo({
					url: '../retailerUnit/retailerUnit'
				})
			}
		}
	};
</script>
<style src="../../../css/member.css">
	page{
		background-color: white;
	}
</style>
