<template>
  <div class="header">
    <div class="userInfo">
      <el-dropdown class="userInfo">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <span class="username">{{username}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="userinfo()">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="exit()">注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 弹框 -->
    <el-dialog width="600px" title="个人信息" lable-width="100px" :visible.sync="createView" class='domain_dialog' :close-on-click-modal="false">
      <el-form :model="create" ref="create" label-width="100px" @submit.native.prevent>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="create.name" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="roleType">
          <el-radio-group v-model="create.roleType" disabled>
            <el-radio :label="1001">管理员</el-radio>
            <el-radio :label="2001">员工</el-radio>
            <el-radio :label="3001">顾客</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input v-model="create.age" placeholder="请输入电话" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="telephone">
          <el-input v-model="create.telephone" placeholder="请输入电话" clearable></el-input>
        </el-form-item>
        <el-form-item label="修改密码:" prop="password">
          <el-input v-model="create.password" placeholder="请输入修改密码" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="editSave('create')">修改个人信息</el-button>
        <el-button @click.native="cancel('create')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import appConfig from '@/util/appConfig';
const api = appConfig.getDataUrl();
export default {
	data() {
		return {
			username: '',
			token: '',
			createView: false,
			create: {
				name: '',
				roleType: '',
				telephone: '',
				password: '',
				age: ''
			}
		};
	},
	created() {
		this.token = localStorage.getItem('token');
		this.username = localStorage.getItem('name');
	},
	methods: {
		exit() {
			axios
				.get(`${api}/store/user/logout`, {
					headers: {
						//头部参数
						Authorization: this.token
					}
				})
				.then((res) => {
					if (res.data.code == 20000) {
						localStorage.clear();
						this.$router.push({
							path: '/login'
						});
					} else {
						this.$message.error(res.data.msg);
					}
				});
		},
		//获取个人信息
		userinfo() {
			axios
				.get(`${api}/store/user/getUserByAuthorization`, {
					headers: {
						Authorization: this.token
					}
				})
				.then((res) => {
					if (res.data.code == 20000) {
						this.create = res.data.data;
						this.createView = true;
					} else if (res.data.code == 40001) {
						this.$message({
							message: '登录超时,返回登录页面',
							type: 'warning'
						});
						setTimeout(() => {
							location.reload(); // 强制刷新
						}, 1000);
					}
				});
		},
		editSave() {
			let param = new FormData();
			//遍历声明的data
			//这里的key就是id
			let dataList = JSON.parse(JSON.stringify(this.create));
			for (let key in dataList) {
				//append()方法，可以把键值key放到FormData对象里面去
				param.append(key, dataList[key]);
			}
			axios
				.patch(`${api}/store/user/info/onlySelf`, param, {
					headers: {
						//头部参数
						Authorization: this.token
					}
				})
				.then((res) => {
					if (res.data.code == 20000) {
						this.createView = false;
						this.$message({
							message: '修改成功',
							type: 'success'
						});
					} else {
						this.$message.error(res.data.msg);
					}
				});
		},
		cancel(formName) {
			this.$refs[formName].resetFields();
			this.createView = false;
		}
	}
};
</script>

<style lang="less">
.header {
	height: 50px;
	width: 100%;
	background: rgb(84, 92, 100);
	line-height: 50px;
	.name {
		float: left;
		margin-left: 26px;
		color: #fff;
	}
	.userInfo {
		float: right;
		margin-right: 26px;
		margin-top: 2px;
		.username {
			font-size: 16px;
			margin-left: 6px;
			display: inline-block;
			vertical-align: top;
			font-weight: bold;
			color: #fff;
		}
	}
	.el-form-item__content {
		text-align: left;
	}
}
</style>
