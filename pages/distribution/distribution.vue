<template>
	<view>
		<view v-if="application != true">
			<view class="fenxiao">
				<image src="../../static/image/become-fenxiao.png" class="fenxiao-img"></image>
			</view>
			<!-- 欢迎信息 -->
			<view class="welcome">
				欢迎加入
				<text class="wel-name">嘉美达共享商城</text>
				，请填写申请信息
			</view>

			<!-- 个人信息填写 -->
			<view class="myInfor">
				<form @submit="formSubmit" @reset="formReset">
					<view class="name">
						<text>店铺名</text>
						<input type="text" name="myName" placeholder="请填写店铺名(必填)" />
					</view>
					<view class="tel">
						<text>手机号</text>
						<input type="number" name="tel" placeholder="请填写手机号码(必填)" />
					</view>
					<view class="reason">
						<text>申请理由</text>
						<input type="text" name="reason" placeholder="您为什么想成为分销商?(必填)" />
					</view>
					<!-- 确认按钮 -->
					<view class="confirm"><button class="confirm-btn" type="warn" form-type="submit">申请成为分销商</button></view>
				</form>
			</view>

			<!-- 介绍 -->
			<view class="control">
				<view class="list" v-for="(item, index) in controlList" :key="index">
					<image class="control-img" :src="item.image" mode=""></image>
					<view class="control-list">
						<view class="control-name">{{ item.name }}</view>
						<view class="control-infor">{{ item.infor }}</view>
					</view>
				</view>
				<view class="order">分销商的商品销售统一由厂家直接收款、直接发货，并提供产品的售后服务，分销佣金由厂家统一设置</view>
			</view>
		</view>
		<view class="application" v-if="application != false">
			<view class="apply">
				<view class="apply-tel">
					手机号：
				</view>
				<input type="text" :value="tel" placeholder="请填写申请的手机号" />
			</view>
			<button class="apply-btn" type="primary" @tap="refer">查看是否已成为分销商</button>
		</view>
	</view>
</template>

<script>
	import cfg from '../../cfg.js';
	import all from '../../common/global.js';
	export default {
		data() {
			return {
				application: false,
				tel: '',
				controlList: [{
						id: 1,
						image: '../../static/image/buzhihuo.jpg',
						name: '分销商特权',
						infor: ''
					},
					{
						id: 2,
						image: '../../static/image/buzhihuo.jpg',
						name: '独立小店',
						infor: '拥有自己的小店及推广二维码'
					},
					{
						id: 3,
						image: '../../static/image/buzhihuo.jpg',
						name: '分销商特权',
						infor: '成为分销商后卖出商品，您可以获得佣金'
					}
				],
				title: '插屏弹窗',
				bannerShow: false
			};
		},
		onShow() {
			var value = uni.getStorageSync('spreaderApp');
			this.application = value;
		},
		methods: {
			refer() {
				var reg1 = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/; //手机号
				if (!reg1.test(this.tel)) {
					uni.showToast({
						icon: 'none',
						title: '手机号填写错误',
						duration: 2000
					});
					return;
				}
				uni.request({
					url: cfg.originUrl + '/audit/spreader_qrcode',
					method: 'GET',
					data: {
						openid: 'os05_1SD-KV9JLBUuopDi_THWELQ'
					},
					success: (res) => {
						alert(JSON.stringify(res.data));
					}
				})
			},
			formSubmit: function(e) {
				console.log(JSON.stringify(e.detail.value));
				var that = this;
				var myName = e.detail.value.myName;
				var tel = e.detail.value.tel;
				// var wxcode = e.detail.value.wxcode;
				var reason = e.detail.value.reason;
				var reg1 = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/; //手机号
				if (myName == '' || reason == '') {
					uni.showToast({
						icon: 'none',
						title: '店铺名或理由未填写',
						duration: 2000
					});
					return;
				}
				if (!reg1.test(tel)) {
					uni.showToast({
						icon: 'none',
						title: '手机号填写错误',
						duration: 2000
					});
					return;
				}

				var ajaxdata = {
					name: myName,
					mobile: tel,
					reason: reason
				}

				console.log(ajaxdata);
				uni.request({
					url: cfg.originUrl + '/wx/audit/add.do',
					data: ajaxdata,
					method: 'GET',
					success: res => {
						console.log(res);
						alert(JSON.stringify(res.data.data));
						uni.setStorageSync('spreaderApp', res.data.ok);
					},
					fail: (fail) => {
						alert(fail);
					}
				})
			}
		}
	};
</script>

<style>
	@import url("../../css/distribution.css");
</style>
