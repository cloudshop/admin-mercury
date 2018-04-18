import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 设置一个常量
const state = {
    count: 1
}

// 封装代码
const mutations = {
    add(state) {
        state.count += 1;
    },
    reduce(state) {
        state.count -= 1;
    }
}

export default new Vuex.Store({
    state,
    mutations
});