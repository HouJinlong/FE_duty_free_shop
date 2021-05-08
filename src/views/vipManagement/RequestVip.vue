<template>
	<div class="RequestVip">
		<div class="main ">
			<div style="padding-top:100px;padding-bottom:70px;">
				<p>
					消费产生积分，积分可以当钱花
				</p>
				<br />
				<el-button @click="goVip">加入会员</el-button>
			</div>
			<img src="../../assets/example-7.png" alt="" srcset="" />
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	mounted() {},
	methods: {
		goVip() {
			this.$router.push({
				path: '/Vip'
			});
		}
	}
};
</script>

<style lang="less">
.RequestVip {
	.main {
		text-align: center;
		img {
			width: 500px;
			background: #fff;
		}
	}
}
</style>
