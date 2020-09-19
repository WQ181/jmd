<template>
	<view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="cuIcon-cart" v-if="goodsList.length==0"></view>
			<view class="tis" v-if="goodsList.length==0">购物车是空的哦~</view>
			<view class="tis" v-if="goodsList.length!=0">普通商城</view>
			<view class="row" v-for="(row,index) in goodsList" :key="index">
				<!-- 删除按钮 -->
				<view class="menu" @tap.stop="deleteGoods(row.id)">
					<view class="cuIcon-delete"></view>
				</view>
				<!-- 商品 -->
				<view class="carrier" :class="[theIndex==index?'open':oldIndex==index?'close':'']" @touchstart="touchStart(index,$event)"
				 @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
					<!-- checkbox -->
					<view class="checkbox-box" @tap="selected(index)">
						<view class="checkbox">
							<view :class="[row.selected?'on':'']"></view>
						</view>
					</view>
					<!-- 商品信息 -->
					<view class="goods-info" @tap="toGoods(row)">
						<view class="img">
							<image :src="row.image"></image>
						</view>
						<view class="info">
							<view class="title">{{row.name}}</view>
							<!-- <view class="spec">特价:{{row.special_price}}</view> -->
							<view class="special-price" v-if="row.is_special">特价:￥{{row.special_price/100}}元</view>
							<view class="price-number">
								<view class="price">￥{{row.price/100}}元</view>
								<view class="number">
									<view class="sub" @tap.stop="sub(index)">
										<view class="cuIcon-back"></view>
									</view>
									<view class="input" @tap.stop="discard">
										<input type="number" v-model="row.number" @input="sum($event,index)" />
									</view>
									<view class="add" @tap.stop="add(index)">
										<view class="cuIcon-right"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 脚部菜单 -->
		<view class="footer">
			<view class="checkbox-box" @tap="allSelect">
				<view class="checkbox">
					<view :class="[isAllselected?'on':'']"></view>
				</view>
				<view class="text">全选</view>
			</view>
			<view class="delBtn" @tap="deleteList" v-if="selectedList.length>0">删除</view>
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice/100}}</view>
				</view>
				<view class="btn" @tap="toConfirmation">结算({{selectedList.length}})</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sumPrice: '0.00',
				selectedList: [],
				isAllselected: false,
				goodsList: [],
				//控制滑动效果
				theIndex: null,
				oldIndex: null,
				isStop: false
			}
		},
		created() {
			//获取普通订单的信息
			this.getCart();
		},
		// 关闭购物车前 存入缓存
		beforeDestroy: function() {
			// 购物车数据更新缓存
			uni.setStorageSync('cart', this.goodsList);
		},
		methods: {
			getCart() {
				var value = uni.getStorageSync('cart');
				console.log(value);
				// console.log(value.length);
				// var list = [];
				if (value == '') {
					console.log('dnka');
					return;
				} else {
					let len = this.goodsList.length;
					let isFind = false; //是否找到ID一样的商品
					for (let i = 0; i < len; i++) {
						let row = this.goodsList[i];
						if (row.commodity_id == value[i].commodity_id) { //找到商品一样的商品
							row.number++; //数量自增
							isFind = true; //找到一样的商品
							break; //跳出循环
						}
					}
					if (!isFind) {
						//没有找到一样的商品，新增一行到购物车商品列表头部
						for (var j = 0; j < value.length; j++) {
							this.goodsList.push(value[j]);
						}
					}
					// this.goodsList = list;
				}
				// console.log(this.goodsList);
			},
			//控制左滑删除效果-begin
			touchStart(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			},
			touchMove(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];

				if (this.isStop || Math.abs(moveX) < 5) {
					return;
				}
				if (Math.abs(moveY) > Math.abs(moveX)) {
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}

				if (moveX < 0) {
					this.theIndex = index;
					this.isStop = true;
				} else if (moveX > 0) {
					if (this.theIndex != null && this.oldIndex == this.theIndex) {
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(() => {
							this.oldIndex = null;
						}, 150)
					}
				}
			},
			touchEnd(index, $event) {
				//结束禁止触发效果
				this.isStop = false;
			},
			//控制左滑删除效果-end

			//商品跳转
			toGoods(e) {
				console.log(e);
				uni.setStorageSync('shopList', e);
				uni.navigateTo({
					url: '../productDetails/productDetails'
				});
			},
			//跳转确认订单页面
			toConfirmation() {
				var type;
				let tmpList = [];
				let len = this.goodsList.length;
				for (let i = 0; i < len; i++) {
					if (this.goodsList[i].selected) {
						tmpList.push(this.goodsList[i]);
						// this.goodsList.splice(i, 1);
						// len--;
					}
				}
				if (tmpList.length < 1) {
					uni.showToast({
						title: '请选择商品结算',
						icon: 'none'
					});
					return;
				}
				if (tmpList[0].retailer_id == 1) {
					type = 5;
				} else {
					type = 1;
				}
				uni.setStorage({
					key: 'cart-buy',
					data: tmpList,
					success: () => {
						uni.navigateTo({
							url: '../comformation/comformation?type=' + type
						})
					}
				})
				this.sumPrice = 0;
				this.isAllselected = false;
				for (var i = 0; i < this.goodsList.length; i++) {
					this.goodsList[i].selected = false;
				}
				this.selectedList = [];
				uni.setStorageSync('cart', this.goodsList);
			},
			//删除商品
			deleteGoods(id) {
				let len = this.goodsList.length;
				for (let i = 0; i < len; i++) {
					if (id == this.goodsList[i].id) {
						this.goodsList.splice(i, 1);
						break;
					}
				}
				this.selectedList.splice(this.selectedList.indexOf(id), 1);
				this.sum();
				this.oldIndex = null;
				this.theIndex = null;
				uni.setStorageSync("cart", this.goodsList);
			},
			// 删除商品s
			deleteList() {
				let len = this.selectedList.length;
				while (this.selectedList.length > 0) {
					this.deleteGoods(this.selectedList[0]);
				}
				this.selectedList = [];
				this.isAllselected = this.selectedList.length == this.goodsList.length && this.goodsList.length > 0;
				this.sum();
			},
			// 选中商品
			selected(index) {
				this.goodsList[index].selected = this.goodsList[index].selected ? false : true;
				let i = this.selectedList.indexOf(this.goodsList[index].id);
				i > -1 ? this.selectedList.splice(i, 1) : this.selectedList.push(this.goodsList[index].id);
				this.isAllselected = this.selectedList.length == this.goodsList.length;
				this.sum();
			},
			//全选
			allSelect() {
				let len = this.goodsList.length;
				let arr = [];
				for (let i = 0; i < len; i++) {
					this.goodsList[i].selected = this.isAllselected ? false : true;
					arr.push(this.goodsList[i].id);
				}
				this.selectedList = this.isAllselected ? [] : arr;
				this.isAllselected = this.isAllselected || this.goodsList.length == 0 ? false : true;
				this.sum();
			},
			// 减少数量
			sub(index) {
				if (this.goodsList[index].number <= 1) {
					return;
				}
				this.goodsList[index].number--;
				this.sum();
			},
			// 增加数量
			add(index) {
				this.goodsList[index].number++;
				this.sum();
			},
			// 合计
			sum(e, index) {
				this.sumPrice = 0;
				let len = this.goodsList.length;
				for (let i = 0; i < len; i++) {
					if (this.goodsList[i].selected) {
						if (e && i == index) {
							this.sumPrice = this.sumPrice + (e.detail.value * this.goodsList[i].number);
						} else {
							this.sumPrice = this.sumPrice + (this.goodsList[i].number * this.goodsList[i].price);
						}
					}
				}
				this.sumPrice = this.sumPrice.toFixed(2);
			},
			//丢弃
			discard() {}
		}
	}
