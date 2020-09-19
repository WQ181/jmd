<template>
	<view>
		<uni-popup ref="popup" type="center">
			<image class="ewm" src="../../static/dis/ewm.jpg"></image>
		</uni-popup>
		<view class="head flex-y">
			<view class="head1 flex-x">
				<view class="head2 flex-x">
					<view>
						<image class="viaImg" :src="avatar"></image>
					</view>
					<view class="name">
						<view class="name-title">{{nickname}}</view>
						<view class="name-inviter">邀请码:292027</view>
					</view>
				</view>
				<view class="right">
					<view class="cuIcon-qrcode" @tap="openPopup"></view>
					<view class="cuIcon-shop" @tap="retailerCommodity"></view>
					<view class="cuIcon-share"></view>
				</view>
			</view>
			<view class="upgrade flex-x">
				<view class="vip flex-x">
					<view>
						<image class="vipImg" src="../../static/dis/vip2.png"></image>
					</view>
					<view class="text">还差49成长值升级为V2店主</view>
				</view>
				<view>
					<view class="frame">
						去升级
					</view>
				</view>
			</view>
		</view>
		<view class="body flex-y">
			<view class="neck flex-y">
				<view class="neck1 flex-x">
					<view class="money flex-y">
						<view class="money1">
							0
						</view>
						<view class="money2">
							本月销售(元)
						</view>
					</view>
					<view>
						<view class="award">
							实际金额还差800元成为金牌商家
						</view>
					</view>
				</view>
				<view class="neck2 flex-x center">
					<view class="box flex-y">
						<view class="rmb">88.00</view>
						<view>累积收益(元)</view>
					</view>
					<view class="box flex-y">
						<view class="rmb">0.00</view>
						<view>本月收益(元)</view>
					</view>
				</view>
			</view>
			<view class="chest">
				<view class="neck2 flex-x center">
					<view class="box1 flex-y" @click="openPopup">
						<view class="rmb">
							<image class="img" src="../../static/dis/ma.png"></image>
						</view>
						<view>简易收款</view>
					</view>
					<view class="box1 flex-y">
						<view class="rmb">
							<image class="img" src="../../static/dis/wallet.png"></image>
						</view>
						<view>分项收款</view>
					</view>
					<view class="box1 flex-y" @click="order">
						<view class="rmb">
							<image class="img" src="../../static/dis/form.png"></image>
						</view>
						<view>订单信息</view>
					</view>
				</view>
			</view>
			<view class="tummy">

			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				avatar: '../../static/image/buzhihuo.jpg',
				nickname: '游客',
			};
		},
		created() {
			var that = this;
			var value = uni.getStorageSync('userInfo');
			that.avatar = value.headimgurl;
			that.nickname = value.nickname;
		},
		methods: {
			order() {
				uni.navigateTo({
					url: 'detail/ordermanage'
				})
			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			retailerCommodity() {
				uni.navigateTo({
					url: '../retailerCommodity/retailerCommodity'
				})
			}
		}
	};
</script>

<style src="../../../css/retailer.css">

</style>
