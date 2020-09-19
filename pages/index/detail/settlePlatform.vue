<template>
	<view>
		<view class="box1 flex-y">
			<view class="simple">简易收款</view>
			<view class="input flex-x">
				<view>请输入金额：</view>
				<view class="int"><input type="digit" v-model="price0" placeholder="请输入金额" /></view>
			</view>
			<view class="mm flex-x">
				<view class="sum flex-x">
					商品金额: <view class="money">￥{{price0}}元</view>
				</view>
				<view class="btn1" @click="openPopup" @tap="ewm">生成二维码</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<image src="../../static/dis/ewm.jpg" mode=""></image>
		</uni-popup>
		<!-- <view class="box2 flex-y">
			<view v-for="(item,index) in categoryList" :key="index">
				<view class="kind">{{ item.kind }}</view>
				<view class="price flex-x" v-for="(i,id) in item.list" :key="id">
					<view class="id">id:{{ i.id }}</view>
					<view class="unitPrice flex-x">单价:
						<view class="inpt">
							<input type="digit" v-model="i.price" placeholder="请输入金额" placeholder-style="font-size:7upx;" />
						</view>
					</view>
					<view class="imaIcon" @tap.stop="sub(i.id)">
						<image class="imageIcon" src="../../static/image/subtract.png"></image>
					</view>
					<view class="quantity">{{ i.quantity }}</view>
					<view class="imgIcon" @tap.stop="add(i.id)">
						<image class="imageIcon" src="../../static/image/plus.png"></image>
					</view>
					<view class="notarize" @click="ds">确认</view>
				</view>

			</view>
			<view class="total flex-x">合计：<view class="money1">{{ sumPrice }}</view>元 <view class="btn2">生成二维码</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import test from '../../../auth.js';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				type: 2,
				orderList: '',
				sumPrice: 0,
				price0: '',
				categoryList: [{
						id: 1,
						kind: '类别一',
						list: [{
								id: 1,
								kind: '本店特色',
								name: '砂锅蒜香鱼头',
								img: 'ts1.jpg',
								price: '',
								quantity: 0,
								select: false
							},
							{
								id: 2,
								kind: '本店特色',
								name: '面香宝塔肉',
								img: 'ts2.jpg',
								price: '',
								quantity: 0,
								select: false
							},
							{
								id: 3,
								kind: '本店特色',
								name: '蜜汁烤肉',
								img: 'ts3.jpg',
								price: '',
								quantity: 0,
								select: false
							},
							{
								id: 4,
								kind: '本店特色',
								name: '爱喇叭土鸡',
								img: '4.jpg',
								price: '',
								quantity: 0,
								select: false
							}
						]
					},
					{
						id: 2,
						kind: '类别二',
						list: [{
								id: 5,
								kind: '山珍野味',
								name: '野生泥鳅',
								img: '1.jpg',
								price: '',
								quantity: 0,
								select: false
							},
							{
								id: 6,
								kind: '山珍野味',
								name: '野生鳝鱼',
								img: '2.jpg',
								price: '',
								quantity: 0,
								select: false
							},
							{
								id: 7,
								kind: '山珍野味',
								name: '野生杂鱼火锅',
								img: '3.jpg',
								price: '',
								quantity: 0,
								select: false
							}
						]
					},
					{
						id: 3,
						kind: '类别三',
						list: [{
							id: 8,
							kind: '自熏腊味',
							name: '干牛肉',
							img: '1.jpg',
							price: '',
							quantity: 0,
							select: false
						}]
					}
				]

			}
		},
		onShow() {

		},
		onLoad(options) {
			// console.log(options.sumPrice);
			// this.sumPrice = options.sumPrice;
		},
		methods: {
			ds() {
				var sumPrice0 = 0;
				var sumPrice1 = 0;
				var money = 0;
				for (let i = 0; i < this.categoryList.length; i++) {
					for (let k = 0; k < this.categoryList[i].list.length; k++) {
						money = this.categoryList[i].list[k].price * this.categoryList[i].list[k].quantity;
						console.log(money);
						sumPrice0 += money;
						console.log(sumPrice0);
					}
				}
				sumPrice1 += sumPrice0;
				console.log(sumPrice1);
				this.sumPrice = sumPrice1;
			},
			//弹出层
			openPopup() {
				this.$refs.popup.open();
			},
			closePopup() {
				this.$refs.popup.close()
			},
			ewm() {
				var openid = uni.getStorageSync('openid');
				var data = {
					type: this.type,
					// openid: "os05_1SD-KV9JLBUuopDi_THWELQ",
					openid: openid,
					price: this.price0*100
				}
				test.test(window.location.href, data);
			},
			// 加数量
			add(iid) {
				for (let i = 0; i < this.categoryList.length; i++) {
					for (let k = 0; k < this.categoryList[i].list.length; k++) {
						// 这里进行控制商品的最大数量 这里面示例可售卖100
						if (this.categoryList[i].list[k].id == iid) {
							//加入订单里面
							if (this.orderList.length == 0) {
								// 更新item数量
								this.categoryList[i].list[k].quantity = this.categoryList[i].list[k].quantity + 1;
								// 勾选状态下更新数量和金额
								this.categoryList[i].list[k].select = true;
								// this.sumPrice +=this.categoryList[i].list[k].price;
							} else if (this.categoryList[i].list[k].select == false) {
								// 更新item数量
								this.categoryList[i].list[k].quantity = this.categoryList[i].list[k].quantity + 1;
								// 勾选状态下更新数量和金额
								this.categoryList[i].list[k].select = true;
								// this.sumPrice +=this.categoryList[i].list[k].price;
							} else if (this.categoryList[i].list[k].select == true) {
								// 更新item数量
								this.categoryList[i].list[k].quantity = this.categoryList[i].list[k].quantity + 1;
								// this.sumPrice +=this.categoryList[i].list[k].price;
								return;
							}


						}
						// if (this.categoryList[i].list[k].quantity > 5) {
						// 	uni.showToast({
						// 		title: '点少点，要减肥',
						// 		icon: 'none'
						// 	})
						// }
					}
				}
				// console.log(this.sumPrice);
			},
			// 减数量
			sub(itemid) {
				for (let i = 0; i < this.categoryList.length; i++) {
					for (let k = 0; k < this.categoryList[i].list.length; k++) {
						if ((this.categoryList[i].list[k].id == itemid) && (this.categoryList[i].list[k].quantity > 0)) {
							// 更新item数量
							this.categoryList[i].list[k].quantity = this.categoryList[i].list[k].quantity - 1;
							this.categoryList[i].list[k].select = true;
							if (this.categoryList[i].list[k].quantity == 0) {
								this.categoryList[i].list[k].select = false;
								return
							}
							return
						} else if (this.categoryList[i].list[k].quantity <= 0) {
							uni.showToast({
								icon: 'none',
								title: '不能再减咯'
							})
						}
					}
				}
			},
		}
	}
