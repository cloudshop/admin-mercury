import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from './vuex/store';
import axios  from  'axios' ;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
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
