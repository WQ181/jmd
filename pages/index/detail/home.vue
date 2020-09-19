<template>
	<view class="content">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true" class="swiper-item">
			<swiper-item v-for="(item, index) in swiperImg" :key="index">
				<image class="img" :src="item.image"></image>
			</swiper-item>
		</swiper>

		<!-- 公告 -->
		<view class="redian">
			<view class="word w1">热</view>
			<view class="word w2">点</view>
			<view class="uni-padding-wrap">
				<view class="uni-swiper-msg">
					<view class="uni-swiper-msg-icon redian-img">
						<view class="cuIcon-notificationfill" style="font-size: 40upx; margin-top: -10upx;"></view>
					</view>
					<swiper vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item v-for="(item, index) in msg" :key="index">
							<navigator class="redian-infor">{{ item }}</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<!-- 商家分类 -->
		<view class="tabbar-list">
			<view v-for="(item, index) in list" :key="index" class="tabbar-list-view" :data-id="item.id" :data-title="item.title"
			 @tap="findShop">
				<image :src="item.image" class="list-img"></image>
				<view class="list-name">{{ item.title }}</view>
			</view>
		</view>

		<!-- 搜索 -->
		<view class="search-item">
			<view class="item">
				<view class="cuIcon-search" style="margin-left: 10upx;"></view>
				<input class="input" type="text" v-model="keywords" placeholder="请输入关键字进行搜索" @focus="focus" />
				<view class="cuIcon-close" v-if="!hidden" @click="clear"></view>
				<view class="search-btn" v-if="!hidden" @click="search">搜索</view>
			</view>
		</view>

		<!-- 热卖产品 文强-->
		<view>
			<view class="recommand">
				<view class="cuIcon-hot"></view>
				<view class="recommand-text">热卖产品</view>
			</view>
			<!-- 商品列表 文强-->
			<view class="shopList">
				<view class="shop0" v-for="(item, index) in shopList" :key="index">
					<view class="shopon" @click="shopNav(item.id)">
						<image class="recommendicon" src="../../static/image/recommend.png"></image>
						<image class="shopimg" :src="item.image"></image>
						<view class="name">{{ item.name }}</view>
						<view class="priceandbuy">
							<view class="price">￥{{ item.price }}</view>
							<view class="buy">购买</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import cfg from '../../../cfg.js';
	import all from '../../../common/global.js';
	import getAppid from '../../../auth.js';
	export default {
		data() {
			return {
				pageNum: 1,
				keywords: '',
				hidden: true,
				swiperImg: [{
					image: '../../static/image/shouye1.jpg'
				}, {
					image: '../../static/image/shouye2.jpg'
				}],
				msg: ['uni-app行业峰会频频亮相', 'DCloud完成融资，uni-app震撼发布'],
				list: [],
				shopList: [],
			}
		},
		created() {
			//获取位置
			getAppid.getAppid(window.location.href);
			//商家分类
			uni.request({
				url: cfg.originUrl + '/retailer/type/get',
				method: 'GET',
				success: (res) => {
					console.log(res.data.data);
					this.list = res.data.data;
					uni.setStorageSync('allShop', res.data.data);
				}
			})
		},
		methods: {
			findShop: function(e) {
				var type = e.currentTarget.dataset.title;
				console.log(type);
				uni.navigateTo({
					url: '../retailerType/retailerType?type=' + type
				});
			},
			focus() {
				this.hidden = false;
			},
			search(e) {
				var keyword = this.keywords;
				console.log(this.keywords);
				uni.navigateTo({
					url: '../search/search?keyword=' + keyword
				});
			},
			//跳转到商户入驻页面
			shop() {
				uni.navigateTo({
					url: '../retailerUnit/retailerUnit'
				});
			},
			//跳转到member界面
			user() {
				// uni.navigateTo({
				// 	url: '/pages/index/detail/member'
				// });
				this.$store.mutations.change_page();
			},
			shopNav(id) {
				var id = id;
				console.log(id);
				var item = {};
				for (var i = 0; i < this.shopList.length; i++) {
					if (id == this.shopList[i].id) {
						console.log(this.shopList[i]);
						item = this.shopList[i];
						uni.setStorage({
							key: 'shopList',
							data: item,
							success: (res) => {
								uni.navigateTo({
									url: '../productDetails/productDetails'
								});
							}
						});
					}
				}
			},
			clear() {
				this.hidden = !this.hidden;
				this.keywords = '';
			}
		}
	}
</script>

<style>
	@import url("../../../css/index.css");
	.content{
		margin-bottom: 100upx;
	}
</style>
