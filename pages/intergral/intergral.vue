<template>
	<view>
		<view class="h">
			<view class="header">
				<mSearch @search="search($event,0)"></mSearch>
				<!-- <view>
				搜索的:{{val0}}
			</view> -->
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="content">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item, index) in swiperImg" :key="index">
					<image class="img" :src="item.image"></image>
				</swiper-item>
			</swiper>
			<view class="notice">
				<view class="word w1">公</view>
				<view class="word w2">告</view>
				<view class="uni-padding-wrap">
					<view class="uni-swiper-msg">
						<view class="uni-swiper-msg-icon redian-img">
							<image src="../../static/image/notice.png" mode="widthFix"></image>
						</view>
						<swiper vertical="true" autoplay="true" circular="true" interval="3000">
							<swiper-item v-for="(item, index) in msg" :key="index">
								<navigator class="redian-infor">{{ item }}</navigator>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<!-- 各个与积分相关模块 -->
			<view class="plate">
				<view class="category" v-for="(row, index) in categoryList" :key="index">
					<view class="mg">
						<image class="ig" :src="row.img"></image>
					</view>
					<view class="text">{{ row.name }}</view>
				</view>
			</view>
			<view class="recommand">
				<view class="head">
					<image class="ie" src="../../static/tabbar/foru.png"></image>
					<view class="foru">
						为你推荐
					</view>
				</view>
				<view class="cont">
					<view class="contl" v-for="(cont, index) in contList" :key="index">
						<view class="cmg">
							<image class="cig" :src="cont.img"></image>
						</view>
						<view class="txt">{{ cont.name }}</view>
						<view class="nub">{{cont.price}}积分</view>
					</view>
				</view>
			</view>
			<view class="all">
				<view class="head">
					<image class="ie" src="../../static/tabbar/allg.png"></image>
					<view class="foru">
						全部商品
					</view>
					<!-- 占用的推荐的数组 -->
				</view>
				<view class="cont">
					<view class="contl" v-for="(cont, index) in contList" :key="index">
						<view class="cmg">
							<image class="cig" :src="cont.img"></image>
						</view>
						<view class="txt">{{ cont.name }}</view>
						<view class="nub">{{cont.price}}积分</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import mSearch from '../../components/mehaotian-search.vue';
	export default {
		components: {
			mSearch
		},
		data() {
			return {
				val0: '',
				swiperImg: [{
					image: '../../static/image/shouye1.jpg'
				}, {
					image: '../../static/image/shouye2.jpg'
				}],
				msg: [
					'积分能够换东西了！', '买的越多，积分送越多！', '只要你手上有积分，什么东西都能换!'
				],
				categoryList: [{
						id: 1,
						name: '赚取积分',
						img: '../../static/image/point.png',

					},
					{
						id: 2,
						name: '俱乐部',
						img: '../../static/image/club.png'
					},
					{
						id: 3,
						name: '会员',
						img: '../../static/image/vip.png'
					},
					{
						id: 4,
						name: '积分游戏',
						img: '../../static/image/game.png'
					},
					{
						id: 5,
						name: '热兑排行',
						img: '../../static/image/rank.png'
					},
					{
						id: 6,
						name: '物品兑换',
						img: '../../static/image/change.png'
					},
					{
						id: 7,
						name: '积分充值',
						img: '../../static/image/add.png'
					},
					{
						id: 8,
						name: '兑换记录',
						img: '../../static/image/record.png'
					},
				],
				contList: [{
						id: 1,
						name: '好东西',
						img: '../../static/goods/p1.jpg',
						price: '1234'
					},
					{
						id: 2,
						name: '好东西',
						img: '../../static/goods/p2.jpg',
						price: '1234'
					},
					{
						id: 3,
						name: '好东西',
						img: '../../static/goods/p3.jpg',
						price: '1234'
					},
					{
						id: 4,
						name: '好东西',
						img: '../../static/goods/p4.jpg',
						price: '1234'
					},
					{
						id: 5,
						name: '好东西',
						img: '../../static/goods/p5.jpg',
						price: '1234'
					},
				
				],
			}
		},
		methods: {
			search(e, val) {
				console.log(e, val);
				this['val' + val] = e;
			}
		}
	}
</script>

<style>
	/* @import url("../../css/intergral.css"); */
	/* 搜索框 */
	.h {
		/* margin-top: 5upx; */
		height: 80upx;
		width: 100%;
	}

	.header {
		position: fixed;
		text-align: center;
		height: 80upx;
		width: 100%;
		z-index: 1;
	}

	/* 轮播图 */
	.img {
		width: 100%;
		height: 300rpx;
	}

	/* 公告栏 */
	.notice {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.uni-padding-wrap {
		width: 100%;

	}

	.word {
		position: absolute;
		padding-right: 15rpx;
		font-size: 35rpx;
		font-family: tahoma;
		font-weight: bolder;
	}

	.w1 {
		left: 15rpx;
		color: red;
		padding: 1rpx;
	}

	.w2 {
		left: 50rpx;
		border-right: 1upx solid skyblue;
	}

	.redian-img {
		position: absolute;
		left: 110rpx;
		width: 50rpx;
		height: 60rpx;
	}

	.redian-infor {
		width: 580rpx;
		position: absolute;
		left: 140rpx;
		font-size: 24upx;
		color: red;
	}

	/* 积分模块 */
	.plate {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		/* justify-content: space-between; */
		flex-wrap: wrap;
	}

	.category {
		width: 25%;
		margin-top: 10upx;
		display: flex;
		flex-wrap: wrap;

	}

	.mg {
		width: 100%;
		display: flex;
		justify-content: center;

	}

	.ig {
		width: 10vw;
		height: 10vw;
		border-radius: 50rpx;
	}

	.text {
		margin-top: 10upx;
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 20upx;
		color: #3c3c3c;
	}

	/* 推荐和商品 */
	.head {
		display: flex;
		flex-direction: row;
	}

	.ie {
		width: 110rpx;
		height: 80rpx;
	}

	.foru {
		margin-top: 9rpx;
		width: 300rpx;
		font-size: 40rpx;
		color: #E65339;
	}

	.cont {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 50upx 0;
		border-bottom: solid 4upx #f6f6f6;
		display: flex;
		/* justify-content: space-between; */
		flex-wrap: wrap;
	}

	.nub {
		margin: 0 auto;
		color: #EC008C;
	}

	.contl {
		width: 33%;
		margin-top: 10upx;
		display: flex;
		flex-wrap: wrap;


	}

	.cmg {
		width: 100%;
		display: flex;
		justify-content: center;

	}

	.cig {
		width: 28vw;
		height: 30vw;
		/* border-radius: 50rpx; */
	}

	.txt {
		margin-top: 20upx;
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 30upx;
		color: #3c3c3c;
	}
</style>
