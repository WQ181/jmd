<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true" class="swiper-item">
			<swiper-item v-for="(item, index) in swiperImg" :key="index">
				<image class="img" :src="item.image"></image>
			</swiper-item>
		</swiper>
		<view class="redian" style="background-color: white;">
			<view class="word w1">热</view>
			<view class="word w2">点</view>
			<view class="uni-padding-wrap">
				<view class="uni-swiper-msg">
					<view class="uni-swiper-msg-icon redian-img">
						<view class="cuIcon-notificationfill"></view>
					</view>
					<swiper vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item v-for="(item, index) in msg" :key="index">
							<navigator class="redian-infor">{{ item }}</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- vip充值按钮 -->
		<view class="vip cuIcon-vipcard" @tap="vip">本店vip特惠,详情请点击</view>
		<view class="flex-y">
			<view class="work-time">营业时间:{{info.time}}</view>
			<view>店面地址:{{info.addr}}</view>
			<view>联系电话:{{info.mobile}}</view>
		</view>

		<button class="but" @click="button1" v-if="info.type=='美食'">快速点餐</button>

		<!-- 搜索 -->
		<view class="search-item">
			<view class="item">
				<view class="cuIcon-search" style="margin-left: 10upx;"></view>
				<input class="input" type="text" v-model="keywords" placeholder="请输入关键字进行搜索" />
				<view class="search-btn" @click="search">搜索</view>
			</view>
		</view>

		<!-- 当前类型不为美食时 -->
		<view v-if="info.type!='美食'">
			<!-- tabbar列表 -->
			<view class="category-list">
				<view class="category" v-for="(row, index) in categoryList" :key="index" @tap="toCategory(row)">
					<view class="img">
						<image class="ig" :src="row.image"></image>
					</view>
					<view class="text">{{ row.title }}</view>
				</view>
			</view>
			<!-- 商品类表 -->
			<view>
				<!-- 顶部导航 -->
				<view class="topTabBar">
					<view class="grid" v-for="(grid,tbIndex) in couponType" :key="tbIndex" @tap="showType(tbIndex)">
						<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
					</view>
				</view>
				<view class="product-list">
					<view class="product" v-for="(item,index) in list" :key="item.goods_id" @tap="toGoods(item)">
						<view class="ige">
							<image mode="widthFix" :src="item.image"></image>
						</view>
						<view class="name">{{ item.name }}</view>
						<view class="info">
							<view class="price">￥{{ item.price/100 }}</view>
							<view class="slogan">购买</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import cfg from '../../cfg.js'
	export default {
		data() {
			return {
				pageNumber: 1,
				pageSize: 10,
				info: [], //信息
				keywords: '',
				categoryList: [],
				productList: [],
				retailerId: 0,
				couponType: ['所有商品', '特价商品'],
				tabbarIndex: 0,
				list: []
			}
		},
		onLoad(options) {
			var value = uni.getStorageSync('nearStore');
			// console.log(value);
			this.info = value;
			console.log(this.info);

			console.log(value.type);
			this.type = value.type;
			this.retailerId = value.id;

			var that = this;
			var newMsg = ['uni-app行业峰会频频亮相', 'DCloud完成融资，uni-app震撼发布'];
			that.msg = newMsg;
			var newSwiperImage = [{
				image: '../../static/image/shouye1.jpg'
			}, {
				image: '../../static/image/shouye2.jpg'
			}];
			that.swiperImg = newSwiperImage;
			// 所有商品分类
			uni.request({
				url: cfg.originUrl + '/commodity/type/get',
				method: 'GET',
				data: {},
				success(res) {
					// console.log(res.data.data);
					for (var i = 0; i < res.data.data.length; i++) {
						if (that.type == res.data.data[i].title) {
							for (var j = 0; j < res.data.data[i].children.length; j++) {
								that.categoryList.push(res.data.data[i].children[j]);
							}
						}
					}
					// that.categoryList = res.data.data;
					console.log(that.categoryList);
				}
			})
		},
		onShow() {
			this.tabbarIndex = 0;
			this.list = this.productList;
			this.getList(this.pageNumber);
		},
		//下拉刷新
		onPullDownRefresh: function() {
			var that = this;
			that.pageNumber = 1;
			that.getList();
			uni.stopPullDownRefresh();
		},
		//上拉分页
		onReachBottom: function() {
			//上拉分页,pageNum+1，然后调用分页函数getLsit()
			var that = this;
			that.pageNumber++;
			uni.showToast({
				icon: 'loading',
				title: '加载中',
				duration: 1000
			});
			this.getList(that.pageNumber);
			// console.log(that.productList);
		},
		methods: {
			showType(tbIndex) {
				this.tabbarIndex = tbIndex;
				this.list = this.productList;
				// console.log('rr');
				if (tbIndex == 0) {
					this.list = this.productList;
					console.log('qq');
				}
				if (tbIndex == 1) {
					console.log('ww');
					this.specialShop();
				}
			},
			getList(pageNumber) {
				uni.request({
					url: cfg.originUrl + '/shop/retailer/commodity/get',
					method: 'GET',
					data: {
						pageNumber: pageNumber,
						pageSize: this.pageSize,
						name: "",
						retailerId: this.info.id,
						typeid: ""
					},
					success: res => {
						// console.log(res);
						console.log(res.data.data.list);
						for (var j = 0; j < res.data.data.list.length; j++) {
							this.productList.push(res.data.data.list[j]);
						}
						// return;
					}
				});
			},
			//特价商品
			specialShop() {
				var list = this.productList;
				var newList = [];
				for (var i = 0; i < list.length; i++) {
					if (list[i].is_special == true) {
						console.log('is_special');
						newList.push(list[i]);
					}
				}
				this.list = newList;
			},
			button1() {
				uni.navigateTo({
					url: '../retailerCommodity/retailerCommodity'
				})
			},
			vip() {
				console.log(this.retailerId);
				uni.navigateTo({
					url: 'vip/vip?retailerId=' + this.retailerId
				})
			},
			search(e) {
				var keyword = this.keywords;
				console.log(this.keywords);
				uni.navigateTo({
					url: `../search/search?keyword=${keyword}&retailerId=${this.retailerId}`
				});
			},
			toGoods(product) {
				console.log(product);
				uni.setStorageSync('shopList', product);
				uni.navigateTo({
					url: '../productDetails/productDetails?retailerId=' + this.retailerId
				})
			},
		}
	}
</script>

<style>
	@import url("../../css/retailerInfo.css");
</style>
