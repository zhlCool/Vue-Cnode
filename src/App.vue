<template>
  <div id="app">
    <cn-Header></cn-Header>
    <div id="container">
        <router-view v-if="isRouterAlive" name='main'></router-view>
        <router-view v-if="isRouterAlive" name='sidebar'></router-view>
    </div>
    <back-top></back-top>
    <cn-footer></cn-footer>
  </div>
</template>

<script>
import cnHeader from './components/Header/Header'
import cnFooter from './components/Footer/Footer'

export default {
  name: 'app',
  components:{
    cnHeader,
    cnFooter
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
body,div,span,a,p,ul,li {
	margin: 0;
	padding: 0;
}
#container{
  width: 1150px;
  min-height: 80vh;
  margin: 20px auto;
}
</style>
