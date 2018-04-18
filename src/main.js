import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from './vuex/store';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    store, //使用store vuex状态管理
    components: { App },
    template: '<App/>',
    data: {
        Bus: new Vue()
    }
})

// import Vue from 'vue'
// import App from './App'
// import router from './router'
// import store from './store/'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'

// Vue.config.productionTip = false;

// Vue.use(ElementUI);

// new Vue({
// 	el: '#app',
// 	router,
// 	store,
// 	template: '<App/>',
// 	components: { App }
// })
