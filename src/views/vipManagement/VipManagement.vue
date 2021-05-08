<template>
	<div class="LogManagement">
		<div class="main">
			<div class="search">
				<el-form
					:inline="true"
					@submit.native.prevent
					class="demo-form-inline"
				>
					<el-form-item>
						<el-input
							placeholder="请输入会员名"
							size="small"
							v-model.trim="username"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							size="mini"
							@click.native="search()"
							>搜索</el-button
						>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="uid" label="会员编号"> </el-table-column>
				<el-table-column prop="name" label="姓名"> </el-table-column>
				<el-table-column prop="username" label="用户名">
				</el-table-column>
				<el-table-column prop="time" label="成为会员时间">
				</el-table-column>
				<el-table-column prop="integral" label="积分">
				</el-table-column>
				<el-table-column prop="consumption" label="消费">
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
					uid: 10000002,
					name: '张三',
					username: 'admin',
					telephone: '15677778888',
					age: 10,
					roleType: 1001,
					time: '2021-05-08 10:55:00',
					integral: '8800',
					consumption: '999876元'
				},
				{
					uid: 10000003,
					name: '王冬晴',
					username: 'wang',
					telephone: '15632965612',
					age: 12,
					roleType: 3001,
					time: '2021-05-08 10:55:00',
					integral: '8100',
					consumption: '922876元'
				},
				{
					uid: 10000004,
					name: '孙七',
					username: 'sunny',
					telephone: '17331934391',
					age: 21,
					roleType: 2001,
					time: '2021-05-08 10:55:00',
					integral: '80450',
					consumption: '983376元'
				},
				{
					uid: 10000005,
					name: '李依晓',
					username: 'lili',
					telephone: '18531970708',
					age: 23,
					roleType: 2001,
					time: '2021-05-08 10:55:00',
					integral: '81200',
					consumption: '922876元'
				},
				{
					uid: 10000006,
					name: '海路',
					username: 'hai',
					telephone: '18756789011',
					age: 23,
					roleType: 3001,
					time: '2021-05-08 10:55:00',
					integral: '1800',
					consumption: '19876元'
				},
				{
					uid: 10000007,
					name: '李进荣',
					username: 'lily',
					telephone: '15678653210',
					age: 24,
					roleType: 3001,
					time: '2021-05-08 10:55:00',
					integral: '8100',
					consumption: '91876元'
				},
				{
					uid: 10000008,
					name: '张迪',
					username: 'zhang',
					telephone: '15678532109',
					age: 25,
					roleType: 3001,
					time: '2021-05-08 10:55:00',
					integral: '16',
					consumption: '76元'
				},
				{
					uid: 10000009,
					name: '叶项明',
					username: 'ye',
					telephone: '13567890123',
					age: 26,
					roleType: 3001,
					time: '2021-05-08 10:55:00',
					integral: '100',
					consumption: '3876元'
				},
				{
					uid: 10000010,
					name: '刘萌萌',
					username: 'liu',
					telephone: '15676763216',
					age: 21,
					roleType: 3001,
					time: '2021-05-08 10:55:00',
					integral: '200',
					consumption: '876元'
				},
				{
					uid: 10000011,
					name: '梦瑶',
					username: 'meng',
					telephone: '18331932156',
					age: 29,
					roleType: 3001,
					time: '2021-05-08 10:55:00',
					integral: '1800',
					consumption: '986元'
				}
			],
			pageSize: 10,
			page: 10,
			currentPage: 1,
			username: '',
			count: 0,
			createView: false,
			create: {
				name: '',
				telephone: '',
				password: '',
				roleType: ''
			},
			title: '',
			dialogTableVisible: false,
			dialogTableData: []
		};
	},
	mounted() {},
	methods: {
		show(data) {
			console.log('data: ', data);
			this.title = data.name + '的登录记录';
			this.dialogTableData = [
				{
					time: '2021-05-08 10:55:00',
					endTime: '2021-05-08 12:55:00',
					location: '北京海淀龙翔路'
				},
				{
					time: '2021-05-07 11:55:00',
					endTime: '2021-05-07 12:55:00',
					location: '北京海淀龙翔路'
				}
			].map((v) => {
				v.location = data.location;
				return v;
			});
			this.dialogTableVisible = true;
		}
	}
};
</script>

<style lang="less"></style>
