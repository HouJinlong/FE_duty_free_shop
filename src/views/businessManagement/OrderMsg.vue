<template>
  <div class="orderMsg">
    <div class="main" v-show="this.role==1001||this.role==2001">
      <div class=" search">
        <el-form :inline="true" @submit.native.prevent class="demo-form-inline">
          <el-form-item>
            <el-input placeholder="请输入订单编号" size="small" @keyup.enter.native="searchEnterFun" v-model.trim="poid" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click.native="search()">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="productOrder.poid" label="订单编号">
        </el-table-column>
        <el-table-column prop="user.name" label="客戶姓名">
        </el-table-column>
        <el-table-column prop="user.telephone" label="客戶电话">
        </el-table-column>
        <el-table-column prop="product.name" label="所购商品">
        </el-table-column>
        <el-table-column prop="productOrder.count" label="购买数量">
        </el-table-column>
        <el-table-column prop="product.sumPrice" label="总消费">
        </el-table-column>
        <el-table-column prop="productOrder.createTime" label="购买时间" :formatter="timeFormatter">
        </el-table-column>
        <el-table-column prop="productOrder.orderTime" label="提取时间" :formatter="orderTimeFormatter">
        </el-table-column>
        <el-table-column prop="productOrder.status" label="状态">
          <template slot-scope="scope">
            <span v-show="scope.row.productOrder.status==false">未提取</span>
            <span v-show="scope.row.productOrder.status==true">已提取</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="productOrder.status" label="操作">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-goods" @click.native="extract(scope.row)" size="mini" v-if="scope.row.productOrder.status==false">提取</el-button>
            <el-button type="text" icon="el-icon-goods" size="mini" disabled v-show="scope.row.productOrder.status==true">提取</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>
    </div>
    <div class="main" v-show="this.role==3001">
      <el-table :data="tableList" style="width: 100%">
        <el-table-column prop="productOrder.poid" label="订单编号">
        </el-table-column>
        <el-table-column prop="product.name" label="所购商品">
        </el-table-column>
        <el-table-column prop="productOrder.count" label="购买数量">
        </el-table-column>
        <el-table-column prop="product.sumPrice" label="总消费">
        </el-table-column>
        <el-table-column prop="createTime" label="购买时间" :formatter="createTimeFormatter">
        </el-table-column>
        <el-table-column prop="orderTime" label="提取时间" :formatter="orderTime">
        </el-table-column>
        <el-table-column prop="productOrder.status" label="状态">
          <template slot-scope="scope">
            <span v-show="scope.row.productOrder.status==false">未提取</span>
            <span v-show="scope.row.productOrder.status==true">已提取</span>
          </template>
        </el-table-column>
        <el-table-column prop="productOrder.status" label="操作">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-goods" @click.native="extract(scope.row)" size="mini" v-if="scope.row.productOrder.status==false">提取</el-button>
            <el-button type="text" icon="el-icon-goods" size="mini" disabled v-show="scope.row.productOrder.status==true">提取</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChanges" @current-change="handleCurrentChanges" :current-page="curr" :page-sizes="[10, 30, 50, 100]" :page-size="page" layout="total, sizes, prev, pager, next, jumper" :total="counts">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import appConfig from '@/util/appConfig';
const api = appConfig.getDataUrl();
import moment from 'moment';
export default {
	data() {
		return {
			tableData: [],
			tableList: [],
			pageSize: 10,
			page: 10,
			currentPage: 1,
			curr: 1,
			count: 0,
			counts: 0,
			token: '',
			poid: '',
			uid: '',
			role: ''
		};
	},
	mounted() {
		this.role = localStorage.getItem('role');
		this.token = localStorage.getItem('token');
		this.uid = localStorage.getItem('uid');
		this.getData();
	},
	methods: {
		getData() {
			if (this.role == 1001 || this.role == 2001) {
				axios
					.get(
						`${api}/store/productOrder/page?poid=${
							this.poid
						}&index=${this.currentPage}&size=${this.pageSize}`,
						{
							headers: {
								//头部参数
								Authorization: this.token
							}
						}
					)
					.then((res) => {
						if (res.data.code == 20000) {
							this.count = res.data.data.count;
							for (
								let i = 0;
								i < res.data.data.list.length;
								i++
							) {
								//获取总金额
								res.data.data.list[i].product.sumPrice =
									res.data.data.list[i].product.price *
									res.data.data.list[i].productOrder.count;
							}
							this.tableData = res.data.data.list;
						} else if (res.data.code == 40001) {
							this.$message({
								message: '登录超时,返回登录页面',
								type: 'warning'
							});
							// localStorage.clear();
							this.$router.push({
								path: '/login'
							});
						}
					});
			}
			if (this.role == 3001) {
				axios
					.get(
						`${api}/store/productOrder/customer?uid=${
							this.uid
						}&index=${this.currentPage}&size=${this.pageSize}`,
						{
							headers: {
								//头部参数
								Authorization: this.token
							}
						}
					)
					.then((res) => {
						if (res.data.code == 20000) {
							this.counts = res.data.data.count;
							for (
								let i = 0;
								i < res.data.data.list.length;
								i++
							) {
								//获取总金额
								res.data.data.list[i].product.sumPrice =
									res.data.data.list[i].product.price *
									res.data.data.list[i].productOrder.count;
							}
							this.tableList = res.data.data.list;
						} else if (res.data.code == 40001) {
							this.$message({
								message: '登录超时,返回登录页面',
								type: 'warning'
							});
							// localStorage.clear();
							this.$router.push({
								path: '/login'
							});
						}
					});
			}
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.getData();
		},
		handleSizeChange(val) {
			this.pageSize = val;
			this.getData();
		},
		handleCurrentChanges(val) {
			this.curr = val;
			this.getData();
		},
		handleSizeChanges(val) {
			this.page = val;
			this.getData();
		},
		timeFormatter(row) {
			return moment(row.productOrder.createTime).format('YYYY-MM-DD HH:mm:ss');
		},
		orderTimeFormatter(row) {
			return moment(row.productOrder.orderTime).format('YYYY-MM-DD HH:mm:ss');
		},
		createTimeFormatter(val) {
			return moment(val.createTime).format('YYYY-MM-DD HH:mm:ss');
		},
		orderTime(val) {
			return moment(val.orderTime).format('YYYY-MM-DD HH:mm:ss');
		},
		search() {
			this.getData();
		},
		extract(row) {
			console.log(row);

			let params = {};
			params.poid = row.productOrder.poid;
			params.status = true;
			let param = new FormData();
			//遍历声明的data
			//这里的key就是id
			for (let key in params) {
				//append()方法，可以把键值key放到FormData对象里面去
				param.append(key, params[key]);
			}
			axios
				.patch(`${api}/store/productOrder/status`, param, {
					headers: {
						//头部参数
						Authorization: this.token
					}
				})
				.then((res) => {
					if (res.data.code == 20000) {
						this.page = 10;
						this.curr = 1;
						this.getData();
						this.$message({
							message: '提取成功',
							type: 'success'
						});
					}
				});
		}
	}
};
</script>

<style lang="less">
.orderMsg {
}
</style>
