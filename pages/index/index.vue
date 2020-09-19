<template>
	<view class="content">
		<home v-if="page_code=='home'"></home>
		<near-store v-if="page_code=='nearStore'"></near-store>
		<spreader v-if="page_code=='spreader'"></spreader>
		<intergral v-if="page_code=='intergral'"></intergral>
		<cart v-if="page_code=='cart'"></cart>
		<member v-if="page_code=='member'"></member>
		<retailer v-if="page_code == 'retailer'"></retailer>
		<ordermanage v-if="page_code == 'ordermanage'"></ordermanage>
		<settlePlatform v-if="page_code == 'settlePlatform'"></settlePlatform>
		<footerNav></footerNav>
	</view>
</template>

<script>
	import home from "./detail/home.vue"; //首页
	import nearStore from "./detail/nearStore.vue"; //附近门店
	import spreader from "./detail/spreader.vue"; //分销中心
	import cart from "./detail/cart.vue"; //购物车
	import intergral from './detail/intergral.vue'; //积分商城
	import member from "./detail/member.vue"; //会员中心
	import retailer from './detail/retailer.vue'; //商家中心
	import ordermanage from './detail/ordermanage.vue';
	import settlePlatform from './detail/settlePlatform.vue';
	import footerNav from "../../components/footer/footer_nav.vue";
	import cfg from '../../cfg.js'
	export default {
		data() {
			return {}
		},
		components: {
			home,
			nearStore,
			spreader,
			ordermanage,
			intergral,
			cart,
			member,
			footerNav,
			retailer,
			settlePlatform
		},

		computed: {
			page_code() {
				return this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code;
			}
		},
		onLoad() {
			console.log('index onload')
			this.$store.dispatch('get_data')
		},
		methods: {
			open_loading() {
				this.$loading()
			}
		}

	}
</script>

<style>

</style>
