<template>
  <div class="home">
    <el-container>
      <el-aside width="220px">
        <leftNav />
      </el-aside>
      <el-container>
        <el-header>
          <headerNav />
        </el-header>
        <el-main>
          <router-view v-if="isActive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import headerNav from '@/views/Header';
import leftNav from '@/views/leftNav';
export default {
	components: {
		leftNav,
		headerNav
	},
	data() {
		return {
			/* 用于判断是否更新界面（不是全局刷新）*/
			isActive: true
		};
	},
	methods: {
		/* 实现侧边栏点击当前路由(不改变路由)刷新组件*/
		reload() {
			this.isActive = false;
			this.$nextTick(function() {
				/* 在数据响应时刷新界面*/
				this.isActive = true;
			});
		}
	}
};
</script>
<style lang="less">
.home {
	.el-main {
		padding: 0;
		padding-left: 10px;
	}
	.el-header {
		padding: 0;
		padding-left: 10px;
		height: 50px !important;
	}
}
</style>
