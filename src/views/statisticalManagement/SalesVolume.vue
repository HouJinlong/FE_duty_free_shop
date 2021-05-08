<template>
	<div class="salesVolume">
		<div class="main">
			<div class="time">
				<el-date-picker
					v-model="year"
					type="year"
					placeholder="选择年"
					@change="getData"
				>
				</el-date-picker>
				<el-date-picker
					v-model="month"
					type="month"
					placeholder="选择月"
					@change="getData"
				>
				</el-date-picker>
			</div>
			<div
				ref="sales"
				id="sales"
				style=" height: calc(100vh - 155px);padding:30px;"
			></div>
		</div>
	</div>
</template>
<script>
function randomNum(maxNum, minNum, decimalNum) {
	var max = 0,
		min = 0;
	minNum <= maxNum
		? ((min = minNum), (max = maxNum))
		: ((min = maxNum), (max = minNum));
	switch (arguments.length) {
		case 1:
			return Math.floor(Math.random() * (max + 1));
		case 2:
			return Math.floor(Math.random() * (max - min + 1) + min);
		case 3:
			return (Math.random() * (max - min) + min).toFixed(decimalNum);
		default:
			return Math.random();
	}
}
import echarts from 'echarts';
import axios from 'axios';
import appConfig from '@/util/appConfig';
const api = appConfig.getDataUrl();
export default {
	data() {
		return {
			token: '',
			year: '',
			month: ''
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
				.then((res) => {
					let name = [];
					let totalCount = [];
					let stock = [];
					let saleCount = [];
					for (let i = 0; i < res.data.data.length; i++) {
						name.push(res.data.data[i].name);
						totalCount.push(
							(res.data.data[i].totalCount * 1) / randomNum(1, 3)
						);
						stock.push(
							(res.data.data[i].stock * 1) / randomNum(1, 3)
						);
						saleCount.push(
							(res.data.data[i].saleCount * 1) / randomNum(1, 3)
						);
					}
					console.log({ totalCount, saleCount, stock });
					let myChart = echarts.init(this.$refs.sales, 'macarons');
					myChart.setOption({
						//  backgroundColor: "#344b58",
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow',
								textStyle: {
									color: '#fff'
								}
							}
						},
						legend: {
							// orient: 'vertical',
							// x: 'left',
							data: ['库存', '售出', '总数']
						},
						grid: {
							borderWidth: 0,
							top: 110,
							bottom: 95,
							textStyle: {
								color: '#fff'
							}
						},
						calculable: true,
						xAxis: [
							{
								type: 'category',
								axisLine: {
									lineStyle: {
										color: 'rgba(255,255,255,.5)'
									}
								},
								axisTick: {
									alignWithLabel: true
								},
								//设置文本过长超出隐藏...表示 【贴上这段代码即可】
								axisLabel: {
									margin: 5,
									interval: 0,
									color: 'black',
									fontSize: 16,
									formatter: function(params) {
										var val = '';
										var show = 30;
										if (params.length > show) {
											val =
												params.substr(0, show) + '...';
											return val;
										} else {
											return params;
										}
									}
								},
								splitLine: {
									show: false
								},
								splitArea: {
									show: false
								},
								data: name
							}
						],
						yAxis: [
							{
								type: 'value',
								splitLine: {
									show: false
								},
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									interval: 0,
									color: 'rgba(255,255,255,0.5)',
									fontSize: 20
								},
								splitArea: {
									show: false
								}
							}
						],
						series: [
							{
								name: '库存',
								type: 'bar',
								stack: '总量',
								barMaxWidth: 35,
								barGap: '10%',
								itemStyle: {
									normal: {
										color: {
											type: 'linear',
											x: 0,
											y: 0,
											x2: 0,
											y2: 1,
											colorStops: [
												{
													offset: 0,
													color:
														'rgba(35, 157, 250, 1)' // 0% 处的颜色
												},
												{
													offset: 1,
													color:
														'rgba(35, 157, 250, 0)' // 100% 处的颜色
												}
											],
											global: false // 缺省为 false
										}
									}
								},
								data: stock
							},

							{
								name: '售出',
								type: 'bar',
								stack: '总量',
								itemStyle: {
									normal: {
										color: {
											type: 'linear',
											x: 0,
											y: 0,
											x2: 0,
											y2: 1,
											colorStops: [
												{
													offset: 0,
													color:
														'rgba(35, 250, 187, 1)' // 0% 处的颜色
												},
												{
													offset: 1,
													color:
														'rgba(35, 250, 187, 0)' // 100% 处的颜色
												}
											],
											global: false // 缺省为 false
										},
										barBorderRadius: 0
									}
								},
								data: saleCount
							},
							{
								name: '总数',
								type: 'line',
								symbolSize: 10,
								symbol: 'circle',
								itemStyle: {
									normal: {
										color: 'rgba(255, 196, 53, 1)',
										barBorderRadius: 0
									}
								},
								lineStyle: {
									normal: {
										width: 4,
										color: {
											type: 'linear',
											x: 0,
											y: 0,
											x2: 0,
											y2: 1,
											colorStops: [
												{
													offset: 0,
													color: 'rgba(255, 67, 2, 1)' // 0% 处的颜色
												},
												{
													offset: 1,
													color:
														'rgba(255, 196, 53, 1)' // 100% 处的颜色
												}
											],
											global: false // 缺省为 false
										}
									}
								},
								data: totalCount
							}
						]
					});
				});
		}
	}
};
</script>

<style lang="less">
.main {
	position: relative;
	.time {
		position: absolute;
		right: 50px;
		top: 50px;
		z-index: 99999;
		> div:first-of-type {
			margin-right: 20px;
		}
	}
}
</style>
