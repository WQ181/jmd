<template>
	<view>
		<!-- 商品详情 文强-->
		<view>
			<image :src="List.image" class="warseImg"></image>
			<view class="wares">
				<view class="waresName"> {{List.name}}</view>
				<view class="share">
					<view class="cuIcon-share">
						<view>分享</view>
					</view>
				</view>
			</view>
			<view class="price" style="margin-left: 20upx;">￥{{ List.price }}</view>
			<view class="wares">
				<view style="margin-left: 20upx;" v-if="List.is_package">快递:包邮</view>
				<view style="margin-left: 20upx;" v-if="!List.is_package">快递:{{List.delivery_fee}}</view>
				<view style="margin-right: 20upx;">销量：{{ List.onsale_status }}件</view>
			</view>
			<view class="vip" style="margin-left: 20upx;">
				会员<view class="level">普通等级</view>可享受<view class="price">￥{{ List.special_price }}</view>的价格
			</view>
			<view class="background"></view>
			<view class="quantity">
				<view class="number">已选择数量:{{quantity}}</view>
				<view class="cuIcon-right" style="margin-right: 20upx;"></view>
			</view>
			<view class="background"></view>
			<view class="shopping">
				<view class="imgs">
					<view class="btn-img" @click="keep">
						<view class="cuIcon-attention"></view>
						<view>{{isKeep?'已':''}}关注</view>
					</view>
					<view class="btn-img" @click="toCart">
						<view class="cuIcon-cart"></view>
						<view>购物车</view>
					</view>
				</view>
				<view class="buycar">
					<view class="buycar1" @tap="joinCart">加入购物车</view>
					<view class="buycar2" @tap="buy">立即兑换</view>
				</view>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="title">选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in List.specification" :class="[index==selectSpec?'on':'']" @tap="setSelectSpec(index)"
						 :key="index">{{item}}</view>
					</view>
					<view class="length" v-if="selectSpec!=null">
						<view class="text">数量</view>
						<view class="number">
							<view class="sub" @tap.stop="sub">
								<view class="cuIcon-back"></view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="quantity" />
							</view>
							<view class="add" @tap.stop="add(List.limitation)">
								<view class="cuIcon-right"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="btn">
					<view class="button" @tap="hideSpec">完成</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quantity: 1,
				List: [],
				specClass: '', //规格弹窗css类，控制开关动画
				selectSpec: null, //选中规格
				isKeep: false, //收藏
			}
		},
		onLoad() {
			var that = this;
			//获取传递过来的参数
			uni.getStorage({
				key: 'intergral',
				success: (e) => {
					console.log(e.data);
					that.List = e.data;
				}
			})
		},
		onUnload() {
			try {
				uni.removeStorageSync('cart-buy');
				console.log('success');
			} catch (e) {
				//TODO handle the exception
				console.log(e);
			}
		},
		methods: {
			toCart() {
				uni.navigateTo({
					url: '../index/detail/cart'
				})
			},
			//收藏
			keep() {
				this.isKeep = this.isKeep ? false : true;
			},
			// 加入购物车
			joinCart() {
				if (this.selectSpec == null) {
					// return this.showSpec(() => {
					// 	this.joincart();
					// });
					this.showSpec();

					var that = this;
					console.log(that.List);
					var tempList = [];
					let goods = {
						retailer_id:1,
						commodity_id: that.List.id,
						image: that.List.image,
						name: that.List.name,
						price: that.List.price,
						number: that.quantity,
						selected:false
					};
					tempList.push(goods);
					console.log(tempList);
					//获取购物车信息
					var list = uni.getStorageSync('cart');
					console.log(list);
					
					if (list == '') {
						uni.setStorageSync('cart', tempList)
					} else {
						if (goods.retailer_id == list[0].retailer_id) {
							console.log('1');
							list.push(goods);
							uni.setStorageSync('cart', list);
						} else {
							console.log('2');
							uni.showToast({
								title: '只能存放一个商家的东西哦'
							})
							uni.setStorageSync('cart', tempList);
						}
					}
					uni.showToast({
						title: "已加入购物车"
					});
					console.log(uni.getStorageSync('cart'));
				}
			},
			//立即购买
			buy() {
				if (this.selectSpec == null) {
					var that = this;
					let list = [];
					let goods = {
						retailer_id:1,
						commodity_id: that.List.id,
						image: that.List.image,
						name: that.List.name,
						price: that.List.price,
						number: that.quantity,
					};
					list.push(goods);
					console.log(list);
					uni.setStorageSync('cart-buy', list);
					uni.navigateTo({
						url: '../comformation/comformation?type=' + 5
					})
				}
			},
			//选择规格
			setSelectSpec(index) {
				this.selectSpec = index;
			},
			//减少数量
			sub() {
				if (this.quantity <= 1) {
					return;
				}
				this.quantity--;
			},
			//增加数量
			add(limitation) {
				console.log(limitation);
				// this.quantity++;
				if (this.quantity >= limitation) {
					uni.showToast({
						title: '最多' + limitation + '件',
						icon: 'none'
					})
					return
				} else {
					this.quantity++
				}
			},
			//规格弹窗
			showSpec(fun) {
				console.log('show');
				this.specClass = 'show';
				this.specCallback = fun;
			},
			specCallback() {
				return;
			},
			//关闭规格弹窗
			hideSpec() {
				this.specClass = 'hide';
				//回调

				this.selectSpec && this.specCallback && this.specCallback();
				this.specCallback = false;
				setTimeout(() => {
					this.specClass = 'none';
				}, 200);
			},
			discard() {
				//丢弃
			}
		}
	}
</script>

<style lang="scss">
	@import '../../css/productDetails.css';

	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}

		100% {
			transform: translateY(0);
		}
	}

	.row {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;

		.text {
			font-size: 24upx;
			color: #a2a2a2;
			margin-right: 20upx;
		}

		.content {
			font-size: 28upx;
			display: flex;
			flex-wrap: wrap;

			.serviceitem {
				margin-right: 10upx;
			}

			.sp {
				width: 100%;
				display: flex;

				view {
					background-color: #f6f6f6;
					padding: 5upx 10upx;
					color: #999;
					margin-right: 10upx;
					font-size: 20upx;
					border-radius: 5upx;

					&.on {
						border: solid 1upx #f47952;
						padding: 4upx 8upx;
					}
				}
			}
		}

		.arrow {
			position: absolute;
			right: 4%;

			.icon {
				color: #ccc;
			}
		}
	}


	//弹出层内的样式
	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 100%;
			padding: 0 4%;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;

			.content {
				width: 100%;
				padding: 20upx 0;
			}

			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		&.service {
			.row {
				margin: 30upx 0;

				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}

				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}

		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}

			.sp {
				display: flex;

				view {
					font-size: 28upx;
					padding: 5upx 20upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;

					&.on {
						padding: 3upx 18upx;
						border: solid 1upx #f47925;
					}
				}
			}

			.length {
				margin-top: 30upx;
				border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;

				.text {
					font-size: 30upx;
				}

				.number {
					display: flex;
					justify-content: center;
					align-items: center;

					.input {
						width: 80upx;
						height: 60upx;
						margin: 0 10upx;
						background-color: #f3f3f3;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;

						input {
							width: 80upx;
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
						width: 60upx;
						height: 60upx;
						background-color: #f3f3f3;
						border-radius: 5upx;

						.icon {
							font-size: 30upx;
							width: 60upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;

						}
					}
				}
			}
		}
	}
</style>
