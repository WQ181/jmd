<template>
	<view>
		<view class="recharge-balance">
			<view class="balance">
				当前余额：<view class="balance-word">￥{{balance}}</view>
			</view>
			<view class="recharge">
				充值金额：￥<input class="recharge-word" type="text" v-model="recharge" />
			</view>
		</view>
		<view class="recharge-btn">
			<view class="btn-word-recharge" @click="payment">确认支付</view>
		</view>
	</view>
</template>

<script>
	import balance from '../../auth.js';
	import all from '../../common/global.js';
	export default {
		data() {
			return {
				showRecharge: false,
				balance: 0.00,
				recharge: ''
			}
		},
		onLoad(options) {
			var balance = options.balance;
			console.log(balance);
			this.balance = balance;
		},
		methods: {
			payment() {
				var that = this;
				console.log(that.recharge);
				var openid = uni.getStorageSync('openid');
				var data = {
					openid: "os05_1SD-KV9JLBUuopDi_THWELQ",
					// openid:openid,
					pay_amount: that.recharge * 100,
					// prefix: 'mem1',
					prefix:'ret1' + '-28'
				};
				balance.balance(window.location.href, data);
			}
		}
	}
</script>

<style>
	@import "../../css/banlance.css";
</style>
