<template>
	<view>

		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			<view class="list">
				<view class="row" v-for="(row,index) in list" :key="index">
					<view class="type">{{typeText[row.type]}}</view>
					<view class="order-info">
						<view class="left">
							<image class="left-img" :src="row.img"></image>
						</view>
						<view class="right">
							<view class="name">
								{{row.name}}
							</view>
							<view class="spec">{{row.spec}}</view>
							<view class="price-number">
								￥<view class="price">{{row.price}}</view>
								x<view class="number">{{row.numner}}</view>
							</view>
						</view>

					</view>
					<view class="detail">
						<view class="number">共{{row.numner}}件商品</view>
						<view class="sum">合计￥<view class="price">{{row.payment}}</view>
						</view>
						<view class="nominal">(含运费 ￥{{row.freight}})</view>
					</view>
					<view class="btns">
						<block v-if="row.type=='unpaid'">
							<view class="default" @tap="cancelOrder(row)">取消订单</view>
							<view class="pay" @tap="toPayment(row)">付款</view>
						</block>
						<block v-if="row.type=='back'">
							<view class="default" @tap="remindDeliver(row)">提醒发货</view>
						</block>
						<block v-if="row.type=='unreceived'">
							<view class="pay" @tap="confirmReceipt(row)">确认收货</view>
						</block>
						<block v-if="row.type=='received'">
							<view class="default" @click="toEvaluate(row)">评价</view>
						</block>
						<block v-if="row.type=='cancelled'">
							<view class="default">已取消</view>
						</block>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				headerPosition: "fixed",
				headerTop: "0px",
				typeText: {
					unpaid: '等待付款',
					back: '等待商家发货',
					unreceived: '商家已发货',
					received: '等待用户评价',
					completed: '交易已完成',
					cancelled: '订单已取消'
				},
				orderType: ['全部', '待付款', '待发货', '待收货', '待评价'],
				//订单列表 演示数据
				orderList: [
					[{
							type: "unpaid",
							ordersn: 0,
							goods_id: 0,
							img: '/static/goods/p1.jpg',
							name: '商品名称商品名称商品名称商品名称商品名称',
							price: '168.00',
							payment: 168.00,
							freight: 12.00, //运费
							spec: '规格:S码',
							numner: 1
						},
						{
							type: "unpaid",
							ordersn: 1,
							goods_id: 1,
							img: '/static/goods/p2.jpg',
							name: '商品名称商品名称商品名称商品名称商品名称',
							price: '168.00',
							payment: 168.00,
							freight: 12.00,
							spec: '规格:S码',
							numner: 1
						},
						{
							type: "back",
							ordersn: 2,
							goods_id: 1,
							img: '/static/goods/p3.jpg',
							name: '商品名称商品名称商品名称商品名称商品名称',
							price: '168.00',
							payment: 168.00,
							freight: 12.00,
							spec: '规格:S码',
							numner: 1
						},
						{
							type: "unreceived",
							ordersn: 3,
							goods_id: 1,
							img: '/static/goods/p4.jpg',
							name: '商品名称商品名称商品名',
							price: '168.00',
							payment: 168.00,
							freight: 12.00,
							spec: '规格:S码',
							numner: 1
						},
						{
							type: "received",
							ordersn: 4,
							goods_id: 1,
							img: '/static/goods/p5.jpg',
							name: '商品名称商品名称商品名称商品名称商品名称',
							price: '168.00',
							payment: 168.00,
							freight: 12.00,
							spec: '规格:S码',
							numner: 1
						}
					],
					[{
							type: "unpaid",
							ordersn: 0,
							goods_id: 0,
							img: '/static/goods/p1.jpg',
							name: '商品名称商品名称商品名称商品名称商品名称',
							price: '168',
							payment: 168.00,
							freight: 12.00,
							spec: '规格:S码',
							numner: 1
						},
						{
							type: "unpaid",
							ordersn: 1,
							goods_id: 1,
							img: '/static/goods/p2.jpg',
							name: '商品名称商品名称商品名称商品名称商品名称',
							price: '168',
							payment: 168.00,
							freight: 12.00,
							spec: '规格:S码',
							numner: 1
						}
					],
					[{
						type: "back",
						ordersn: 2,
						goods_id: 1,
						img: '/static/goods/p3.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '168.00',
						payment: 168.00,
						freight: 12.00,
						spec: '规格:S码',
						numner: 1
					}, ],
					[{
						type: "unreceived",
						ordersn: 3,
						goods_id: 1,
						img: '/static/goods/p4.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '168',
						payment: 168.00,
						freight: 12.00,
						spec: '规格:S码',
						numner: 1
					}],
					[{
						type: "received",
						ordersn: 4,
						goods_id: 1,
						img: '/static/goods/p5.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '168',
						payment: 168.00,
						freight: 12.00,
						spec: '规格:S码',
						numner: 1
					}]
				],
				list: [],
				tabbarIndex: 1
			};
		},
		onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			console.log("option: " + JSON.stringify(option));
			let tbIndex = parseInt(option.id);
			this.list = this.orderList[tbIndex];
			this.tabbarIndex = tbIndex;
			//兼容H5下排序栏位置
			// #ifdef H5
			let Timer = setInterval(() => {
				let uniHead = document.getElementsByTagName('uni-page-head');
				if (uniHead.length > 0) {
					this.headerTop = uniHead[0].offsetHeight + 'px';
					clearInterval(Timer); //清除定时器
				}
			}, 1);
			// #endif

		},
		onPageScroll(e) {
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
		},
		methods: {
			//评价
			toEvaluate() {
				uni.navigateTo({
					url: 'evaluate'
				})
			},
			showType(tbIndex) {
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			//提醒发货
			remindDeliver(row) {
				uni.showToast({
					title: '已提醒商家发货'
				})
			},
			//确认收货
			confirmReceipt() {
				
			},
			//退货
			salesReturn() {

			},
			cancelOrder(row) {
				uni.showModal({
					title: '取消订单',
					content: '确定取消此订单？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.doCancelOrder(row.ordersn);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			doCancelOrder(ordersn) {
				let typeNum = this.orderList.length;
				for (let i = 0; i < typeNum; i++) {
					let list = this.orderList[i];
					let orderNum = list.length;
					if (orderNum > 0 && list[0].type == 'unpaid') {
						for (let j = 0; j < orderNum; j++) {
							if (this.orderList[i][j].ordersn == ordersn) {
								this.orderList[i][j].type = 'cancelled';
								break;
							}
						}
					}

				}
			},
			toPayment(row) {

			}
		}
	}
</script>

<style lang="scss">
	@import '../../css/indent.css';

	// 按钮样式
	.btns {
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		view {
			min-width: 120upx;
			height: 50upx;
			padding: 0 20upx;
			border-radius: 50upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-left: 20upx;
		}
	}
</style>
