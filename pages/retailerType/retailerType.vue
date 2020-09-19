<template>
	<view>
		<!-- 轮播图 -->
		<view class="header">
			<image src="../../static/image/shouye2.jpg" class="img"></image>
		</view>

		<!-- 搜索 -->
		<view class="search-item">
			<view class="item">
				<view class="cuIcon-search" style="margin-left: 20upx;"></view>
				<input class="input" type="text" v-model="keywords" placeholder="请输入关键字进行搜索" @focus="focus" />
				<view class="cuIcon-close" @click="clear" style="margin-right: 10upx;"></view>
				<view class="search-btn" v-if="!hidden" @click="search">搜索</view>
			</view>
		</view>

		<!-- 商家列表 -->
		<view class="shop-list" v-for="(item, index) in retailer" :key="index" @tap="toCompanyInfo(item)">
			<image class="picture" :src="item.license_image"></image>
			<view class="intro">
				<view class="name">{{ item.name }}</view>
				<view class="addr">
					<image class="dingwei" src="../../static/image/dingwei.png"></image>
					<view class="distance">距离您:{{ distance[index] }}km</view>
				</view>
			</view>
			<image class="arrows cuIcon-right"></image>
		</view>
	</view>
</template>

<script>
	import cfg from '../../cfg.js';
	import all from '../../common/global.js';
	export default {
		data() {
			return {
				keywords: '',
				hidden: true,
				distance: [],
				retailer: [],
				type: ''
			};
		},
		onLoad(params) {
			//params:是获取上个页面传过来的参数
			var that = this;
			that.type = params.type;
			console.log(that.type);
			// alert(that.type);
		},
		onShow() {
			this.getReatailer();
		},
		methods: {
			getReatailer(){
				var that = this;
				uni.request({
					url: cfg.originUrl + '/shop/retailer/bytype.do',
					method: 'GET',
					data: {
						type: that.type
					},
					success: function(res) {
						console.log(res);
						// alert(JSON.stringify(res.data.data));
						that.retailer = res.data.data;
				
						for (let i = 0; i < res.data.data.length; i++) {
							var lat1 = res.data.data[i].latitude;
							var lng1 = res.data.data[i].longtitude;
							console.log(lat1 + " " + lng1);
							var lat2 = all.globalData.lat;
							var lng2 = all.globalData.lon;
							that.getdistance(lat1, lng1, lat2, lng2);
							console.log(that.distance);
						}
					}
				})
			},
			focus() {
				this.hidden = !this.hidden;
			},
			//搜索
			search(e) {
				var temp = [];
				var keyword = this.keywords;
				console.log(this.keywords);
				if (keyword == '') {
					// this.list = this.shopList;
					return;
				}
				for (var i = 0; i < this.retailer.length; i++) {
					if (this.retailer[i].name.match(keyword)) {
						console.log(this.retailer[i].name);
						temp.push(this.retailer[i]);
					}
				}
				this.retailer = temp;
			},
			//获取距离
			getdistance(lat1, lng1, lat2, lng2) {
				var that = this;
				var radLat1 = lat1 * Math.PI / 180.0;
				var radLat2 = lat2 * Math.PI / 180.0;
				var a = Math.abs(radLat1 - radLat2);
				var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(
					Math.sin(b / 2), 2)));
				s = s * 6378.137; // EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000;
				console.log(s);
				that.distance.push(s);
				return s;
			},
			//清除
			clear(){
				this.keywords = '',
				this.hidden = !this.hidden;
				this.getReatailer();
			},
			toCompanyInfo(item){
				console.log(item);
				uni.setStorageSync('nearStore',item);
				uni.navigateTo({
					url: '../retailerInfo/retailerInfo'
				})
			}
		}
	};
</script>

<style>
	@import url("../../css/retailerType.css");
</style>
