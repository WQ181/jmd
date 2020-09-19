<template>
	<view class="page_content">
		<view class="header">
			<view class="title1">
				<image class="avatar" :src="avatar"></image>
				<view class="title">
					<view class="name">{{nickname}}</view>
					<view class="level">等级：{{menberLevel}}</view>
				</view>
			</view>
			<view class="balance">
				余额:{{balance}}
			</view>
		</view>

		<swiper @change="swiperChange" class="swiper">
			<!-- 不是vip时 -->
			<template v-for="(vip, i) in nvips" v-if="!isVip">
				<swiper-item :key="'vip_'+i">
					<view class="swiper-item big">
						<text class="title">{{vip.title}}</text>
						<text class="sub_title">{{vip.subTitle}}</text>
						<view class="buyVip">
							<view class="vip cuIcon-vip"></view>
							<view class="buy" @tap="showBanner">升级成为vip</view>
						</view>
					</view>
				</swiper-item>
			</template>
			<!-- 是vip时 -->
			<template v-for="(vip, i) in vips" v-if="isVip">
				<swiper-item :key="'vip_'+i">
					<view class="swiper-item big">
						<text class="title">{{vip.title}}</text>
						<text class="sub_title">{{vip.subTitle}}</text>
						<view class="buyVip">
							<view class="cuIcon-vipcard vip"></view>
							<view class="buy" @tap="showBanner">续费vip</view>
						</view>
					</view>
				</swiper-item>
			</template>
		</swiper>

		<view class="title_line">
			<text class="title">充值领券</text>
			<text class="more">查看更多</text>
		</view>

		<scroll-view class="slider" scroll-x="true">
			<template v-for="(task,i) in tasks">
				<view :key="'task_'+i" class="s_item">
					<view class="content">
						<!-- <image :src="task.icon" class="img"></image> -->
						<text class="name">{{task.name}}</text>
						<text class="desc">{{task.desc}}</text>
						<text class="btn">去领取</text>
					</view>
				</view>
			</template>
		</scroll-view>

		<view class="title_line">
			<text class="title">会员福利</text>
			<text class="more">查看更多</text>
		</view>

		<view class="welfare">
			<template v-for="(info,i) in welfare">
				<view class="item" :key="'welfare_'+i">
					<view class="border">
						<image class="img" :src="info.icon"></image>
					</view>
					<text class="txt">{{info.name}}</text>
				</view>
			</template>
		</view>


		<!-- 弹出层 -->
		<view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
			<!-- 关闭按钮 -->
			<view style="justify-content:flex-end;" @tap="closeBanner">
				<view style="justify-content:flex-end; text-align:right; padding:20upx;"><text class="uni-icon uni-icon-close"></text></view>
			</view>
			<view class="choose-recharge">金额选择:</view>
			<!-- 金额选择 -->
			<view class="recharge-box">
				<view class="box" v-for="(item,index) in chargeNum" :key="index">
					<view @click="chooseNum(item)">{{item}}</view>
				</view>
			</view>
			<!-- 金额输入 -->
			<view class="ipt">
				<input type="text" placeholder="请输入价格" v-model="charge">
			</view>
			<view style="padding:50upx 0; padding-bottom:68upx;">
				<button type="warn" class="mini-btn" @tap="recharge">充值</button>
			</view>
		</view>
		<view class="uni-mask" v-if="bannerShow"></view>
		<!-- 弹出层 -->
	</view>
</template>

