<template>
	<view>
		<view class="shopUnit">
			<image src="../../static/image/shanghuruzhu.png" class="shopUnit-img"></image>
		</view>
		<!-- 商户简介 -->
		<view class="shop">
			<view class="shop-name">
				<view class="name">商户名称 *</view>
				<input type="text" class="name-input" v-model="storeName" placeholder="商户名称" />
			</view>
			<view class="shop-name">
				<view class="name">主营项目 *</view>
				<input type="text" class="name-input" v-model="project" placeholder="例如鞋帽,化妆品等" />
			</view>
			<view class="shop-name">
				<view class="name">地址 *</view>
				<input type="text" class="name-input" :value="location" placeholder="请输入地址" @click="chooseLocation" />
			</view>
			<view class="shop-info">
				<view class="name">简单介绍</view>
				<input type="text" class="name-input3" v-model="infor" placeholder="简单介绍下商户" />
			</view>

		</view>

		<!-- 联系方式 -->
		<view class="contact-way">
			<view class="contact-list">
				<view class="contact">
					<view class="name">联系人 *</view>
					<input type="text" class="name-input" v-model="linkman" placeholder="您的称呼" />
				</view>
				<view class="contact">
					<view class="name">手机号 *</view>
					<input type="text" class="name-input" v-model="phone" placeholder="您的手机号" />
				</view>
				<view class="infor">请仔细填写联系方式，保证我们能尽快联系到您~</view>
			</view>
		</view>

		<!-- 账号密码 -->
		<view class="contact-way">
			<view class="contact-list">
				<view class="contact">
					<view class="name">账号 *</view>
					<input type="text" class="name-input" v-model="email" placeholder="使用qq邮箱注册" />
				</view>
				<view class="contact">
					<view class="name">密码 *</view>
					<input type="text" class="name-input" v-model="password" placeholder="密码" />
				</view>
				<view class="contact">
					<view class="name">密码 *</view>
					<input type="text" class="name-input" v-model="password1" placeholder="确认密码" />
				</view>
				<view class="infor">用于登陆多商户后台，请认真填写</view>
			</view>
		</view>

		<!-- 阅读确认 -->
		<view class="read">
			<checkbox-group @change="checkboxChange">
				<label class="checkbox">
					<checkbox value="同意" />
					我已经阅读并了解了
					<view class="agreement" @click="showBanner">【分销商申请协议】。</view>
				</label>
			</checkbox-group>
		</view>

		<!-- 确认按钮 -->
		<view class="apply"><button type="primary" class="apply-btn" @click="submit">立即申请入驻</button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeName: '', //商户名称
				project: '', //主营项目
				infor: '', //信息
				location: '', //位置
				linkman: '', //联系人
				phone: '', //手机号
				email: '', //邮箱/账号
				password: '', //密码
				password1: '', //重复输入密码
				value: '', //是否同意协议
				latitude: '', //经度
				longtitude: '' //纬度
			};
		},
		// 监听页面返回
		onBackPress() {
			if (this.bannerShow) {
				this.bannerShow = false;
				return true;
			}
		},
		methods: {
			checkboxChange: function(e) {
				this.value = e.detail.value;
				console.log(this.value);
			},
			chooseLocation() {
				var that = this;
				uni.chooseLocation({
					success: function(res) {
						that.latitude = res.latitude;
						that.longtitude = res.longitude;
						that.location = res.address;
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
			closeBanner: function() {
				this.bannerShow = false;
			},
			showBanner: function() {
				this.bannerShow = true;
			},
			submit: function(e) {
				var that = this;
				console.log(that.value);
				var reg1 = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
				var reg2 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if (that.storeName == '' || that.project == '' || that.linkman == '' || that.password == '' || that.password1 ==
					'' || that.value == '') {
					uni.showToast({
						icon: 'loading',
						title: '信息填写错误',
						duration: 1000
					});
					return;
				} else if (!reg1.test(that.phone)) {
					uni.showToast({
						icon: 'loading',
						title: '手机号填写错误',
						duration: 1000
					});
					return;
				} else if (!reg2.test(that.email)) {
					uni.showToast({
						icon: 'loading',
						title: '邮箱填写错误',
						duration: 1000
					});
					return;
				} else if (that.password != that.password1) {
					uni.showToast({
						icon: 'loading',
						title: '密码不一致',
						duration: 1000
					});
					return;
				}

				var ajaxdata = {
					storeName: that.storeName,
					project: that.project,
					linkman: that.linkman,
					phone: that.phone,
					email: that.email,
					password: that.password,
					latitude: that.latitude, //纬度
					longtitude: that.longtitude //经度
				}
				
				console.log(ajaxdata);
				uni.request({
					url: 'https://tb.ngrok.xiaomiqiu.cn/b/retailer/wx/setin',
					data: ajaxdata,
					method: 'POST',
					success: res => {
						console.log(res);
						var jsondata = res.data;
						
						let keys = [];
						for (let i in jsondata) {
							keys.push(i);
						}
						
						if (jsondata.state == 0) {
							console.log('登录成功' + res.state);
							uni.showToast({
								icon: 'none',
								title: '登录成功'
							});
							uni.navigateBack({
								
							})
						} else {
							console.log(jsondata.msg);
							uni.showToast({
								icon: 'none',
								title: jsondata.msg
							});
							return false;
						}
					},
					fail: (fail) => {
						console.log(fail);
					}
				})
			}
		}
	};
</script>

<style>
	@import url("../../css/shopUnit.css");
</style>
