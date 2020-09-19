<template>
	<view>
		<view class="" v-if="id==2">
			<view class="flex-y box">
				<view class="head">提现金额</view>
				<view class="int flex-x">
					<view class="yy">￥</view>
					<view class="put"><input type="text" :value="scores" /></view>
				</view>
				<view class="flex-x tummy">
					<view class="money">零钱余额￥0.00，</view>
					<view>全部提现</view>
				</view>
				<view><button type="primary" @tap="tixian">提现</button></view>
			</view>
		</view>
		<view class="category-list" v-if="id==3">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<view class="row" v-for="(category,index) in categoryList" :key="category.id" :class="[index==showCategoryIndex?'on':'']"
				 @tap="showCategory(index)">
					<view class="text">
						<view class="block"></view>
						{{category.title}}
					</view>
				</view>
			</scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view scroll-y="true" class="right">
				<view class="category" v-for="(category,index) in categoryList" :key="category.id" v-show="index==showCategoryIndex">
					<view class="list">
						<view class="box" v-for="(box,i) in category.list" :key="i" @tap="toCategory(box)">
							<view class="price">￥{{box.price}}</view>
							<view class="time">加入时间:{{box.time}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import uniBadge from '@/components/uni-badge/uni-badge.vue';
	import cfg from '../../cfg.js';
	export default {
		components: {
			uniBadge
		},
		data() {
			return {
				showCategoryIndex: 0,
				headerPosition: "fixed",
				id: 0,
				scores:0,
				//分类列表
				categoryList: [{
						id: 1,
						title: '暂未到账',
						list: [{
								price: '66.00',
								time: '19.8.1'
							},
							{
								price: '51.00',
								time: '19.8.1'
							}
						]
					},
					{
						id: 2,
						title: '已到账',
						list: [{

								price: '76.00',
								time: '19.8.1'
							},
							{
								price: '86.00',
								time: '19.8.1'
							},
							{
								price: '506.00',
								time: '19.8.1'
							},
							{

								price: '516.00',
								time: '19.8.1'
							},
							{
								price: '526.00',
								time: '19.8.1'
							},
							{
								price: '546.00',
								time: '19.8.1'
							}
						]
					},
				],
			}
		},
		onLoad(options) {
			// console.log(options.id);
			this.id = options.id;
			console.log(this.id);
		},
		onShow() {
			var openid = uni.getStorageSync('openid');
			uni.request({
				url: cfg.originUrl + '/integration/scores_one',
				data:{
					openid:openid
				},
				method:'GET',
				success: (res) => {
					alert(JSON.stringify(res));
				}
			})
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},

		methods: {
			//分类切换显示
			showCategory(index) {
				this.showCategoryIndex = index;
			},
			tixian(){
				var openid = uni.getStorageSync('openid');
				uni.request({
					url: cfg.originUrl + '/integration/scores_shop_apply',
					data:{
						openid:'os05_1SD-KV9JLBUuopDi_THWELQ',
						// openid:openid,
						scores:this.scores
					},
					method:'GET',
					success: (res) => {
						alert(JSON.stringify(res));
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;

		.left,
		.right {

			top: 100upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}

		.left {
			width: 24%;
			left: 0upx;
			background-color: #f2f2f2;

			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;

					.block {
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}

				&.on {
					height: 100upx;
					background-color: #fff;

					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;

						.block {
							width: 10upx;
							height: 80%;
							top: 10%;
							background-color: #f06c7a;
						}
					}
				}
			}
		}

		.right {
			width: 76%;
			left: 24%;

			.category {
				width: 94%;
				padding: 20upx 3%;

				.list {
					display: flex;
					flex-direction: column;

					.box {
						//border: #3c3c3c solid 1rpx;
						background-color: cornsilk;
						margin: 15upx;
						display: flex;
						flex-direction: row;
						width: 100%;
						height: 50upx;
						justify-content: space-between;
					}
				}
			}
		}
	}
	
	.flex-x{
		display: flex;
		flex-direction: row;
	}
	.flex-y{
		display: flex;
		flex-direction: column;
	}
	.box{
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
	}
	.head{
		margin-top: 30upx;
		font-size: 40upx;
		margin-bottom: 30upx;
	}
	.int{	
		border-bottom: 3upx solid #EDEDED;
	}
	.yy{
		font-size: 70upx;
		font-weight:600;
	}
	.put{
		/* height: 150upx; */
		margin-top: 50upx;
		margin-left: 30upx;
	}
	.tummy{
		margin-top: 30upx;
		margin-bottom: 30upx;
	}
	.money{
		color: #D2D3D7;
	}
</style>
