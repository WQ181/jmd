<template>
	<view class="category">
		<view class="category-wrapper" v-if="categoryList.length>0">
			<!-- 左边导航 -->
			<scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true" :scroll-top="left_scroll">
				<view class="left-content">
					<view class="title-content" :class="select_index === index?'onSelected':''" v-for="(title,index) in categoryList"
					 :key="title.id" @tap="choose(index)">{{title.title}}</view>
				</view>
			</scroll-view>
			<!-- 右边内容 -->
			<scroll-view scroll-y="true" class="right-wrapper" scroll-with-animation="true" :scroll-top="right_scroll" @scroll="myscroll">
				<view class="right-content">
					<!-- banner区域 -->
					<view class="banner-wrapper">
						<swiper class="swiper-content" :autoplay="true" :interval="3000" :circular="true">
							<swiper-item class="swiper-item" v-for="imgs in swiperList" :key="imgs.id">
								<image class="swiper-img" :src="imgs.src"></image>
							</swiper-item>
						</swiper>
					</view>
					<!-- 产品区 -->
					<view class="product-wrapper">
						<view class="category-item" :id="'list'+c_index" v-for="(c_item,c_index) in categoryList" :key="c_item.id">
							<view class="category-title">{{c_item.title}}</view>
							<view class="category-content">
								<view class="box" v-for="(box,index) in c_item.list" :key="index">
									<image class="img" :src="'../../static/ListPng/'+box.img"></image>
									<view class="details">
										<view class="name">{{box.name}}</view>
										<view class="volume">销量：</view>
										<view class="price">
											<view class="price1">￥{{ box.price/100 }}</view>
											<view class="imaIcon" @tap.stop="sub(box.commodity_id)">
												<image class="imaIcon" src="../../static/image/subtract.png"></image>
											</view>
											<view class="quantity">{{ box.number }}</view>
											<view class="imgIcon" @tap.stop="add(box.commodity_id)">
												<image class="imageIcon" src="../../static/image/plus.png"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="pps flex-y">
			<uni-popup ref="popup" type="bottom">
				<view class="bbCar flex-x">
					<view class="line1">购物车</view>
					<view class="line1" @click="clearCart">清空</view>
				</view>
				<view class="listCar" v-for="(item,index) in orderList" :key="index">
					<view class="listCar1">{{ item.name }}</view>
					<view class="listCar2 flex-x">
						<view class="price3">￥{{ item.price/100 }}</view>
						<view class="imgIcon1" @tap.stop="sub(item.id)">
							<image class="imaIcon1" src="../../static/image/subtract.png"></image>
						</view>
						<view class="quantity">{{ item.number }}</view>
						<view class="imgIcon1" @tap.stop="add(item.id)">
							<image class="imaIcon1" src="../../static/image/plus.png"></image>
						</view>
					</view>
				</view>
				<view class="ppss"></view>
			</uni-popup>
		</view>

		<!-- 结算部分 -->
		<view class="shopping">
			<view class="imgs">
				<view class="dot">
					<uni-badge :text="totalNumber" type="error" size="small" />
				</view>
				<view class="car" @click="openPopup">
					<image class="bayCar" src="../../static/tabbar/cart2.png"></image>
				</view>
			</view>
			<view class="middle">
				<view>￥{{totalPrice/100}}</view>
				<view>优惠信息请至结算页面查看</view>
			</view>
			<view class="toBuy" @click="toConformation">
				去结算
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge/uni-badge.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		components: {
			uniBadge,
			uniPopup
		},
		data() {
			return {
				totalNumber: 0,
				totalPrice: 0,
				windows_height: 0, //屏幕高度
				swiperList: [],
				select_index: 0,
				right_height: [], //右侧每个内容的高度集合
				right_scroll: 0, //右侧的滑动值
				left_height: 0, //左侧总高度
				left_scroll: 0, //左侧滑动值
				last: 0,
				orderList: [], //订单
				categoryList: [{
						id: 1,
						title: '本店特色',
						list: [{
								commodity_id: 1,
								name: '砂锅蒜香鱼头',
								img: 'ts1.jpg',
								price: 6600,
								number: 0,
								select: false
							},
							{
								commodity_id: 2,
								name: '面香宝塔肉',
								img: 'ts2.jpg',
								price: 5100,
								number: 0,
								select: false
							},
							{
								commodity_id: 3,
								name: '蜜汁烤肉',
								img: 'ts3.jpg',
								price: 5400,
								number: 0,
								select: false
							},
							{
								commodity_id: 4,
								name: '爱喇叭土鸡',
								img: 'ts4.jpg',
								price: 5600,
								number: 0,
								select: false
							}
						]
					},
					{
						id: 2,
						title: '山珍野味',
						list: [{
								commodity_id: 5,
								name: '野生泥鳅',
								img: 'yw1.jpg',
								price: 7600,
								number: 0,
								select: false
							},
							{
								commodity_id: 6,
								name: '野生鳝鱼',
								img: 'yw2.jpg',
								price: 8600,
								number: 0,
								select: false
							},
							{
								commodity_id: 7,
								name: '野生杂鱼火锅',
								img: 'yw3.jpg',
								price: 50600,
								number: 0,
								select: false
							}
						]
					},
					{
						id: 3,
						title: '自熏腊味',
						list: [{
							commodity_id: 8,
							name: '干牛肉',
							img: 'lw1.jpg',
							price: 55600,
							number: 0,
							select: false
						}]
					}
				]
			}
		},
		onLoad() {
			this.$nextTick(() => {
				this.getHeightList();
			})
			this.windows_height = uni.getSystemInfoSync().windowHeight;
		},
		onUnload() {
			//页面后退时候，清除订单信息
			this.clearOrder();
		},
		methods: {
			//弹出层
			openPopup() {
				this.$refs.popup.open();
			},
			closePopup() {
				this.$refs.popup.close()
			},
			onCancel(e) {
				console.log(e)
			},
			clearOrder() {
				uni.removeStorage({
					key: 'cart-buy',
					success: (res) => {
						this.buylist = [];
						console.log('remove buylist success');
					}
				});
			},
			getHeightList() {
				let _this = this;
				let selectorQuery = uni.createSelectorQuery();
				selectorQuery.select('.left-content').boundingClientRect(function(rects) {
					_this.left_height = rects.height;
				});
				selectorQuery.selectAll('.category-item').boundingClientRect(function(rects) {
					_this.right_height = rects.map((item) => item.top);
					console.log(_this.right_height)
				}).exec();
			},
			// 选分类
			choose(index) {
				if (this.select_index === index) {
					return;
				}
				this.select_index = index;
				// 加入防抖
				if (this.timeout) {
					clearTimeout(this.timeout); //清除计时器				
				}
				this.timeout = setTimeout(() => {
					this.right_scroll = this.right_height[index] - 110;
				}, 300)
			},
			myscroll(e) {
				//引入节流	
				let right_content_height = e.detail.scrollHeight - this.windows_height;
				if (right_content_height == e.detail.scrollTop) {
					return;
				}
				let scroll_top = e.detail.scrollTop + 110; //110是banner图的高度
				//判断当前的scrollTop在哪个区间内;
				let now = +new Date();
				if (now - this.last > 100) {
					this.last = now;
					let active_index = this.right_height.findIndex((value, index, arr) => value <= scroll_top && scroll_top < arr[
						index + 1]);
					this.select_index = active_index;
					if (this.left_height - this.windows_height) {
						//如果有超出部分
						let diff = this.left_height - this.windows_height
						this.left_scroll = Math.round((active_index * diff) / (this.categoryList.length - 1))
					}
				}
			},
			//清空购物车
			clearCart() {
				this.orderList = [];
				this.totalNumber = 0;
				this.totalPrice = 0;
				for (var i = 0; i < this.categoryList.length; i++) {
					for (var j = 0; j < this.categoryList[i].list.length; j++) {
						this.categoryList[i].list[j].number = 0;
					}
				}
				this.closePopup();
				uni.removeStorageSync('commodity-buy');
			},
			// 加数量
			add(itemid) {
				for (let i = 0; i < this.categoryList.length; i++) {
					for (let k = 0; k < this.categoryList[i].list.length; k++) {
						// 这里进行控制商品的最大数量 这里面示例可售卖100
						if (this.categoryList[i].list[k].commodity_id == itemid) {
							//加入订单里面
							if (this.orderList.length == 0) {
								// 更新item数量
								this.categoryList[i].list[k].number = this.categoryList[i].list[k].number + 1;
								// 勾选状态下更新数量和金额
								this.categoryList[i].list[k].select = true;
								// 更新总数量
								this.updatecntitems(1);
								// 更新总金额
								this.updatetotalamt(this.categoryList[i].list[k].price);

								this.orderList.push(this.categoryList[i].list[k]);
								console.log(this.orderList);
								uni.setStorageSync('commodity-buy', this.orderList);

							} else if (this.categoryList[i].list[k].select == false) {
								// 更新item数量
								this.categoryList[i].list[k].number = this.categoryList[i].list[k].number + 1;
								// 勾选状态下更新数量和金额
								this.categoryList[i].list[k].select = true;
								// 更新总数量
								this.updatecntitems(1);
								// 更新总金额
								this.updatetotalamt(this.categoryList[i].list[k].price);

								this.orderList.push(this.categoryList[i].list[k]);
								console.log(this.orderList);
								uni.setStorageSync('commodity-buy', this.orderList);

							} else if (this.categoryList[i].list[k].select == true) {
								// 更新item数量
								this.categoryList[i].list[k].number = this.categoryList[i].list[k].number + 1;
								// 更新总数量
								this.updatecntitems(1);
								// 更新总金额
								this.updatetotalamt(this.categoryList[i].list[k].price);
								return;
							}


						}
						if (this.categoryList[i].list[k].number > 5) {
							uni.showToast({
								title: '点少点，要减肥',
								icon: 'none'
							})
						}
					}
				}
			},
			// 减数量
			sub(itemid) {
				for (let i = 0; i < this.categoryList.length; i++) {
					for (let k = 0; k < this.categoryList[i].list.length; k++) {
						if ((this.categoryList[i].list[k].commodity_id == itemid) && (this.categoryList[i].list[k].number > 0)) {
							// 更新item数量
							this.categoryList[i].list[k].number = this.categoryList[i].list[k].number - 1;
							this.categoryList[i].list[k].select = true;
							// 更新总数量
							this.updatecntitems(-1)
							// 更新总金额
							this.updatetotalamt(-this.categoryList[i].list[k].price)
							if (this.categoryList[i].list[k].number == 0) {
								this.categoryList[i].list[k].select = false;
								for (var j = 0; j < this.orderList.length; j++) {
									if (this.categoryList[i].list[k].name == this.orderList[j].name) {
										this.orderList.splice(j, 1);
										console.log(this.orderList);
										uni.setStorageSync('commodity-buy', this.orderList);
									}
								}
								return;
							}
							return;
						} else if (this.categoryList[i].list[k].number <= 0) {
							uni.showToast({
								icon: 'none',
								title: '不能再减咯'
							})
						}
					}
				}
			},
			// 更新合计金额
			updatetotalamt(amt) {
				this.totalPrice = this.totalPrice + amt;
				this.totalPrice = this.fmamount(this.totalPrice);
			},
			// 更新合计数量
			updatecntitems(cnt) {
				this.totalNumber = this.totalNumber + cnt;
			},
			// 格式化金额
			fmamount(amt) {
				return Math.round(amt * 100) / 100;
			},
			toCart() {
				var value = uni.getStorageSync('commodity-buy');
				console.log(value);
			},
			//提交订单
			toConformation() {
				if (this.orderList.length == 0) {
					uni.showToast({
						title: '购物车不能为空',
						icon: 'none'
					})
					return
				}
				var len = this.categoryList.length;
				var List = [];
				for (let i = 0; i < this.categoryList.length; i++) {
					var len2 = this.categoryList[i].list.length;
					// console.log(len2);
					for (let j = 0; j < len2; j++) {
						if (this.categoryList[i].list[j].select == true) {
							if (List.length == 0 || this.categoryList[i].list[j].id != List[i].id) {
								List.push(this.categoryList[i].list[j]);
							} else {
								return;
							}
						}
					}
				}
				console.log(List);
				uni.setStorageSync('buy', List);
				uni.navigateTo({
					url: '../comformation/comformation2/comformation2'
				})
				var comformation = uni.getStorageSync('commodity-buy');
				console.log(comformation);
			}
		}
	}
