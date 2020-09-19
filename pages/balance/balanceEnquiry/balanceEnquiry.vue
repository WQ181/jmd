<template>
	<view>
		<view class="recharge-balance">
			<view class="balance">
				<view class="word">当前平台余额:￥</view>
				<view class="balance-word">{{platform_balance}}</view>
			</view>
			<view class="recharge">
				<view class="word">选择平台金额:￥</view>
				<input class="recharge-word" type="text" v-model="platform_charge" />
			</view>
		</view>
		<view class="recharge-balance">
			<view class="balance">
				<view class="word">当前商家会员余额:￥</view>
				<view class="balance-word">{{retailer_balance}}</view>
			</view>
			<view class="recharge">
				<view class="word">选择商家会员金额:￥</view>
				<input class="recharge-word" type="text" v-model="retailer_charge" />
			</view>
		</view>
		<view class="recharge-btn">
			<view class="btn-word-recharge" @click="choose">确认选择</view>
		</view>
	</view>
</template>

<script>
	import balance from '../../../auth.js';
	import all from '../../../common/global.js';
	export default {
		data() {
			return {
				showRecharge: false,
				retailer_balance: 0,
				platform_balance: 0,
				retailer_charge: 0,
				platform_charge: 0,
				recharge: ''
			}
		},
		onLoad() {

		},
		methods: {
			choose() {
				console.log(this.retailer_charge);
				console.log(this.platform_charge);
				var data = {
					retailer_balance:this.retailer_charge,
					platform_balance:this.retailer_charge
				}
				uni.setStorageSync('all_balance',data);
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style>
	@import "../../../css/banlance.css";
</style>
