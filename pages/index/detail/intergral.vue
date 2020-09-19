<template>
	<view>
		<!-- 搜索 -->
		<view class="box">
			<view class="cu-bar bg-cyan search">
				<!-- 搜索 -->
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="输入关键字" v-model="keyword" @focus="focus"></input>
					<view class="cuIcon-close" @click="close"></view>
				</view>
				<view class="action" @click="search" v-if="hidden">
					<text>搜索</text>
				</view>
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
							<view class="cuIcon-notificationfill" style="font-size: 40upx; margin-top: -10upx;"></view>
						</view>
						<swiper vertical="true" autoplay="true" circular="true" interval="3000">
							<swiper-item v-for="(item, index) in msg" :key="index">
								<navigator class="redian-infor">{{ item }}</navigator>
							</swiper-item>
						</swiper>
					</view>
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
					<view class="contl" v-for="(cont, index) in contList" :key="index" @tap="toGoods(cont)">
						<view class="cmg">
							<image class="cig" :src="cont.image"></image>
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
					<view class="contl" v-for="(cont, index) in contList" :key="index" @tap="toGoods(cont)">
						<view class="cmg">
							<image class="cig" :src="cont.image"></image>
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
	import mSearch from '../../../components/mehaotian-search.vue';
	export default {
		components: {
			mSearch
		},
		data() {
			return {
				hidden: false,
				keyword: '',
				val0: '',
				swiperImg: [{
					image: '../../static/image/shouye1.jpg'
				}, {
					image: '../../static/image/shouye2.jpg'
				}],
				msg: ['积分能够换东西了！', '买的越多，积分送越多！', '只要你手上有积分，什么东西都能换!'],
				contList: [{
						commodity_id: 1,
						name: '好东西',
						image: '../../static/goods/p1.jpg',
						price: '1'
					},
					{
						commodity_id: 2,
						name: '好东西',
						image: '../../static/goods/p2.jpg',
						price: '1'
					},
					{
						commodity_id: 3,
						name: '好东西',
						image: '../../static/goods/p3.jpg',
						price: '1'
					},
					{
						commodity_id: 4,
						name: '好东西',
						image: '../../static/goods/p4.jpg',
						price: '1'
					},
					{
						commodity_id: 5,
						name: '好东西',
						image: '../../static/goods/p5.jpg',
						price: '1'
					},
				],
			}
		},
		methods: {
			// 聚焦于
			focus() {
				this.hidden = !this.hidden;
			},
			// 查找
			search(e) {
				var temp = [];
				var keyword = this.keyword;
				console.log(keyword);
				for (var i = 0; i < this.list.length; i++) {
					if (this.list[i].name.match(keyword)) {
						console.log(this.list[i].name);
						temp.push(this.list[i]);
					}
				}
				this.list = temp;
				if (temp.length <= 0) {
					uni.showToast({
						icon: 'loading',
						title: '暂无此商家'
					})
				}
			},
			close() {
				this.keyword = '';
				uni.showToast({
					icon: 'loading',
				})
				// this.getList();
				this.hidden = !this.hidden;
			},
			//商品跳转
			toGoods(e) {
				uni.showToast({
					title: '商品' + e.id,
					icon: 'none'
				});
				console.log(e);
				uni.setStorageSync('intergral', e);
				uni.navigateTo({
					url: '../intergralDetail/intergralDetail'
				});
			},
		}
	}
</script>

<style>
	@import url("../../../css/intergral.css");
</style>
