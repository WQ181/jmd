<template>
	<view>
		<!-- <view class="cuIcon-edit edit-attention" @click="edit">
			编辑
		</view>
 -->
		<view class="body" v-for="(item,index) in interestList" :key="index">

			<!-- checkbox -->
			<view class="checkbox-box" @tap="selected(index)" v-if="show">
				<view class="checkbox">
					<view :class="[item.selected ? 'on' : '']"></view>
				</view>
			</view>

			<image :src="item.image" class="img"></image>
			<view class="infor">
				<view class="name">{{item.name}}</view>
				<view class="price">￥{{item.price}}</view>
			</view>
		</view>

		<!-- 脚部菜单 -->
		<view class="footer" style=" bottom: 0 " v-if="show">
			<view class="checkbox-box" @tap="allSelect">
				<view class="checkbox">
					<view :class="[isAllselected ? 'on' : '']"></view>
				</view>
				<view class="text">全选</view>
			</view>
			<view class="delBtn" @tap="deleteList" v-if="selectedList.length > 0">删除</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				isAllselected: false,
				selectedList: [],
				interestList: [
				// 	{
				// 	id: 1,
				// 	image: '../../static/image/buzhihuo.jpg',
				// 	name: '999足金关键挂件',
				// 	price: '228.0',
				// 	selected: false
				// }, {
				// 	id: 2,
				// 	image: '../../static/image/buzhihuo.jpg',
				// 	name: '999足金关键挂件',
				// 	price: '229.0',
				// 	selected: false
				// }
				]
			}
		},
		onNavigationBarButtonTap() {
			this.edit();
		},
		onLoad() {
			var list = uni.getStorageSync('notice');
			console.log(list);
			this.interestList.push(list);
		},
		methods: {
			// 选中商品
			selected(index) {
				this.interestList[index].selected = this.interestList[index].selected ? false : true;
				let i = this.selectedList.indexOf(this.interestList[index].id);
				i > -1 ? this.selectedList.splice(i, 1) : this.selectedList.push(this.interestList[index].id);
				this.isAllselected = this.selectedList.length == this.interestList.length;
			},
			//全选
			allSelect() {
				let len = this.interestList.length;
				let arr = [];
				for (let i = 0; i < len; i++) {
					this.interestList[i].selected = this.isAllselected ? false : true;
					arr.push(this.interestList[i].id);
				}
				this.selectedList = this.isAllselected ? [] : arr;
				this.isAllselected = this.isAllselected || this.interestList.length == 0 ? false : true;
			},
			// 删除商品s
			deleteList() {
				let len = this.selectedList.length;
				while (this.selectedList.length > 0) {
					this.deleteGoods(this.selectedList[0]);
				}
				this.selectedList = [];
				this.isAllselected = this.selectedList.length == this.interestList.length && this.interestList.length > 0;
			},
			deleteGoods(id) {
				let len = this.interestList.length;
				for (let i = 0; i < len; i++) {
					if (id == this.interestList[i].id) {
						this.interestList.splice(i, 1);
						break;
					}
				}
				this.selectedList.splice(this.selectedList.indexOf(id), 1);
				this.oldIndex = null;
				this.theIndex = null;
			},
			edit() {
				this.show = !this.show;
			}
		}
	}
</script>

<style lang="scss">
	@import '../../css/myattention.css'
</style>
