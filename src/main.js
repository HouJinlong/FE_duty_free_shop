import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import echarts from 'echarts';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import VueParticles from 'vue-particles';

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);
// Vue.use(VueParticles);
new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
