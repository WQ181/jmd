<template>
	<view>
		<view>
			<view class="cu-form-group">
				<view class="title">收件人</view>
				<input placeholder="请填写收件人" v-model="name" name="name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input placeholder="请填写联系方式" v-model="tel" name="tel"></input>
			</view>

			<view class="cu-form-group" @click="showMulLinkageThreePicker">
				<view class="title">地址选择</view>
				<view mode="region" @click="showMulLinkageThreePicker" v-model="region">
					<view class="picker">
						{{region}}
					</view>
				</view>
			</view>


			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="请填写详细地址" v-model="detailed" name="detailed"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">设置默认地址</view>
				<view class="input switch">
					<switch color="#f06c7a" :checked="isDefault" @change="isDefaultChange" />
				</view>
			</view>

			<view class="del cuIcon-delete" v-if="editType=='edit'" @tap="del">
				删除收货地址
			</view>
		</view>


		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" @onConfirm="onConfirm" @onCancel="onCancel"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>

		<view class="save" @tap="save">
			<view class="btn">
				保存地址
			</view>
		</view>

	</view>
</template>

<script>
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue';
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		data() {
			return {
				editType: 'edit',
				id: '',
				name: '',
				tel: '',
				detailed: '',
				isDefault: false,
				themeColor: '#007AFF',
				region: '',
			};
		},
		onLoad(e) {
			//获取传递过来的参数
			this.editType = e.type;
			if (e.type == 'edit') {
				uni.getStorage({
					key: 'address',
					success: (e) => {
						console.log(e);
						this.id = e.data.id;
						this.name = e.data.name;
						this.tel = e.data.tel;
						this.detailed = e.data.address.detailed;
						this.isDefault = e.data.isDefault;
						this.region = e.data.address.region;
					}
				})
			}

		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
			}
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
			}
		},
		methods: {
			onCancel(e) {
				console.log(e);
			},
			onConfirm(e) {
				this.region = e.label;
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show();
			},
			// RegionChange(e) {
			// 	this.region = e.detail.value
			// },
			isDefaultChange(e) {
				this.isDefault = e.detail.value;
			},
			del() {
				uni.showModal({
					title: '删除提示',
					content: '你将删除这个收货地址',
					success: (res) => {
						if (res.confirm) {
							uni.setStorage({
								key: 'delAddress',
								data: {
									id: this.id
								},
								success() {
									uni.navigateBack();
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			save() {
				let data = {
					"name": this.name,
					"tel": this.tel,
					"address": {
						"region": this.region,
						"detailed": this.detailed
					},
					"isDefault": this.isDefault
				}

				console.log(data);

				if (this.editType == 'edit') {
					data.id = this.id
				}
				if (!data.name) {
					uni.showToast({
						title: '请输入收件人姓名',
						icon: 'none'
					});
					return;
				}
				if (!data.tel) {
					uni.showToast({
						title: '请输入收件人电话号码',
						icon: 'none'
					});
					return;
				}
				if (!data.address.detailed) {
					uni.showToast({
						title: '请输入收件人详细地址',
						icon: 'none'
					});
					return;
				}
				if (!data.address.region.length) {
					uni.showToast({
						title: '请选择收件地址',
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					title: '正在提交'
				})
				//实际应用中请提交ajax,模板定时器模拟提交效果
				setTimeout(() => {
					uni.setStorage({
						key: 'saveAddress',
						data: data,
						success() {
							uni.hideLoading();
							uni.navigateBack();
						}
					})
				}, 300)
			}
		},
	};
</script>
<style lang="scss">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.save {
		view {
			display: flex;
		}

		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn {
			box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #f06c7a;
			color: #fff;
			justify-content: center;
			align-items: center;

			.icon {
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}

			font-size: 30upx;
		}
	}

	.del {
		margin: 20upx;
		background-color: #f3f3f3;
		height: 100upx;
		padding: 20upx;
		text-align: center;
		font-size: 30upx;
	}
</style>
