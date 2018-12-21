// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Local from './assets/js'
Local();

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'

import BackTop from './components/Common/BackTop'
import Loading from './components/Common/Loading'
import List from './components/Common/TopicList'

Vue.component(BackTop.name, BackTop)
Vue.component(Loading.name, Loading)
Vue.component(List.name, List)

Vue.prototype.$axios = axios
Vue.use(VueLazyLoad, {
    loading: require('./assets/img/loading.gif')
});

Vue.use(iView)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})
Vue.filter('formatDate', function (str) {
    if (!str) {
        return ''
    }
    var date = new Date(str)
    var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return ''
    } else if ((time / 1000 < 30)) {
        return '刚刚'
    } else if (time / 1000 < 60) {
        return parseInt((time / 1000)) + '秒前'
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前'
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前'
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前'
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前'
    } else {
        return parseInt(time / 31536000000) + '年前'
    }
}
)