</script>

<style lang="less">
	.shopping {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100upx;
		border-top: 1upx solid #F3F3F3;
		position: fixed;
		bottom: 0;
		background-color: #474749;
	}

	.dot {
		position: fixed;
		bottom: 100upx;
		left: 120upx;
		z-index: 3;
	}

	.middle {
		display: flex;
		flex-direction: column;
		width: 50%;
		color: white;
	}

	.car {
		background-color: #fff;
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		margin-bottom: 90upx;
	}

	.bayCar {
		width: 60upx;
		height: 60upx;
		margin-top: 20upx;
		color: #000;
	}

	//购物车小图标
	.imgs {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 25%;
		height: 100%;
		text-align: center;
	}


	.toBuy {
		width: 25%;
		height: 100%;
		background-color: #FE9402;
		text-align: center;
		line-height: 100upx;
		color: white;

	}

	.quantity {
		margin-left: 20upx;
	}

	.category {

		.category-wrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			position: absolute;
			top: 0;
			bottom: 0;
			margin-bottom: 80upx;

			.left-wrapper {
				width: 200rpx;
				flex: 0 0 200rpx;
				background-color: #f6f6f6;

				.left-content {

					.title-content {
						width: 100%;
						height: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 25rpx;
						border-bottom: 1px solid #dedede;
						cursor: pointer;

						&:last-child {
							border-bottom: 0;
						}

						&.onSelected {
							background-color: #fff;
							position: relative;
							color: #feb436;

							&::before {
								content: '';
								position: absolute;
								left: 0;
								top: 0;
								width: 10rpx;
								height: 100%;
								background: linear-gradient(124deg, #feb436 0%, #fb7c22 100%);
							}
						}
					}
				}
			}

			.right-wrapper {
				flex: 1;

				.right-content {
					width: 100%;
					padding: 20rpx 0;
					border-left: 1rpx solid #efefef;
					box-sizing: border-box;

					.banner-wrapper {
						padding: 0 20rpx;

						.swiper-content {
							width: 100%;
							height: 180rpx;
							margin-bottom: 20rpx;

							.swiper-item {
								.swiper-img {
									width: 100%;
									height: 180rpx;
								}
							}
						}
					}

					.product-wrapper {
						.category-item {

							.category-title {
								height: 60rpx;
								font-size: 26rpx;
								line-height: 60rpx;
								font-weight: 500;
								background-color: #f6f6f6;
								padding-left: 20rpx;
								color: #000;
							}

							.category-content {
								display: flex;
								flex-direction: row;
								flex-flow: wrap;
								padding: 20rpx 20rpx 0;


								.product-item {
									width: 33%;
									display: flex;
									flex-direction: column;
									justify-content: center;
									align-items: center;
									margin-bottom: 20rpx;

									.product-img {
										width: 120rpx;
										height: 140rpx;
										margin-bottom: 10rpx;
									}

									.product-title {
										font-size: 23rpx;
									}
								}
							}
						}
					}
				}
			}
		}

	}

	.box {
		// margin: 15upx;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 200upx;
		border-bottom: 1upx solid #efefef;

		.img {
			width: 180upx;
			height: 180upx;
		}

		.details {
			display: flex;
			flex-direction: column;

			.name {
				// margin-top: 20upx;
				margin-left: 20upx;
			}

			.volume {
				margin-top: 20upx;
				margin-left: 20upx;
			}

			.price {
				display: flex;
				flex-direction: row;
				margin-top: 20upx;
				margin-left: 18upx;

				.price1 {
					color: red;
				}

				.imgIcon {
					margin-left: 25upx;

					.imageIcon {
						width: 45upx;
						height: 45upx;
					}
				}

				.imaIcon {
					margin-left: 30upx;

					.imaIcon {
						width: 45upx;
						height: 45upx;
					}
				}
			}
		}
	}

	//弹出层
	// popup
	.price3 {
		color: red;
	}

	.imgIcon1 {
		margin-left: 25upx;
	}

	.imaIcon1 {
		width: 45upx;
		height: 45upx;
	}

	.pps {
		position: absolute;
		z-index: 0;
	}

	.flex-x {
		display: flex;
		flex-direction: row;
	}

	.flex-y {
		display: flex;
		flex-direction: column;
	}

	.bbCar {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 90upx;
		background-color: #ECECEE;
	}

	.line1 {
		line-height: 100upx;
	}

	.listCar {
		width: 100%;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		border-bottom: 3upx solid #ECECEE;
	}

	.listCar1 {
		line-height: 100upx;
	}

	.listCar2 {
		padding-top: 30upx;
		line-height: 100upx;
	}

	.quantity {
		margin-left: 20upx;
	}

	.ppss {
		height: 170upx;
	}
</style>
