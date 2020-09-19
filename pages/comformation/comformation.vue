<template>
	<view>
		<!-- 收货地址 -->
		<view class="addr" @tap="selectAddress">
			<view class="icon cuIcon-location"></view>
			<view class="right">
				<view class="tel-name">
					<view class="name">
						{{recinfo.name}}
					</view>
					<view class="tel">
						{{recinfo.tel}}
					</view>
				</view>
				<view class="addres">
					{{recinfo.address.region}}
					{{recinfo.address.detailed}}
				</view>
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(row,index) in buylist" :key="index">
				<view class="goods-info">
					<view class="img">
						<image :src="row.image"></image>
					</view>
					<view class="info">
						<view class="title">{{row.name}}</view>
						<view class="spec">
							<!-- 选择{{row.spec}} -->
							数量:{{row.number}}
						</view>
						<!-- 如果是普通下单的 -->
						<view class="price-number" v-if="type == 1">
							<view class="price">￥{{row.price/100}}</view>
							<view class="price">
								特价:￥{{row.special_price/100}}
							</view>
						</view>
						<!-- 如果是积分商城的 -->
						<view class="price-number" v-if="type==5">
							<view class="price">积分:{{row.price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示-备注 -->
		<view class="order">
			<view class="row">
				<view class="left">
					备注 :
				</view>
				<view class="right">
					<input placeholder="选填,备注内容" v-model="note" />
				</view>
			</view>
		</view>
		<!-- 明细 -->
		<view class="detail" v-if="type == 1">
			<view class="row">
				<view class="nominal">
					商品金额
				</view>
				<view class="content">
					￥{{goodsPrice/100|toFixed}}
				</view>
			</view>
			<form @submit="formSubmit" @reset="formReset">
				<view class="coupon-choose">
					<radio-group class="uni-flex" name="gender">
						<label>
							<radio value="男" />优惠券</label>
					</radio-group>
				</view>
				<view class="pay-choose">
					<view class="uni-title">支付选择</view>
					<radio-group class="uni-flex" name="gender">
						<label>
							<radio value="平台余额" />平台余额</label>
						<label>
							<radio value="商家余额" />商家余额</label>
						<label>
							<radio value="微信支付" />微信支付</label>
					</radio-group>
				</view>

				<view class="footer">
					<view class="settlement" v-if="type == 1">
						<view class="sum">合计:<view class="money">￥{{sumPrice/100|toFixed}}</view>
						</view>
						<view class="btn" @tap="conform">提交订单</view>
					</view>
					<view class="settlement" v-if="type == 5">
						<view class="sum">合计:<view class="money">积分:{{sumPrice|toFixed}}</view>
						</view>
						<button class="btn" formType="submit">提交订单</button>
					</view>
				</view>
			</form>
			<!-- <view class="row" @tap="selectPlatformBalance">
				<view class="nominal">
					平台余额
				</view>
				<view class="content">
					￥-{{platform_balance|toFixed}}
				</view>
			</view>
			<view class="row" @tap="selectRetailerBalance">
				<view class="nominal">
					商家vip余额
				</view>
				<view class="content">
					￥-{{retailer_balance|toFixed}}
				</view>
			</view> -->
			<!-- <view class="row">
				<view class="nominal">
					运费
				</view>
				<view class="content">
					￥+{{freight/100|toFixed}}
				</view>
			</view> -->
			<!-- <view class="row" @tap="selectCoupon">
				<view class="nominal">
					优惠券
				</view>
				<view class="content">
					￥-{{Coupon|toFixed}}
				</view>
			</view> -->
		</view>
		<view class="blck"></view>
	</view>
</template>

<script>
	import test from '../../auth.js';
	export default {
		data() {
			return {
				buylist: [], //订单列表
				goodsPrice: 0.0, //商品合计价格
				sumPrice: 0.0, //用户付款价格
				freight: 0.0, //运费
				note: '', //备注
				int: 1200, //抵扣积分
				deduction: 0, //抵扣价格
				Coupon: 0, //优惠券
				type: '',
				platform_balance: 0, //平台余额抵扣
				retailer_balance: 0, //商家vip余额抵扣
				recinfo: {
					id: 1,
					name: "大黑哥",
					tel: "18816881688",
					address: {
						region: "广东省-深圳市-福田区",
						detailed: '深南大道1111号无名摩登大厦6楼A2'
					},
					isDefault: true
				}

			};
		},
		onLoad(options) {
			console.log(options);
			this.type = options.type;

			//页面显示时，加载订单信息
			uni.getStorage({
				key: 'cart-buy',
				success: (res) => {
					console.log(res.data);
					this.buylist = res.data;
				}
			});
			var buylist = this.buylist;
			//合计
			let len = buylist.length;
			for (let i = 0; i < len; i++) {
				if (buylist[i].is_special) {
					this.goodsPrice += buylist[i].number * buylist[i].special_price;
					this.freight += buylist[i].freight;
				} else {
					this.goodsPrice += buylist[i].number * buylist[i].price;
					this.freight += buylist[i].freight;
				}
			}
		},
		onShow(options) {
			var value = uni.getStorageSync('all_balance');
			if (value == '') {
				this.platform_balance = 0;
				this.retailer_balance = 0;
			} else {
				// console.log(value);
				this.retailer_balance = value.retailer_balance;
				this.platform_balance = value.platform_balance;
			}
			console.log(this.platform_balance);
			console.log(this.retailer_balance);

			this.deduction = this.int / 100;
			if (this.type == 1) {
				this.sumPrice = this.goodsPrice + this.freight - this.platform_balance * 100 - this.retailer_balance * 100 - this.Coupon;
			} else {
				this.sumPrice = this.goodsPrice
			}

			uni.getStorage({
				key: 'selectAddress',
				success: (e) => {
					this.recinfo = e.data;
					uni.removeStorage({
						key: 'selectAddress'
					})
				}
			})
			uni.getStorage({
				key: 'selectCoupon',
				success: (res) => {
					alert(JSON.stringify(res.data));
					this.Coupon = res.data;
					uni.removeStorage({
						key: 'selectCoupon'
					})
				}
			})
		},
		onBackPress() {
			//页面后退时候，清除订单信息
			this.clearOrder();
		},
		filters: {
			toFixed: function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			//订单提交
			conform() {
				var that = this;
				console.log(that.buylist);
				var openid = uni.getStorageSync('openid');
				// that.buylist[0].price = 0.01;
				var ajaxdata;
				if (that.type == 5) {
					ajaxdata = {
						type: that.type,
						// openid: "os05_1SD-KV9JLBUuopDi_THWELQ",
						openid: openid,
						commodity_msg: that.buylist,
						address: that.recinfo.address.region + that.recinfo.address.detailed,
						mobile: that.recinfo.tel,
						consignee: that.recinfo.name,
					};
				}
				if (that.type == 1) {
					ajaxdata = {
						type: that.type,
						// openid: "os05_1SD-KV9JLBUuopDi_THWELQ",
						openid: openid,
						commodity_msg: that.buylist,
						address: that.recinfo.address.region + that.recinfo.address.detailed,
						mobile: that.recinfo.tel,
						consignee: that.recinfo.name,
						// coupon:this.Coupon,
					};
				}
				console.log(ajaxdata);
				// test.test(window.location.href, ajaxdata);
			},
			//订单清理
			clearOrder() {
				uni.removeStorage({
					key: 'cart-buy',
					success: (res) => {
						this.buylist = [];
						console.log('remove buylist success');
					}
				});
				uni.removeStorage({
					key: 'all_balance',
					success(e) {
						console.log('ok');
					}
				})
			},
			//选择收货地址
			selectAddress() {
				uni.navigateTo({
					url: '../address/address?type=select'
				})
			},
			//选择优惠券
			selectCoupon() {
				uni.navigateTo({
					url: '../coupon/mycoupon'
				})
			},
			//选择那个地方的余额
			selectPlatformBalance() {
				var type = 'platform_balance';
				uni.navigateTo({
					url: '../balance/balanceEnquiry/balanceEnquiry'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../css/comformation.css';
	
	.uni-flex{
		display: flex;
		flex-direction: column;
	}
	.uni-flex label{
		margin: 5upx;
	}
</style>
