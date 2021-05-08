<template>
	<el-row class="tac leftNav">
		<el-col :span="24">
			<el-menu
				:default-active="activeIndex"
				:router="true"
				class="el-menu-vertical-demo"
				@open="handleOpen"
				@close="handleClose"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
			>
				<h3 class="name">免税店管理系统</h3>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>基础管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/commoditymsg"
							>商品管理</el-menu-item
						>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span slot="title">业务管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/ordermsg">订单管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span slot="title">会员管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/RequestVip"
							>申请成为会员</el-menu-item
						>
						<el-menu-item index="/Vip">会员主页</el-menu-item>
						<el-menu-item index="/VipManagement"
							>会员管理</el-menu-item
						>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu
					index="3"
					v-show="this.role == 1001 || this.role == 2001"
				>
					<template slot="title">
						<i class="el-icon-s-data"></i>
						<span slot="title">统计管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/salesvolume"
							>销售额统计</el-menu-item
						>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="/location">地区统计</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="/goods">热销商品统计</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4" v-show="this.role == 1001">
					<template slot="title">
						<i class="el-icon-setting"></i>
						<span slot="title">系统管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/rulermsg">权限管理</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="/LogManagement"
							>日志管理</el-menu-item
						>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>
<script>
import axios from 'axios';
import appConfig from '@/util/appConfig';
const api = appConfig.getDataUrl();
export default {
	computed: {
		activeIndex() {
			const address = this.$route.path;
			return address;
		}
	},
	data() {
		return {
			username: '',
			role: ''
		};
	},
	created() {
		this.role = localStorage.getItem('role');
		this.username = localStorage.getItem('name');
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		exit() {
			axios.get(`${api}/user/out`).then((response) => {
				if (response.data.code == 1) {
					this.$router.push('/login');
					localStorage.removeItem(name);
				} else {
					this.$message.error(response.data.message);
				}
			});
		}
	}
};
</script>
<style lang="less">
.leftNav {
	.name {
		padding-top: 15px;
		padding-bottom: 15px;
		font-size: 18px;
		color: #fff;
	}
	ul {
		padding: 0;
		margin: 0;
		height: calc(100vh - 30px);
		li {
			text-align: left;
			.el-menu-item-group__title {
				padding: 0;
			}
			ul {
				height: auto;
				li {
					.el-menu-item {
						padding-left: 70px !important;
					}
				}
			}
		}
	}
}
</style>
