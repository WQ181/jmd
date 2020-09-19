export default {
	state: {
		footer_nav: [{
				id: 1,
				name: '商城首页',
				name_code: 'home',
				icon: '/static/tabbar/shouye1.png',
				select_icon: '/static/tabbar/shouye2.png',
				size: 'small'
			},
			{
				id: 2,
				name: '附近门店',
				name_code: 'nearStore',
				icon: '/static/tabbar/fujin1.png',
				select_icon: '/static/tabbar/fujin2.png',
				size: 'small'
			},
			{
				id: 3,
				name: '购物车',
				name_code: 'cart',
				icon: '/static/tabbar/cart1.png',
				select_icon: '/static/tabbar/cart2.png',
				size: 'small'
			},
			{
				id: 4,
				name: '个人中心',
				name_code: 'member',
				icon: '/static/tabbar/user1.png',
				select_icon: '/static/tabbar/user2.png',
				size: 'small'
			}
		],
		now_page_index: 2,
	},
	mutations: {
		change_nav_list(state, data) {
			state.footer_nav = data;
		},
		change_page(state, index) {
			state.now_page_index = index;
		}
	},
	actions: {
		member(ctx) {
			let menu_list = [{
					id: 1,
					name: '商城首页',
					name_code: 'home',
					icon: '/static/tabbar/shouye1.png',
					select_icon: '/static/tabbar/shouye2.png',
					size: 'small'
				},
				{
					id: 2,
					name: '附近门店',
					name_code: 'nearStore',
					icon: '/static/tabbar/fujin1.png',
					select_icon: '/static/tabbar/fujin2.png',
					size: 'small'
				},
				{
					id: 3,
					name: '购物车',
					name_code: 'cart',
					icon: '/static/tabbar/cart1.png',
					select_icon: '/static/tabbar/cart2.png',
					size: 'small'
				},
				{
					id: 4,
					name: '个人中心',
					name_code: 'member',
					icon: '/static/tabbar/user1.png',
					select_icon: '/static/tabbar/user2.png',
					size: 'small'
				}
			]

			ctx.commit("change_nav_list", menu_list)
		},
		retailer(ctx) {
			let menu_list = [{
					id: 1,
					name: '商城首页',
					name_code: 'home',
					icon: '/static/tabbar/shouye1.png',
					select_icon: '/static/tabbar/shouye2.png',
					size: 'small'
				},
				{
					id: 2,
					name: '结算台',
					name_code: 'settlePlatform',
					icon: '/static/tabbar/fujin1.png',
					select_icon: '/static/tabbar/fujin2.png',
					size: 'small'
				},
				{
					id: 3,
					name: '商家中心',
					name_code: 'retailer',
					icon: '/static/tabbar/shangjiazhongxin1.png',
					select_icon: '/static/tabbar/shangjiazhongxin2.png',
					size: 'small'
				},
				{
					id: 4,
					name: '订单管理',
					name_code: 'ordermanage',
					icon: '/static/tabbar/cart1.png',
					select_icon: '/static/tabbar/cart2.png',
					size: 'small'
				},
				{
					id: 5,
					name: '个人中心',
					name_code: 'member',
					icon: '/static/tabbar/user1.png',
					select_icon: '/static/tabbar/user2.png',
					size: 'small'
				}
			]

			ctx.commit("change_nav_list", menu_list)
		},
		distribution(ctx) {
			let menu_list = [{
					id: 1,
					name: '商城首页',
					name_code: 'home',
					icon: '/static/tabbar/shouye1.png',
					select_icon: '/static/tabbar/shouye2.png',
					size: 'small'
				},
				{
					id: 2,
					name: '附近门店',
					name_code: 'nearStore',
					icon: '/static/tabbar/fujin1.png',
					select_icon: '/static/tabbar/fujin2.png',
					size: 'small'
				},
				{
					id: 3,
					name: '分销中心',
					name_code: 'spreader',
					icon: '/static/tabbar/shangjiazhongxin1.png',
					select_icon: '/static/tabbar/shangjiazhongxin2.png',
					size: 'small'
				},
				{
					id: 4,
					name: '积分商城',
					name_code: 'intergral',
					icon: '/static/tabbar/jifen2.png',
					select_icon: '/static/tabbar/jifen.png',
					size: 'small'
				},
				{
					id: 5,
					name: '个人中心',
					name_code: 'member',
					icon: '/static/tabbar/user1.png',
					select_icon: '/static/tabbar/user2.png',
					size: 'small'
				}
			]

			ctx.commit("change_nav_list", menu_list)
		}
	}
}
