<template>
	<view>
		<form @submit="formSubmit">

			<!-- 头像，昵称 -->
			<view class="infor-list">
				<view class="infor-avatarUrl">
					<view class="avatarUrl-name">头像</view>
					<view class="image">
						<image :src="avatarUrl" class="avatarUrl-img"></image>
						<view class="cuIcon-right"></view>
					</view>
				</view>
			</view>

			<view class="cu-form-group">
				<view class="title">昵称</view>
				<input :value="nickName" placeholder="请输入昵称" />
			</view>

			<view class="cu-form-group">
				<view class="title">微信号</view>
				<input placeholder="请输入微信号" name="wechat_no"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">qq号</view>
				<input placeholder="请输入qq号" name="qq"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="请输入手机号(必填)" name="mobile"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">日期选择</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" name="date" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<!-- 提交按钮 -->
			<button class="submit-btn" type="warn" form-type="submit">确认修改</button>
		</form>
	</view>
</template>

<script>
	import cfg from '../../cfg.js';
	import all from '../../common/global.js';

	export default {
		data() {
			return {
				avatarUrl: '../../static/image/buzhihuo.jpg',
				nickName: '',
				date: '2018-12-25',
				openid: ''
			};
		},
		onLoad() {
			var that = this;
			var value = uni.getStorageSync('userInfo');
			console.log(JSON.stringify(value));
			that.avatarUrl = value.headimgurl;
			that.nickName = value.nickname;
			that.openid = uni.getStorageSync('openid');
		},
		methods: {
			// 日期选择
			DateChange(e) {
				this.date = e.detail.value
			},
			// 表单提交
			formSubmit: function(e) {
				console.log(e.detail.value);
				var newList = [];
				newList.push(e.detail.value);
				console.log(newList);
				uni.request({
					url: cfg.originUrl + '/ec/member/evpi.do',
					data: {
						openid: this.openid,
						mobile: e.detail.value.tel,
					},
					method: 'GET',
					success: (res) => {
						console.log(res);
					}
				})
				uni.setStorage({
					key: 'information',
					data: newList,
					success() {
						uni.navigateBack({})
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../css/install.css");
</style>
