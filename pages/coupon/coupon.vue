<template>
	<view>
		<view class="coupon-list" v-if="list.length == 0">
			暂无优惠券可领取
		</view>
		<view class="coupon-list" v-if="list.length >= 1">
			<view class="item stamp stamp01 " v-for="(item,index) in list" :key="index">
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
						<view class="t2 t">时间:{{item.opTime}}</view>
						<view class="t5 t">retailerId:{{item.retailerId}}</view>
						<view class="t3 t " @click="getCoupns(index)">立即领取 </view>
						<view class="t4 t">数量:{{item.amount}}</view>
						<view class="t6 t">剩余:{{item.remaining}}</view>
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
				list: [
						{
						retailerId: 1,
						couponType: '未使用',
						memo: '无门槛金额',
						name: 'KTV优惠券',
						consume: '消费任意金额',
						amount: 10,
						remaining: 10,
						opTime: '永久有效'
					},
				]
			}
		},
		onShow() {
// 			console.log(this.list.length);
// 
// 			var value = uni.getStorageSync('get-coupon');
// 			console.log(JSON.stringify(value));
// 			alert(JSON.stringify(value));
// 			this.list.push(value.coupon);
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: 'mycoupon'
			})
		},
		methods: {
			getCoupns(index) {
				// alert("领取中");
				var that = this;
				console.log(that.list[index]);
				alert(JSON.stringify(that.list[index]))
				var item = that.list[index];
				console.log(index);

				var list = [];
				list.push(item)
				//获取优惠券信息
				var coupon = uni.getStorageSync('coupon');
				console.log(coupon);

				if (coupon == '') {
					uni.setStorageSync('coupon', list);
				} else {
					console.log('1');
					coupon.push(item);
					that.list.splice(index, 1);
					uni.setStorageSync('coupon', coupon);
					uni.showToast({
						title: '领取成功',
						icon: 'none'
					});
				}
				alert('dcmsl');

				uni.navigateTo({
					url: 'mycoupon'
				})
			}
		}
	}
</script>

<style src="../../css/coupon.css">

</style>
