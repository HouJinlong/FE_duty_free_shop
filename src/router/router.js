import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import CommodityMsg from '@/views/basicManagement/CommodityMsg.vue';
import OrderMsg from '@/views/businessManagement/OrderMsg.vue';
import SalesVolume from '@/views/statisticalManagement/SalesVolume.vue';
import Location from '@/views/statisticalManagement/location.vue';
import Goods from '@/views/statisticalManagement/goods.vue';
import RuleMsg from '@/views/systemManagement/RuleMsg.vue';
import LogManagement from '@/views/systemManagement/LogManagement.vue';
import RequestVip from '@/views/vipManagement/RequestVip.vue';
import Vip from '@/views/vipManagement/Vip.vue';
import VipManagement from '@/views/vipManagement/VipManagement.vue';

//安装路由
Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/',
			name: 'home',
			//重定向
			redirect: '/login',
			component: Home,
			children: [
				{
					path: '/commoditymsg',
					name: '商品管理',
					component: CommodityMsg
				},
				{
					path: '/ordermsg',
					name: '订单管理',
					component: OrderMsg
				},
				{
					path: '/salesvolume',
					name: '销售额统计',
					component: SalesVolume
				},
				{
					path: '/rulermsg',
					name: '权限管理',
					component: RuleMsg
				},
				{
					path: '/LogManagement',
					name: '登录管理',
					component: LogManagement
				},
				{
					path: '/location',
					name: '地区统计',
					component: Location
				},
				{
					path: '/goods',
					name: '热销商品统计',
					component: Goods
				},
				{
					path: '/RequestVip',
					name: '申请成为会员',
					component: RequestVip
				},
				{
					path: '/Vip',
					name: '会员主页',
					component: Vip
				},
				{
					path: '/VipManagement',
					name: '会员管理',
					component: VipManagement
				}
			]
		}
	]
});
