import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//访问全局的state对象 设置初始值
const state={
    flag:'',
    show:false,
    user:'',
    loading:500
}
//存放的数据
const getters ={
    isFlag(state){
        return state.flag;
    },
    isShow(state){
        return state.show;
    },
    isUser(state){
        return state.user;
    },
    isLoading(state){
        return state.loading
    }
}
//修改的数据
const mutations ={
    ChangeNewFlag(state,num){
        state.flag = num;
    },
    ChangeShow(state,str){
        state.show = str;
    },
    ChangeUser(state,str){
        state.user = str;
    },
    ChanageLoading(state,num){
        state.loading = num;
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations
})

export default store