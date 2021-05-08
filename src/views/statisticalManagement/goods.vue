<template>
	<div class="salesVolume">
		<div class="main">
			<div
				ref="sales"
				id="sales"
				style=" height: calc(100vh - 155px);padding:30px;"
			></div>
		</div>
	</div>
</template>
<script>
import echarts from 'echarts';
import axios from 'axios';
import appConfig from '@/util/appConfig';
const api = appConfig.getDataUrl();
export default {
	data() {
		return {
			token: ''
		};
	},
	mounted() {
		this.token = localStorage.getItem('token');
		this.getData();
	},
	methods: {
		getData() {
			axios
				.get(`${api}/store/productOrder/statistics`, {
					headers: {
						//头部参数
						Authorization: this.token
					}
				})
				.then(() => {
					let myChart = echarts.init(this.$refs.sales, 'macarons');
					myChart.setOption({
						series: [
							{
								name: '地区消费费统计',
								type: 'pie', // 设置图表类型为饼图
								radius: '55%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
								data: [
									// 数据数组，name 为数据项名称，value 为数据项值
									{ value: 235, name: '纪梵希散粉' },
									{ value: 274, name: '资生堂眼霜' },
									{ value: 310, name: 'SK-II' },
									{ value: 335, name: '科颜氏' },
									{ value: 400, name: '资生堂乳液' }
								]
							}
						]
					});
				});
		}
	}
};
</script>

<style lang="less">
.salesVolume {
}
</style>
