<template>
	<view>
		<uni-popup ref="popup" type="center">
			<image class="ewm" :src="qrcode"></image>
		</uni-popup>
		<view class="head flex-y">
			<view class="head1 flex-x">
				<view class="head2 flex-x">
					<image class="viaImg" :src="avatar"></image>
					<view class="name">
						<view class="name-title">{{nickname}}</view>
						<view class="name-inviter">我的邀请码:292027</view>
					</view>
				</view>
				<view class="right">
					<view class="user">
						<view class="cuIcon-qrcode"  @tap="openPopup"></view>
						<!-- <view class="user-user">邀请码</view> -->
					</view>
					<view class="retailer">
						<view class="cuIcon-shop"></view>
						<!-- <view class="retailer-retailer">店铺</view> -->
					</view>
					<view class="share">
						<view class="cuIcon-share"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="notice">
			<view class="word w1">公</view>
			<view class="word w2">告</view>
			<view class="uni-padding-wrap">
				<view class="uni-swiper-msg">
					<view class="uni-swiper-msg-icon redian-img">
						<view class="cuIcon-notification"></view>
					</view>
					<swiper vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item v-for="(item, index) in msg" :key="index">
							<navigator class="redian-infor">{{ item }}</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="plate">
			<view class="category" v-for="(row, index) in categoryList" :key="index" @tap="toCategory(row)">
				<view class="mg">
					<image class="ig" :src="row.img"></image>
				</view>
				<view class="text">{{ row.name }}</view>
			</view>
		</view>
		<view class="body flex-y">
			<view class="neck2 flex-x center">
				<view class="box1 flex-y" @tap="spreaderMember">
					<view class="cuIcon-friend"></view>
					<view>我的用户</view>
				</view>
				<view class="num">
					100人
				</view>
			</view>

			<view class="chest">
				<view class="cht">
					<view class="cht-left">
						<view class="cuIcon-peoplelist"></view>
						<view class="cht-name">第一个用户</view>
					</view>
					<view class="time">
						加入时间：19.8.1
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import all from '../../../common/global.js';
	import cfg from '../../../cfg.js';
	import uniPopup from "../../../components/uni-popup/uni-popup.vue";
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				show: false,
				type: '',
				avatar: '../../static/image/buzhihuo.jpg',
				nickname: '游客',
				qrcode:'',
				msg: ['积分能够换东西了！', '买的越多，积分送越多！'],
				bottomData: [{
						text: '微信',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
						name: 'wx'
					},
					{
						text: '支付宝',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
						name: 'wx'
					},
					{
						text: 'QQ',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
						name: 'qq'
					},
					{
						text: '新浪',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png',
						name: 'sina'
					},
					{
						text: '百度',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png',
						name: 'copy'
					},
					{
						text: '其他',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
						name: 'more'
					}
				],
				categoryList: [{
						id: 1,
						name: '赚取积分',
						img: '../../static/image/point.png',

					},
					{
						id: 2,
						name: '积分提现',
						img: '../../static/image/change.png'
					},
					{
						id: 3,
						name: '提现查询',
						img: '../../static/image/add.png'
					},
					{
						id: 4,
						name: '兑换记录',
						img: '../../static/image/record.png'
					}
				],
			}
		},
		created() {
			var that = this;
			var value = uni.getStorageSync('userInfo');
			that.avatar = value.headimgurl;
			that.nickname = value.nickname;
		},
		methods: {
			spreaderMember() {
				uni.navigateTo({
					url: '../spreaderMember/spreaderMember'
				})
			},
			openshop() {
				uni.navigateTo({
					url: '../../intergral/intergral'
				})
			},
			openPopup() {
				var openid = uni.getStorageSync('openid');
				uni.request({
					url: cfg.originUrl + '/audit/spreader_qrcode',
					data:{
						// openid:'os05_1SD-KV9JLBUuopDi_THWELQ'
						openid:openid
					},
					method:'GET',
					success(res) {
						console.log(res.data);
						this.qrcode = res.data;
					}
				})
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			change(e) {
				console.log(e.show)
			},
			//分类跳转
			toCategory(e) {
				//uni.showToast({title: e.name,icon:"none"});
				// uni.setStorageSync('catName', e.name, e.id);
				// uni.navigateTo({
				// 	url: '../../detail/detail?cid=' + e.id + '&name=' + e.name
				// });
				console.log(e.id);
				uni.navigateTo({
					url: '../withdraw/withdraw?id=' + e.id
				})
			},
		}
	}
</script>

<style>
	@import url("../../../css/spreader.css");
</style>
