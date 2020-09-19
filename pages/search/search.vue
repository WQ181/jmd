<template>
	<view>
		<!-- 头部分 -->
		<view class="search">
			<!-- 头部搜索 -->
			<view class="search-head">
				<!-- 搜索 -->
				<view class="search-item">
					<view class="item">
						<image class="search-img cuIcon-search"></image>
						<input class="search-input" type="text" v-model="keywords" placeholder="请输入关键字进行搜索" @focus="focus" />
						<view class="cuIcon-close" @click="refresh"></view>
					</view>
					<view class="search-btn" v-if="!hidden" @click="search">搜索</view>
				</view>
				<view class="change">
					<image class="png" src="../../static/image/duo.png" v-show="!showUpImg" @click="changeImg"></image>
					<image class="png" src="../../static/image/yi.png" v-show="showUpImg" @click="changeImg"></image>
				</view>
			</view>

			<!-- 筛选类别按钮 -->
			<view class="search-form">
				<view class="filter" @click="sort(item)" v-for="(item,index) in searchForm" :key="index">
					<view>{{item}}</view>
					<view v-if="item=='筛选'" class="cuIcon-filter" @click="openPopup"></view>
				</view>
			</view>
		</view>

		<!-- 弹出层 -->
		<view class="popup ">
			<uni-popup ref="popup" type="top">
				<view class="flex-y">
					<view class="box1 flex-x">
						<view v-for="(item,index) in chooseItem" :key="index" @click="chooseItems(item)">
							<view class="label">{{item}}</view>
						</view>
					</view>
					<view class="select">选择商家</view>
					<view class="classify flex-x">
						<view class="cls1">
							<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
								<view v-for="(item,index) in retailer" :key="index">
									<view class="names" @click="chooseRetailer(item)">{{item.name}}</view>
								</view>
							</scroll-view>
						</view>
						<!-- <view class="cls2">
							<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
								<view class="names">165465</view>
							</scroll-view>
						</view> -->
					</view>
					<view class="pop-bottom flex-x">
						<view class="bottom-left" @click="closePopup">取消筛选</view>
						<view class="bottom-right" @click="closePopup">确认</view>
					</view>
				</view>
			</uni-popup>
		</view>

		<!-- 商品列表 -->
		<view class="detail" v-if="showUpImg">
			<view class="guss" v-for="(item,index) in list" :key="index" @tap="toDetails(item)">
				<view class="image-wrapper">
					<image class="wrapper-img" :src="item.image"></image>
				</view>
				<view class="bottom">
					<view class="title ">
						{{item.name}}
					</view>
					<view class="shop-title">
						{{item.title}}
					</view>
					<view class="bottom-bottom">
						<view class="price">
							￥{{item.price/100}}
						</view>
						<view class="buyNum" v-if="item.number>0">
							{{item.number}}人付款
						</view>
					</view>

				</view>
			</view>
		</view>

		<view class="detail-copy" v-if="!showUpImg">
			<view class="guss-copy" v-for="(item,index) in list" :key="index" @tap="toDetails(item)">
				<image :src="item.image" class="img"></image>
				<view class="copy">
					<view class="title-copy">
						{{item.name}}
					</view>
					<view class="shop-title-copy">
						{{item.title}}
					</view>
					<view class="copy-bottom">
						<view class="price-copy">
							￥{{item.price/100}}
						</view>
						<view class="buyNum" v-if="item.number>0">
							{{item.number}}人付款
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '../../components/uni-popup/uni-popup.vue';
	import cfg from '../../cfg.js';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				choose: false,
				pageNumber: 1,
				pageSize: 10,
				hidden: true,
				keywords: '',
				retailerId: 0,
				showUpImg: true,
				searchForm: ['综合', '销量', '价格', '筛选'],
				chooseItem: ['推荐商品', '热卖商品', '促销商品'],
				list: [],
				retailer: [], //商家
			}
		},
		onLoad(options) {
			//获取商家列表方法
			this.getRetailerList();
			console.log(options);
			//关键字搜索
			this.keywords = options.keyword;
			this.retailerId = options.retailerId;
			// console.log(this.retailerId);
		},
		onShow() {
			console.log('iii');
			this.getList(this.pageNumber);
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
		},
		methods: {
			getList(pageNumber) {
				uni.request({
					url: cfg.originUrl + '/shop/retailer/commodity/get',
					method: 'GET',
					data: {
						pageNumber: pageNumber,
						pageSize: this.pageSize,
						name: "",
						retailerId: this.retailerId,
						typeid: ""
					},
					success: res => {
						console.log(res.data.data.list);
						for (var j = 0; j < res.data.data.list.length; j++) {
							this.list.push(res.data.data.list[j]);
						}
						// this.list = this.shopList;
					}
				});
			},
			//获取商家
			getRetailerList() {
				uni.request({
					url: cfg.originUrl + '/shop/retailer/allretailer',
					method: 'GET',
					success: (res) => {
						// console.log(res.data.data);
						this.retailer = res.data.data;
					}
				})
			},
			//类别选择
			chooseItems(item) {
				console.log(item);
				if (item == '促销商品') {
					var temp = [];
					for (var i = 0; i < this.list.length; i++) {
						if(this.list[i].is_special){
							console.log('jj');
							temp.push(this.list[i]);
						}
					}
					console.log(temp);
					this.list == temp;
				}
			},
			//商家选择
			chooseRetailer(item) {
				console.log(item);
				this.retailerId = item.id;
				this.list = [];
				this.getList(this.pageNumber);
			},
			scroll(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			//样式切换
			changeImg() {
				this.showUpImg = !this.showUpImg
			},
			focus() {
				this.hidden = !this.hidden;
			},
			//刷新页面
			refresh() {
				this.keywords = '';
				uni.showToast({
					icon: 'loading',
					title: '刷新数据'
				})
				this.list = this.shopList;
				// this.hidden = !this.hidden;
			},
			//搜索
			search() {
				var temp = [];
				var keyword = this.keywords;
				console.log(this.keywords);
				if (keyword == '') {
					this.list = this.shopList;
					return;
				}
				for (var i = 0; i < this.shopList.length; i++) {
					if (this.shopList[i].name.match(keyword)) {
						console.log(this.shopList[i].name);
						temp.push(this.shopList[i]);
					}
				}
				this.list = temp;
			},
			// 按效果分类
			sort(item) {
				console.log(item);
				var temp = [];
				if (item == '价格') {
					this.list.sort(function(a, b) {
						if (a.price === b.price) { //如果id相同，按照age的降序
							return b.id - a.id
						} else {
							return a.price - b.price
						}
					})
					console.log(this.list);
				}
				if (item == '销量') {
					this.list.sort(function(a, b) {
						if (a.bestseller === b.bestseller) { //如果id相同，按照age的降序
							return b.id - a.id
						} else {
							return a.bestseller - b.bestseller
						}
					})
					console.log(this.list);
				}
			},
			//去商品详情界面
			toDetails(item) {
				console.log(item);
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
	}
</script>

<style lang="scss">
	@import '../../css/search.css';

	.flex-x {
		display: flex;
		flex-direction: row;
	}

	.flex-y {
		display: flex;
		flex-direction: column;
	}

	.popup {
		position: absolute;
		z-index: 1;
	}

	.box1 {
		width: 100%;
		// height: 160upx;
		flex-wrap: wrap;
	}

	.label {
		width: 200upx;
		height: 55upx;
		color: #999999;
		line-height: 55upx;
		text-align: center;
		margin-left: 25upx;
		margin-top: 30upx;
		border: 2upx solid #999999;
		border-radius: 15upx;
	}

	.select {
		margin-top: 30upx;
		width: 100%;
		height: 70upx;
		color: #999999;
		line-height: 70upx;
		text-align: center;
		border-top: 2upx solid #999999;
		border-bottom: 2upx solid #999999;
	}

	.classify {
		width: 100%;
		height: 450upx;
	}

	.pop-bottom {
		border-top: 2upx solid #999999;
		height: 60upx;
		justify-content: space-between;
	}

	.bottom-left {
		margin-top: 20upx;
		color: #999999;
		font-size: 35upx;
	}

	.bottom-right {
		margin-top: 20upx;
		color: red;
		font-size: 35upx;
	}

	.cls1 {
		height: 100%;
		width: 33%;
		margin-left: 20upx;
	}

	.scroll-Y {
		height: 100%;
	}

	.cls2 {
		height: 100%;
		width: 33%;
		border-left: 0.5upx solid #999999;
		border-right: 0.5upx solid #999999;
	}

	names {
		height: 30upx;
		text-align: center;
		margin-top: 20upx;
	}
</style>
