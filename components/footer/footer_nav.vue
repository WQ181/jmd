<template>
	<view>
		<view class="footer">
			<view :class="'footer_item ' + (item.size=='big'?'big_item':'')  " :style="'width:'+item_width" @click="change_nav(footer_nav,item.id,index)"
			 v-for="(item,index) in footer_nav" :key="index">
				<image :src="index==now_index?item.select_icon:item.icon"></image>
				<view class="footer-word">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import all from '../../common/global.js';
	export default {
		data() {
			return {

			};
		},
		methods: {
			change_nav(item, id, index) {
				this.$store.commit("change_page", index);
				var identity = uni.getStorageSync('identity');
				if (index == 0) {
					this.$store.dispatch('member')
				}
				// //实际用
				// if (index == (item.length - 1) && identity == '分销商') {
				// 	this.$store.dispatch('distribution')
				// }
				// if (index == (item.length - 1) && identity == '商家') {
				// 	this.$store.dispatch('retailer')
				// }
				// if (item.length == 4 && index == 3 &&identity != 'member') {
				// 	this.$store.commit("change_page", id);
				// }
				
				//调试用
				if (index == (item.length - 1) && all.globalData.identity == '分销商') {
					this.$store.dispatch('distribution')
				}
				if (index == (item.length - 1) && all.globalData.identity == '商家') {
					this.$store.dispatch('retailer')
				}
				if (item.length == 4 && index == 3 && all.globalData.identity != 'member') {
					this.$store.commit("change_page", id);
				}
			}
		},
		computed: {
			item_width() {
				let length = this.$store.state.footer_store.footer_nav.length;
				switch (length) {
					case 1:
						return '100%'
						break;
					case 2:
						return '50%'
						break;
					case 3:
						return '33.3%'
						break;
					case 4:
						return '25%'
						break;
					case 5:
						return '20%'
						break;
					default:
						break;
				}
			},
			footer_nav() {
				console.log(this.$store.state.footer_store.footer_nav)
				return this.$store.state.footer_store.footer_nav
			},
			now_index() {
				// if(all.globalData.identity == 'member'){
				// 	this.$store.state.footer_store.now_page_index -= 2;
				// 	return this.$store.state.footer_store.now_page_index;
				// }
				return this.$store.state.footer_store.now_page_index;
			}
		}
	}
</script>

<style>
	.footer {
		height: 110rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: white;
		color: #3C3C3C;
		/* z-index: 10; */
	}

	.footer_item {
		float: left;
		width: 25%;
		text-align: center;
		font-size: 28upx;
		height: 100upx;
		border-top: 1upx solid #F3F3F3;
		padding-top: 10upx;
	}

	.footer_item image {
		width: 50upx;
		height: 50upx;
	}

	.footer_item.big_item {
		position: relative;
		/* top: -30upx; */
	}

	.footer_item.big_item image {
		width: 100upx;
		height: 100upx;
	}

	.footer-word {
		margin-top: -12upx;
	}
</style>
