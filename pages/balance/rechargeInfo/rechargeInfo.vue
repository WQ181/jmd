<template>
	<view>
		<view class="record flex-x border" v-for="(item,index) in List" :key="index">
			<view class="flex-y dateAndrecord">
				<view class="recharge">
					<view class="yes">充值</view>
				</view>
				<view class="date">
					<view class="yes">{{ item.date }}</view>
				</view>
			</view>
			<view class="money">
				<view class="yes2">+{{ item.money }}元</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				List: [{
						date: '2019.07.16',
						money: '100'
					},
					{
						date: '2019.07.17',
						money: '50'

					},
					{
						date: '2019.07.18',
						money: '65'
					}
				]

			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background-color: #F3F3F3;
	}

	.flex-x {
		display: flex;
		flex-direction: row;
	}

	.flex-y {
		display: flex;
		flex-direction: column;
	}

	.record {
		width: 94%;
		height: 100upx;
		margin: 20upx;
		background-color: white;
	}

	.border {
		border-top: 1upx solid #F3F3F3;
	}

	.dateAndrecord {
		height: 100%;
		width: 65%;
	}

	.money {
		height: 100%;
		width: 35%;
	}

	.recharge {
		width: 100%;
		height: 50%;
	}

	.date {
		width: 100%;
		height: 50%;
	}

	.yes {
		line-height: 50upx;
		margin-left: 20upx;
	}

	.yes2 {
		line-height: 100upx;
		font-size: 50upx;
	}
</style>
