<template>
	<view>
		<view class="box1 flex-y">
			<view class="sum flex-x">
				商品金额: <view class="money">￥{{sumPrice}}</view>
			</view>
			<view class="btn" @click="openPopup">简易收款</view>
		</view>
		<uni-popup ref="popup" type="center">
			<image src="../../../static/dis/ewm.jpg" mode=""></image>
		</uni-popup>
		<view class="box2 flex-y">
			<view class="kind flex-x" v-for="(item,index) in list" :key="index">
				<view>{{ item.kind }}</view>
				<view class="imaIcon" @tap.stop="sub(box.id)">
					<image class="imageIcon" src="../../../static/image/subtract.png"></image>
				</view>
				<view>{{ item.quantity }}</view>
				<view class="imgIcon" @tap.stop="add(box.id)">
					<image class="imageIcon" src="../../../static/image/plus.png"></image>
				</view>
			</view>
			<view class="btn">分项收款</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				sumPrice: 0,
				list: [{
						id: 1,
						kind: '类别一',
						quantity: '1'
					},
					{
						id: 2,
						kind: '类别二',
						quantity: '2'
					},
					{
						id: 3,
						kind: '类别三',
						quantity: '3'
					}
				]

			}
		},
		onLoad(options) {
			console.log(options.sumPrice);
			this.sumPrice = options.sumPrice;
		},
		methods: {
			//弹出层
			openPopup() {
				this.$refs.popup.open();
			},
			closePopup() {
				this.$refs.popup.close()
			}

		}
	}
</script>

<style>
	.flex-x {
		display: flex;
		flex-direction: row;
	}

	.flex-y {
		display: flex;
		flex-direction: column;
	}

	.box1 {
		/* width: 100%;
		height: 30%; */
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
	}

	.sum {
		height: 150upx;
		margin: 0 auto;
		padding-top: 75upx;
	}

	.money {
		color: red;
	}

	.btn {
		margin-top: 20upx;
		margin-left: 400upx;
		width: 200upx;
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

	.box2 {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
	}

	.kind {
		margin-top: 10upx;
		height: 70upx;
		justify-content: space-between;
	}

	.imageIcon {
		width: 35upx;
		height: 35upx;
	}
</style>
