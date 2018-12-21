import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import RightBar from '@/components/RightBar/RightBar'
import Detail from '@/components/Detail/Detail'
import User from '@/components/User/User'
import SideBar from '@/components/SideBar/SideBar'
import Notfound from '@/components/Notfound/Notfound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components:{
        main:Home,
        sidebar:RightBar
      }
    },{
      path: '/detail/:id&auther=:name',
      name:'post_content',
      components:{
        main:Detail,
        sidebar:SideBar
      }
    },{
      path: '/user/:name',
      name: 'user',
      components:{
        main:User
      }
    },{
      path:'*',
      name: 'Notfound',
      components:{
        main:Notfound
      }
    }
  ]
})
