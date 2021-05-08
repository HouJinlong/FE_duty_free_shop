<template>
  <div :style="note" class="user-login">
    <div class="login-content">
      <el-card class="box-card" :rules="rules" shadow="never" v-show="loginShow">
        <div class="ms-title" slot="header">
          <span>海南免税店系统</span>
        </div>
        <div class="ms-login">
          <el-form :model="userForm" :rules="rules" ref="userForm" label-width="0px" class="aiops-userForm">
            <div v-if="errorInfo">
              <span>{{ errInfo }}</span>
            </div>
            <el-form-item prop="username" class='input_item'>
              <el-input v-model="userForm.username" placeholder="用户名" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="密码" v-model="userForm.password" clearable></el-input>
            </el-form-item>
            <!-- <div class="forget-password" @click="forgetPassword">忘记密码?</div> -->
            <!-- <el-form-item prop="captcha" class='captcha'>
              <el-input placeholder="验证码" v-model="userForm.captcha" @keyup.enter.native="submitForm('userForm')" clearable></el-input>
              <img :src="captchaUrl" @click="refreshCaptcha()">
            </el-form-item> -->
            <div @click="register('registerForm')" class="register">点击注册</div>
            <div class="login-btn">
              <el-button type="primary" @click="submitForm('userForm')">登录</el-button>
            </div>
          </el-form>
        </div>
      </el-card>
      <el-card v-show="registerShow">
        <div class="ms-title" slot="header">
          <span>海南免税店系统注册</span>
        </div>
        <el-form label-width="100px" :rules="registerRules" ref="registerForm" :model="registerForm" class="registerContainer">
          <el-form-item prop="username" label="用户名：">
            <el-input type="text" auto-complete="false" v-model="registerForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="姓名:">
            <el-input type="text" v-model="registerForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item prop="age" label="年龄:">
            <el-input type="text" v-model.number="registerForm.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item prop="telephone" label="电话:">
            <el-input type="text" v-model="registerForm.telephone" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码：">
            <el-input type="password" auto-complete="false" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="registerForm.checkPass" autocomplete="off" placeholder="请输入确认密码"></el-input>
          </el-form-item>
          <div @click="loginButtom()" class="login">登录</div>
          <el-button type="primary" style="width: 100%" @click="submitRegister" ref="registerForm">注册</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import appConfig from '@/util/appConfig';
const api = appConfig.getDataUrl();
export default {
	name: 'login',
	data() {
		var checkAge = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('年龄不能为空'));
			}
			if (!Number.isInteger(value)) {
				callback(new Error('请输入数字值'));
			} else {
				callback();
			}
		};
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.registerForm.checkPass !== '') {
					this.$refs.registerForm.validateField('checkPass');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.registerForm.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		var checkPhone = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入手机号'));
			} else {
				const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
				if (reg.test(value)) {
					callback();
				} else {
					return callback(new Error('请输入正确的手机号'));
				}
			}
		};
		return {
			background: appConfig.getPicBackground(),
			// appName: appConfig.getAppName(),
			errorInfo: false,
			captchaUrl: '',
			// captchaUrl: captchaUrl,
			userForm: {
				username: '',
				password: '',
				captcha: ''
			},
			registerForm: {
				name: '',
				telephone: '',
				age: '',
				username: '',
				password: '',
				checkPass: ''
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
				// captcha: [
				// 	{ required: true, message: '请输入验证码', trigger: 'blur' }
				// ]
			},
			note: {
				backgroundImage: 'url(' + appConfig.getPicBackground() + ')',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				width: '100%',
				height: '100%',
				position: 'absolute'
			},
			login: true,
			find: false,
			phone: '', //手机号
			verifyCode: '', //验证码
			btnTitle: '获取验证码',
			disabled: false, //是否可点击
			errors: {}, //验证提示信息
			registerRules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ validator: validatePass, trigger: 'blur' },
					{ required: true, message: '请输入密码', trigger: 'blur' }
				],
				checkPass: [
					{ validator: validatePass2, trigger: 'blur' },
					{
						required: true,
						message: '请再次输入密码',
						trigger: 'blur'
					}
				],
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				age: [
					{ validator: checkAge, trigger: 'blur' },
					{
						required: true,
						message: '请输入年龄',
						trigger: 'blur'
					}
				],
				telephone: [
					{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					},
					{ validator: checkPhone, trigger: 'blur' }
				]
			},
			registerShow: false,
			loginShow: true,
			token: ''
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					axios
						.post(
							`${api}/store/user/login?username=${
								this.userForm.username
							}&password=${this.userForm.password}`
						)
						.then((response) => {
							if (response.data.code == 20000) {
								this.token = response.data.data;
								localStorage.setItem('token', this.token);
								axios
									.get(
										`${api}/store/user/getUserByAuthorization`,
										{
											headers: {
												Authorization: this.token
											}
										}
									)
									.then((res) => {
										let user_name = res.data.data.username;
										let uid = res.data.data.uid;
										let role = res.data.data.roleType;
										localStorage.setItem('name', user_name);
										localStorage.setItem('uid', uid);
										localStorage.setItem('role', role);
										this.$router.push({
											path: '/commoditymsg'
										});
									});
							} else {
								this.$message.error(response.data.msg);
							}
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		submitRegister() {
			this.$refs.registerForm.validate((valid) => {
				if (valid) {
					let param = this.registerForm;
					axios
						.post(`${api}/store/user/register`, param)
						.then((response) => {
							if (response.data.code == 20000) {
								this.registerShow = false;
								this.loginShow = true;
								this.$message({
									message: '注册成功',
									type: 'success'
								});
							} else {
								this.$message.error(response.data.message);
							}
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		register(formName) {
			this.$refs[formName].resetFields();
			this.loginShow = false;
			this.registerShow = true;
		},
		loginButtom() {
			this.registerShow = false;
			this.loginShow = true;
		}
	}
};
</script>

<style scoped lang="less">
.user-login {
	.forget-password {
		text-align: right;
		font-size: 12px;
		color: #565858;
		margin-bottom: 18px;
		margin-top: -10px;
		cursor: pointer;
	}
	.forget-password:hover {
		color: #2196f3;
	}
	.login-content {
		padding: 0;
		position: absolute;
		left: 34%;
		top: 10%;
		width: 500px;
		border: 0px solid #ccc;
		-webkit-box-shadow: #000 0px 0px 40px;
		-moz-box-shadow: #000 0px 0px 40px;
		box-shadow: #000 0px 0px 40px;

		.el-card {
			padding: 20px;
			// width: 564px;
			.el-input {
				width: 100%;
			}
		}
	}

	.ms-title {
		text-align: center;
		font-size: 30px;
		margin-bottom: 20px;
		color: #000;
	}

	/* .ms-login {
} */
	.ms-login span {
		color: #fff;
	}

	.login-btn {
		text-align: center;
	}

	.login-btn button {
		width: 100%;
		height: 36px;
	}

	.code {
		width: 112px;
		height: 35px;
		border: 1px solid #ccc;
		float: right;
		border-radius: 2px;
	}

	.validate-code {
		width: 136px;
		float: left;
	}

	.loginTitle {
		margin: 0px auto 40px auto;
		text-align: center;
	}
	.register,
	.login {
		font-size: 12px;
		color: #409eff;
		margin-bottom: 10px;
		cursor: pointer;
		float: right;
		width: 50px;
	}
}
</style>
