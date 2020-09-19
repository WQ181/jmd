<template>
	<view>
		<!-- 搜索 -->
		<view class="box">
			<view class="cu-bar bg-cyan search">
				<!-- 搜索 -->
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="输入关键字" v-model="keyword" @focus="focus"></input>
					<view class="cuIcon-close" @click="close"></view>
				</view>
				<view class="action" @click="search" v-if="hidden">
					<text>搜索</text>
				</view>
			</view>
		</view>
		<!-- 分类检索 -->
		<view class="choose">
			<!-- 按距离检索 -->
			<view class="section">
				<picker @change="bindPickerChange" :value="index" :range="dist" data-column="dist">
					<view class="picker">
						{{distance}}
						<view class="cuIcon-down"></view>
					</view>
				</picker>
			</view>
			<!-- 按类别 -->
			<view class="section">
				<picker @change="bindPickerChange" :value="index" :range="ctype" data-column="ctype">
					<view class="picker">
						{{type}}
						<view class="cuIcon-down"></view>
					</view>
				</picker>
			</view>
			<!-- 按时间 -->
			<view class="section">
				<picker @change="bindPickerChange" :value="index" :range="join_time" data-column="join_time">
					<view class="picker">
						{{other}}
						<view class="cuIcon-down"></view>
					</view>
				</picker>
			</view>
			<!-- 全部分类 -->
		</view>

		<!-- 小标签 -->
		<view class="smallTable">
			推荐商家
		</view>

		<!-- 商品列表 -->
		<view class="show">
			<scroll-view scroll-y>
				<view class="list" v-for="(item,index) in list" :key="index">
					<image class="picture" :src="item.license_image" @tap="gotoCompanyData(item)"></image>
					<view class="intro" @tap="gotoCompanyData(item)">
						<view class="name">{{ item.name }}</view>
						<view class="address">地址:{{item.addr}}</view>
						<view class="tel" v-if="item.mobile">电话:{{item.mobile}}</view>
						<view class="type">分类:{{item.type}}</view>
						<view class="distance">距离您:{{ dis[index] }}km</view>
					</view>
					<view class="addr-img">
						<image v-if="item.mobile" src="../../static/image/dianhua.png" class="add-img" @click="phoneNow(item.mobile)"></image>
						<image src="../../static/image/dizhi2.png" class="add-img" @click="getStoreAddr(item)"></image>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import cfg from '../../../cfg.js';
	import all from '../../../common/global.js';
	import getAppid from '../../../auth.js';
	export default {
		data() {
			return {
				hidden: false,
				keyword: '',
				dis: [],
				distance: '距离',
				type: '类型',
				other: '其他',
				dist: ['附近', '500', '1000', '2000', '5000'],
				ctype: ['全部', '美食', '电器', '家具', '生活用品', '酒店旅游', '休闲娱乐', '家居建设', '商业服务', '生鲜水果'],
				join_time: ['其他', '最新入驻 '],
				list: [],//渲染列表
				lat: 0, //自己的经纬度
				lon: 0,
				index: 0,
				item:[]//比对列表
			};
		},
		created() {
			var that = this;
			//获取缓存中的经纬度
			that.lat = uni.getStorageSync('lat');
			that.lat = Math.round(that.lat * 10000) / 10000; //格式化

			that.lon = uni.getStorageSync('lon');
			that.lon = Math.round(that.lon * 10000) / 10000;
			// alert(that.lat + "," + that.lon);
			this.getList();
		},
		//上拉分页
		onReachBottom: function() {
			//上拉分页,pageNum+1，然后调用分页函数getLsit()
			var that = this;
			uni.showToast({
				icon: 'loading',
				duration: 500
			});
		},
		//下拉刷新
		onPullDownRefresh: function() {
			var that = this;
			that.distance = '距离';
			that.type = '类型';
			that.other = '其他';
			that.getList();
			uni.stopPullDownRefresh();
		},
		methods: {
			//获取传输过来的数据
			getList() {
				var that = this;
				uni.request({
					url: cfg.originUrl + '/shop/retailer/allretailer',
					method: 'GET',
					success: (res) => {
						console.log(res.data.data);
						that.list = res.data.data;
						that.item = res.data.data;
						for (var i = 0; i < that.list.length; i++) {
							uni.request({
								url: cfg.originUrl + '/wx/mp/get_location.do',
								data: {
									lng1: that.list[i].longtitude,
									lat1: that.list[i].latitude,
									lng2: that.lon,
									lat2: that.lat,
								},
								method: 'GET',
								success: (res) => {
									var distance = Math.round(res.data * 100) / 100000;
									that.dis.push(distance);
								}
							})
						}
					},
					fail: (e) => {
						console.log(e);
					}
				})
			},
			// 聚焦于
			focus() {
				this.hidden = !this.hidden;
			},
			// 查找
			search(e) {
				var temp = [];
				var keyword = this.keyword;
				console.log(keyword);
				for (var i = 0; i < this.list.length; i++) {
					if (this.list[i].name.match(keyword)) {
						console.log(this.list[i].name);
						temp.push(this.list[i]);
					}
				}
				this.list = temp;
				if (temp.length <= 0) {
					uni.showToast({
						icon: 'loading',
						title: '暂无此商家'
					})
				}
			},
			//拨打电话
			phoneNow(mobile) {
				uni.makePhoneCall({
					phoneNumber: mobile,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			//获取位置，代开地图
			getStoreAddr(item) {
				console.log(item);
				uni.openLocation({
					latitude: item.latitude,
					longitude: item.longtitude,
					success: (res) => {
						console.log(res);
					}
				})
			},
			//分类检索的改变
			bindPickerChange(e) {
				var that = this;
				let column = e.currentTarget.dataset.column;
				let idx = e.detail.value;
				console.log(column, idx);
				console.log('picker变为', idx, that[column][idx]);
				let v = that[column][idx];

				switch (column) {
					case 'dist':
						that.distance = v;
						break;
					case 'ctype':
						that.type = v;
						break;
					case 'join_time':
						that.other = v;
						break;
				}

				console.log('selectedDist:', that.distance, 'selectedType:', that.type, 'selectedJoin_time:', that.other);
				//取得选定商品信息
				var list = that.item;
				//通过类型判断
				if (column == 'ctype') {
					var temp = [];
					for(var i = 0;i<list.length;i++){
						if(list[i].type.match(v)){
							// console.log("ppp");
							temp.push(list[i]);
						}else{
							console.log("ooo");
						}
					}
					console.log(temp);
					that.list = temp;
				}
				//通过加入时间判断
				if (column == 'join_time') {
					for (var i = 0; i < list.length; i++) {
						// console.log(list[i].join_time);
						for (var j = 0; j < list.length; j++) {
							if (list[i].join_time < list[j].join_time) {
								var temp = list[i];
								list[i] = list[j];
								list[j] = temp;
							}
						}
					}
					console.log(list);
					that.list = list;
				}
				//通过距离判断
				if (column == 'dist') {
					console.log("hhhhhh");
					var disList = [];
					if (v == '附近') {
						that.getList();
					}
					for (var i = 0; i < this.dis.length; i++) {
						if (this.dis[i] <= v) {
							console.log("rr");
							disList.push(that.list[i]);
						} else {
							console.log('pp');
						}
					}
					that.list = disList;
				}

				this.index = e.detail.value;
			},
			//清除搜索框，请刷新这个页面
			close() {
				this.keyword = '';
				uni.showToast({
					icon: 'loading',
				})
				this.getList();
				this.hidden = !this.hidden;
			},
			gotoCompanyData(item) {
				// console.log(item);
				uni.setStorageSync('nearStore', item);
				uni.navigateTo({
					url: '../retailerInfo/retailerInfo'
				})
			}
		}
	};
</script>

<style src="../../../css/nearStore.css"></style>