</script>
<style lang="scss">
	@import '../../../css/cart.css';


	.carrier {
		@keyframes showMenu {
			0% {
				transform: translateX(0);
			}

			100% {
				transform: translateX(-30%);
			}
		}

		@keyframes closeMenu {
			0% {
				transform: translateX(-30%);
			}

			100% {
				transform: translateX(0);
			}
		}

		&.open {
			animation: showMenu 0.25s linear both;
		}

		&.close {
			animation: closeMenu 0.15s linear both;
		}

		background-color: #fff;

		.checkbox-box {
			padding-left: 20upx;
			flex-shrink: 0;
			height: 22vw;
			margin-right: 20upx;
		}

		position: absolute;
		width: 100%;
		padding: 0 0;
		height: 100%;
		z-index: 3;
		display: flex;
		align-items: center;

		.goods-info {
			width: 100%;
			display: flex;
			padding-right: 20upx;

			.img {
				width: 22vw;
				height: 22vw;
				border-radius: 10upx;
				overflow: hidden;
				flex-shrink: 0;
				margin-right: 10upx;

				image {
					width: 22vw;
					height: 22vw;
				}
			}

			.info {
				width: 100%;
				height: 22vw;
				overflow: hidden;
				display: flex;
				flex-wrap: wrap;
				position: relative;

				.title {
					width: 100%;
					font-size: 28upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					// text-align: justify;
					overflow: hidden;
				}

				.spec {
					font-size: 20upx;
					background-color: #f3f3f3;
					color: #a7a7a7;
					height: 30upx;
					display: flex;
					align-items: center;
					padding: 0 10upx;
					border-radius: 15upx;
					margin-bottom: 20vw;
				}

				.special-price {
					font-size: 20upx;
					background-color: #f3f3f3;
					color: #a7a7a7;
					height: 30upx;
					display: flex;
					align-items: center;
					padding: 0 10upx;
					border-radius: 15upx;
					margin-bottom: 3vw;
				}

				.price-number {
					position: absolute;
					width: 100%;
					bottom: 0upx;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					font-size: 28upx;
					height: 60upx;

					.price {}

					.number {
						display: flex;
						justify-content: center;
						align-items: flex-end;

						.input {
							width: 60upx;
							height: 60upx;
							margin: 0 10upx;
							background-color: #f3f3f3;

							input {
								width: 60upx;
								height: 60upx;
								display: flex;
								justify-content: center;
								align-items: center;
								text-align: center;
								font-size: 26upx;
							}
						}

						.sub,
						.add {
							width: 45upx;
							height: 45upx;
							background-color: #f3f3f3;
							border-radius: 5upx;

							.icon {
								font-size: 22upx;
								width: 45upx;
								height: 45upx;
								display: flex;
								justify-content: center;
								align-items: center;

							}
						}
					}
				}
			}
		}
	}
</style>