<script>
	import cfg from "../../../cfg.js";
	import balance from '../../../auth.js';
	import all from '../../../common/global.js'
	export default {
		data() {
			return {
				balance: 0,
				bannerShow: false,
				avatar: '../../../static/image/buzhihuo.jpg',
				nickname: 'muxiaolin',
				charge: '',
				isVip: false,
				openid: '',
				menberLevel: '****',
				retailerId: '',
				chargeNum: ['10.00', '20.00', '30.00', '40.00', '50.00', '100.00'],
				nvips: [{
					bg: 'linear-gradient(94deg,rgba(192,160,105,1),rgba(233,213,172,1))',
					shadow: '0px 3px 12px 0px rgba(195,164,110,0.23)',
					title: '您还不是本店VIP会员',
					subTitle: '充值vip能获得更多的优惠哟'
				}],
				vips: [{
					bg: 'linear-gradient(94deg,rgba(192,160,105,1),rgba(233,213,172,1))',
					shadow: '0px 3px 12px 0px rgba(195,164,110,0.23)',
					title: '您已成为本店VIP会员',
					subTitle: '购买物品享受更多优惠哟'
				}],
				tasks: [{
						icon: '../../../static/vip/icon_signin.png',
						name: '连续7天签到',
						desc: '连续签到获得7积分奖励'
					},
					{
						icon: '../../../static/vip/icon_friend.png',
						name: '邀请好友参加',
						desc: '邀请好友获得7积分奖励'
					},
					{
						icon: '../../../static/vip/icon_friend.png',
						name: '邀请好友参加',
						desc: '邀请好友获得7积分奖励'
					},
					{
						icon: '../../../static/vip/icon_friend.png',
						name: '邀请好友参加',
						desc: '邀请好友获得7积分奖励'
					}
				],
				welfare: [{
						icon: '../../../static/vip/icon_evaluate.png',
						name: '专属礼包'
					},
					{
						icon: '../../../static/vip/icon_gift.png',
						name: '生日礼包'
					},
					{
						icon: '../../../static/vip/icon_score.png',
						name: '我的积分'
					},
					{
						icon: '../../../static/vip/icon_other.png',
						name: '其他礼包'
					}
				]

			}
		},
		onLoad(options) {
			//获取openid
			var that = this;
			that.openid = uni.getStorageSync('openid');
			//获取用户信息
			var value = uni.getStorageSync('userInfo');
			that.avatar = value.headimgurl;
			that.nickname = value.nickname;
			//获取商家id
			that.retailerId = options.retailerId;
			console.log(that.retailerId);
		},
		methods: {
			swiperChange(e) {
				this.bigIdx = e.detail.current
			},
			closeBanner: function() {
				this.bannerShow = false;
			},
			showBanner: function() {
				this.bannerShow = true;
			},
			chooseNum(item) {
				console.log(item);
				this.charge = item;
				this.choose = !this.choose;
			},
			recharge() {
				var that = this;
				console.log(that.charge);
				var data = {
					// openid: "os05_1SD-KV9JLBUuopDi_THWELQ",
					openid: that.openid,
					pay_amount: that.charge * 100,
					prefix: 'ret1' + '-' + '28',
				};
				balance.balance(window.location.href, data);

				this.bannerShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../css/vip.css";

	@function realSize($args) {
		@return $args / 1.5;
	}

	.swiper {
		width: 100%;
		margin-top: -60px;

		.swiper-item {
			border-radius: 16px;
			display: flex;
			flex-direction: column;
			margin-left: 10px;
			margin-right: 10px;
		}

		.big {
			margin-top: 0;
			margin-bottom: 10upx;
			background: linear-gradient(to bottom, #C0C0C0, #F5F5F5);

			.img {
				margin-top: 10px;
				width: 40px;
				height: 40px;
			}

			.title {
				font-size: 25px;
				font-weight: 500;
				line-height: 40px;
				background-image: linear-gradient(to bottom, #000, #C0C0C0);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			.sub_title {
				font-size: 11px;
				font-weight: 300;
				line-height: 30px;
				margin-left: 30upx;
				background-image: linear-gradient(to bottom, #000, #C0C0C0);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}
	}

	.title_line {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.title {
			margin-left: 20px;
			font-size: 18px;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 41px;
		}

		.more {
			margin-right: 20px;
			font-size: 10px;
			font-weight: 300;
			color: rgba(153, 153, 153, 1);
			line-height: 41px;
		}
	}

	.slider {
		margin-left: 60upx;
		margin-right: 60upx;
		white-space: nowrap;
		width: 100%;

		.s_item {
			display: inline-block;
			width: 40%;
			margin-left: 10px;
			margin-bottom: 10px;

			.content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-radius: 8px;
				background: white;
				margin-top: 5px;
				box-shadow: 0px 2px 6px 0px rgba(103, 103, 103, 0.2);

				.img {
					width: 103px;
					height: 105px;
				}

				.name {
					margin-top: 10px;
					font-size: 12px;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 21px;
				}

				.desc {
					font-size: 10px;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 21px;
				}

				.btn {
					width: 80px;
					height: 30px;
					margin-bottom: 10px;
					background: linear-gradient(94deg, rgba(192, 160, 105, 1), rgba(233, 213, 172, 1));
					box-shadow: 0px 9px 28px 0px rgba(195, 164, 110, 0.23);
					border-radius: 29px;
					font-size: 12px;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 21px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>
