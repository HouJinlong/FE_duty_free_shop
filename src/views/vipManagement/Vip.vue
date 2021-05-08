<template>
	<div class="Vip">
		<div class="main">
			<el-row type="flex" class="row-bg" justify="center">
				<el-col :span="6">
					<el-card>
						<div>积分</div>
						<div class="box-card">8851</div>
					</el-card>
				</el-col>
				<el-col :span="3"> </el-col>
				<el-col :span="6">
					<el-card>
						<div>消费</div>
						<div class="box-card">8851元</div>
					</el-card>
				</el-col>
			</el-row>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="time" label="消费时间">
				</el-table-column>
				<el-table-column prop="name" label="商品"> </el-table-column>
				<el-table-column prop="integral" label="产生积分">
				</el-table-column>
				<el-table-column prop="consumption" label="消费金额">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [
				{
					time: '2021-05-08 10:55:00',
					name: '纪梵希散粉',
					integral: '1000',
					consumption: '9876元'
				},
				{
					time: '2021-05-08 10:55:00',
					name: '圣罗兰精华液',
					integral: '356',
					consumption: '996元'
				},
				{
					time: '2021-05-08 10:55:00',
					name: '兰蔻口红',
					integral: '881',
					consumption: '446元'
				},
				{
					time: '2021-05-08 10:55:00',
					name: '纪梵希散粉',
					integral: '80',
					consumption: '876元'
				},
				{
					time: '2021-05-08 10:55:00',
					name: '资生堂眼霜',
					integral: '880',
					consumption: '9876元'
				},
				{
					time: '2021-05-08 10:55:00',
					name: '纪梵希散粉',
					integral: '89',
					consumption: '3333元'
				},
				{
					time: '2021-05-08 10:55:00',
					name: '纪梵希散粉',
					integral: '200',
					consumption: '9876元'
				}
			]
		};
	},
	mounted() {},
	methods: {}
};
</script>

<style lang="less">
.Vip {
	.main {
		padding: 30px 10px 0;
		.box-card {
			font-size: 30px;
			font-weight: bold;
			text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
			color: #409eff;
		}
	}
}
</style>
