<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row" v-for="(row,index) in addressList" :key="index" @tap="select(row)">
					<!-- 地址详细信息 -->
					<view class="center">
						<view class="name-tel">
							<view class="name">{{row.name}}</view>
							<view class="tel">{{row.tel}}</view>
							<view class="default" v-if="row.isDefault">
								默认
							</view>
						</view>
						<view class="address">
							{{row.address.region}} {{row.address.detailed}}
						</view>
					</view>
					<!-- 编辑 -->
					<view class="right">
						<view class="cuIcon-edit" @tap.stop="edit(row)"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="add">
			<view class="btn" @tap="add">
				<view class="cuIcon-add"></view>新增地址
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isSelect: false,
				addressList: [{
						id: 1,
						name: "沐筱淋",
						tel: "18816881688",
						address: {
							region: "广东省-深圳市-福田区",
							detailed: '深南大道1111号无名摩登大厦6楼A2'
						},
						isDefault: true
					},
					{
						id: 2,
						name: "大黑哥",
						tel: "15812341234",
						address: {
							region: "广东省-深圳市-福田区",
							detailed: '深北小道2222号有名公寓502'
						},
						isDefault: false
					},
					{
						id: 3,
						name: "老大哥",
						tel: "18155467897",
						address: {
							region: "广东省-深圳市-福田区",
							detailed: '深南大道1111号无名摩登大厦6楼A2'
						},
						isDefault: false
					},
					{
						id: 4,
						name: "王小妹",
						tel: "13425654895",
						address: {
							region: "广东省-深圳市-福田区",
							detailed: '深南大道1111号无名摩登大厦6楼A2'
						},
						isDefault: false
					},
				]
			};
		},
		onLoad() {
			var profile = [];
			for (var i = 0; i < this.addressList.length; i++) {
				if (this.addressList[i].isDefault == true) {
					profile.push(this.addressList[i]);
					console.log(profile);
				}
			}
			try {
				uni.setStorageSync('profile', profile);

			} catch (e) {
				console.log(e);
			}
		},
		onShow() {
			// 获取删除之后的信息
			uni.getStorage({
				key: 'delAddress',
				success: (e) => {
					let len = this.addressList.length;
					if (e.data.hasOwnProperty('id')) {
						for (let i = 0; i < len; i++) {
							if (this.addressList[i].id == e.data.id) {
								this.addressList.splice(i, 1);
								break;
							}
						}
					}
					uni.removeStorage({
						key: 'delAddress'
					})
				}
			})

			// 获取编辑之后保存的信息
			uni.getStorage({
				key: 'saveAddress',
				success: (e) => {
					console.log(e.data);
					let len = this.addressList.length;
					if (e.data.hasOwnProperty('id')) {
						for (let i = 0; i < len; i++) {
							if (this.addressList[i].id == e.data.id) {
								this.addressList.splice(i, 1, e.data);
								break;
							}
						}
					} else {
						let lastid = this.addressList[len - 1];
						lastid++;
						e.data.id = lastid;
						this.addressList.push(e.data);
					}
					uni.removeStorage({
						key: 'saveAddress'
					})
				}
			})
		},
		onLoad(e) {
			if (e.type == 'select') {
				this.isSelect = true;
			}
		},
		methods: {
			edit(row) {
				uni.setStorage({
					key: 'address',
					data: row,
					success() {
						uni.navigateTo({
							url: "address-edit?type=edit"
						})
					}
				});
			},
			//增加地址
			add() {
				uni.navigateTo({
					url: "address-edit?type=add"
				})
			},
			select(row) {
				//是否需要返回地址(从订单确认页跳过来选收货地址)
				if (!this.isSelect) {
					return;
				}
				uni.setStorage({
					key: 'selectAddress',
					data: row,
					success() {
						uni.navigateBack();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../css/address.css'
</style>
