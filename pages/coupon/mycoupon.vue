<template>
	<view>

		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in couponType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="coupon-list">

			<view class="toGetCoupons cuIcon-github" @tap="toCouponStore">
				赶紧去领取中心查看更多优惠券~~~
			</view>

			<view class="none-coupons" v-if="list.length==0">
				<view class="cuIcon-warn"></view>
				<view class="none-coupons-word">您还没有优惠券~~</view>
			</view>

			<view class="item stamp stamp01 " v-else v-for="(item,index) in list" :key="index" @tap="select(item)">
				<!-- 左侧 -->
				<view class="float-li t1">
					<view class="coupon-left">
						<view class="t t1">{{item.memo}}</view>
					</view>
				</view>
				<!-- 右侧 -->
				<view class="float-rig">
					<view class="coupon-rig">
						<view class="t1 t">{{item.name}}</view>
						<view class="t2 t">{{item.opTime}}</view>
						<view class="t3 t ">立即使用 </view>
						<view class="t4 t">retailerId:{{item.retailerId}}</view>
					</view>
				</view>
				<i>{{item.from}}</i>

			</view>
		</view>
	</view>
</template>
<script>
	import all from '../../common/global.js';
	export default {
		data() {
			return {
				headerPosition: "fixed",
				headerTop: "0px",
				couponType: ['未使用', '已使用'],
				// 订单列表 演示数据
				orderList: [
					[],
					[],
				],
				list: [],
				tabbarIndex: 0
			};
		},
		onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			this.list = this.orderList[0];
			this.tabbarIndex = 0;
			//兼容H5下排序栏位置
			// #ifdef H5
			let Timer = setInterval(() => {
				let uniHead = document.getElementsByTagName('uni-page-head');
				if (uniHead.length > 0) {
					this.headerTop = uniHead[0].offsetHeight + 'px';
					clearInterval(Timer); //清除定时器
				}
			}, 1);
			// #endif
		},
		onShow() {
			var that = this;
			var orderId = uni.getStorageSync('orderId');
			var openid = uni.getStorageSync('openid');
			if (orderId != '') {
				//获取优惠券
				var ajaxdata = {
					openid: openid,
					orderId: orderId
				};
				ajaxdata = JSON.stringify(ajaxdata);
				console.log(ajaxdata);
				uni.request({
					url: cfg.originUrl + '/coupon/member.do',
					method: 'POST',
					header: {
						'Content-type': "application/x-www-form-urlencoded",
					},
					data: ajaxdata,
					success: (res) => {
						console.log(res.data.data);
						alert(JSON.stringify(res.data.data));
						// uni.setStorageSync('coupon', res.data.data.coupon);
						this.orderList[0].push(res.data.data.coupon);
					}
				})
			}

			var value = uni.getStorageSync('coupon');
			console.log(value);
			if (value == '') {
				console.log("iii");
				return;
			} else {
				//没有找到一样的商品，新增一行到购物车商品列表头部
				for (var i = 0; i < value.length; i++) {
					this.orderList[0].unshift(value[i]);
				}
			}
		},
		// 关闭购物车前 存入缓存
		beforeDestroy: function() {
			// 购物车数据更新缓存
			uni.setStorageSync('coupon', this.orderList[0]);
		},
		onHide() {
			uni.removeStorageSync('coupon');
		},
		onPageScroll(e) {
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
		},
		methods: {
			showType(tbIndex) {
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			toCouponStore() {
				uni.navigateTo({
					url: 'coupon'
				})
			},
			select(item) {
				//是否需要返回地址(从订单确认页跳过来选收货地址)
				uni.setStorage({
					key: 'selectCoupon',
					data: item,
					success() {
						uni.navigateBack();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../css/myCoupons.css';

	// 按钮样式
	.btns {
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		view {
			min-width: 120upx;
			height: 50upx;
			padding: 0 20upx;
			border-radius: 50upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-left: 20upx;
		}
	}
</style>
