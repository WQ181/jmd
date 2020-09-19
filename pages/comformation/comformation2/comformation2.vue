<template>
	<view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="leibie" v-for="(item,index) in buylist" :key="index">
				<view class="row">
					<view class="goods-info">
						<view class="img">
							<image :src="'../../../static/ListPng/'+item.img"></image>
						</view>
						<view class="info">
							<view class="title">{{item.name}}</view>
							<view class="spec">数量:{{item.number}}</view>
							<view class="price-number">
								<view class="price">￥{{item.price/100*item.number}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice/100|toFixed}}</view>
				</view>
				<view class="btn" @tap="buy">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import test from '../../../auth.js';
	export default {
		data() {
			return {
				member_id: 1,
				type: 3,
				buylist: [], //订单列表
				goodsPrice: 0.0, //商品合计价格
				sumPrice: 0.0, //用户付款价格
			};
		},
		onLoad() {
			//页面显示时，加载订单信息
			uni.getStorage({
				key: 'commodity-buy',
				success: (ret) => {
					console.log(ret.data);
					this.buylist = ret.data;
					var buylist = this.buylist;
					this.goodsPrice = 0;
					//合计
					let len = buylist.length;
					for (let i = 0; i < len; i++) {
						this.goodsPrice += buylist[i].number * buylist[i].price;
					}
					this.deduction = this.int / 100;
					this.sumPrice = this.goodsPrice;
				}
			});
		},
		onBackPress() {
			//页面后退时候，清除订单信息
			this.clearOrder();
		},
		filters: {
			toFixed: function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			buy() {
				var openid = uni.getStorageSync('openid');
				console.log(this.buylist);
				var data = {
					type: 4,
					openid: "os05_1SD-KV9JLBUuopDi_THWELQ",
					// openid: openid,
					commodity_msg: this.buylist,
				}
				console.log(data);
				test.test(window.location.href, data);

				uni.navigateTo({
					url: '../../index/detail/settlePlatform?sumPrice=' + this.sumPrice,
				});
			},
			clearOrder() {
				uni.removeStorage({
					key: 'commodity-buy',
					success: (res) => {
						this.buylist = [];
						console.log('remove buylist success');
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.addr {
		width: 86%;
		padding: 20upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		display: flex;

		.cuIcon-location {
			display: flex;
			align-items: center;
			margin-top: 15upx;
			font-size: 50upx;
		}

		.tel-name {
			width: 100%;
			display: flex;
			font-size: 32upx;

			.tel {
				margin-left: 40upx;
			}
		}

		.addres {
			width: 100%;
			font-size: 26upx;
			color: #999;
		}
	}

	.buy-list {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 30upx 0;

			.goods-info {
				width: 100%;
				display: flex;

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
						font-size: 22upx;
						background-color: #f3f3f3;
						color: #a7a7a7;
						height: 40upx;
						display: flex;
						align-items: center;
						padding: 0 10upx;
						border-radius: 20upx;
						margin-bottom: 20vw;
					}

					.price-number {
						position: absolute;
						width: 100%;
						bottom: 0upx;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						font-size: 28upx;
						height: 40upx;

						.price {
							color: #f06c7a;
						}

						.number {
							display: flex;
							justify-content: center;
							align-items: center;

						}
					}
				}
			}
		}
	}

	.order {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 20upx 0;
			height: 40upx;
			display: flex;

			.left {
				font-size: 28upx;
			}

			.right {
				margin-left: 40upx;
				font-size: 26upx;
				color: #999;

				input {
					font-size: 26upx;
					color: #999;
				}
			}
		}
	}

	.blck {
		width: 100%;
		height: 100upx;
	}

	.footer {
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.settlement {
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;

				.money {
					font-weight: 600;
				}
			}

			.btn {
				padding: 0 30upx;
				height: 60upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}
	}

	.detail {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			height: 60upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.nominal {
				font-size: 28upx;
			}

			.content {
				font-size: 26upx;
				color: #f06c7a;
			}
		}
	}
</style>
