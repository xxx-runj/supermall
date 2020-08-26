import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 购物车列表
        cartList: [],
        isAllIn:false,
    },
    mutations,
    actions,
    getters,
    modules: {}
});