</script>

<style>
	.flex-x {
		display: flex;
		flex-direction: row;
	}

	.flex-y {
		display: flex;
		flex-direction: column;
	}

	.box1 {
		/* width: 100%;
		height: 30%; */
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
	}

	.simple {
		text-align: center;
		font-size: 40upx;
	}

	.input {
		margin-top: 50upx;
	}

	.int {
		border: 0.5upx solid #F06C7A;
		width: 400upx;
	}

	.mm {
		margin-top: 70upx;
	}

	.sum {
		/* height: 150upx; */
		/* margin: 0 auto; */
		/* padding-top: 50upx; */
		width: 300upx;
	}

	.money {
		color: red;
	}

	.btn1 {
		/* margin-top: 20upx; */
		margin-left: 100upx;
		width: 200upx;
		padding: 0 30upx;
		height: 60upx;
		background-color: #F00019;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24upx;
		border-radius: 40upx;
	}

	.btn2 {
		margin-top: 20upx;
		margin-left: 230upx;
		width: 200upx;
		padding: 0 30upx;
		height: 60upx;
		background-color: #F00019;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24upx;
		border-radius: 40upx;
	}

	.box2 {
		width: 96%;
		padding: 10upx 3%;
		margin: 50upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
	}

	.kind {
		margin-top: 30upx;
		font-size: 35upx;
		text-align: center;
		margin-bottom: 30upx;
	}

	.price {
		margin-top: 30upx;
		height: 50upx;
		/* justify-content: space-between; */
	}

	.imageIcon {
		width: 35upx;
		height: 35upx;
	}

	.id {
		margin-left: 5upx;
	}

	.unitPrice {
		margin-left: 30upx;
	}

	.imaIcon {
		margin-top: 10upx;
		margin-left: 50upx;
	}

	.inpt {
		border: 0.5upx solid #F06C7A;
		width: 150upx;
		margin-left: 30upx;
	}

	.quantity {
		margin-top: 5upx;
		margin-left: 20upx;
	}

	.imgIcon {
		margin-top: 10upx;
		margin-left: 20upx;
	}

	.total {
		margin-top: 30upx;
		font-size: 40upx;
	}

	.money1 {
		color: red;
		font-size: 40upx;
	}

	.notarize {
		/* margin-top: 20upx; */
		margin-bottom: 15upx;
		margin-left: 65upx;
		width: 110upx;
		padding: 0 30upx;
		height: 50upx;
		background-color: #F06c7a;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 10upx;
		border-radius: 40upx;

	}
</style>
