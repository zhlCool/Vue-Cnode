<template>
    <load-ing v-if="loading"></load-ing>
    <div id="content" v-else>
        <nav class="nav">
            <router-link to="/" :class="{active: $route.query.tab == 'all' || !$route.query.tab}">全部</router-link>
            <router-link to="/?tab=good" :class="{active: $route.query.tab == 'good'}">精华</router-link>
            <router-link to="/?tab=share" :class="{active: $route.query.tab == 'share'}">分享</router-link>
            <router-link to="/?tab=ask" :class="{active: $route.query.tab == 'ask'}">问答</router-link>
            <router-link to="/?tab=job" :class="{active: $route.query.tab == 'job'}">招聘</router-link>
            <router-link to="/?tab=dev" :class="{active: $route.query.tab == 'dev'}">客户端测试</router-link>
        </nav>
        <div class="topics-list">
            <Topics-List :datalist="datalist"></Topics-List>
        </div>
        <Page :total="total" 
                :page-size="40"
                :current.sync="page"
                @on-change="currentChange"
                class="page"/>
    </div>
</template>
<script>
import API_CONFIG from '@/api/index'
import store from '@/store/index'
export default {
    name:'Postlist',
    data(){
        return{
            page:1,
            datalist:{},
            loading:false,
            total:8000,
            time:2000,
            show:true
        }
    },
    created () {
        store.commit("ChangeShow",this.show);
        store.commit("ChanageLoading",this.time);
        this.loading = true;
        this.page = parseInt(this.$route.query.page) || 1;
        this.getListData();
    },
    methods:{
        currentChange(page){
            this.$router.push({
                name:this.$route.name,
                query:{
                    tab:this.$route.query.tab,
                    page,
                }
            })
            store.commit("ChangeShow",true)
        },
        getListData(){
            this.$Loading.start();
            this.$axios(API_CONFIG.topics,{
                method: 'get',
                params:{
                    page: this.page,
                    limit: 25,
                    tab:this.$route.query.tab || 'all'
                }
            })
            .then(res=>{
                if(res.status == 200 && res.data.success == true){
                    this.$Loading.finish();
                    this.datalist = res.data.data;
                    this.loading = false;
                    this.$Message.success('数据获取成功');
                }
            })
            .catch(err=>{
                console.log(err)
                this.$Loading.error();
                this.$Message.error('数据获取异常');
            })
        }
    },
    watch:{
        $route(to,from){
            console.log(this.$route,'$route');
            if(to.name !== 'home'){
                return;
            } 
            if(to.query.page == 1 || !to.query.page){
                this.page = 1;
            }
            this.getListData();
        }
    }
}
</script>
<style lang="scss" scoped>
    #content{
        width: 840px;
        background-color: white;
        float: left;
        margin: 0px 0px 20px 0px;
        .nav{
            padding:10px 0;
            background: #f6f6f6;
            a{
                padding: 2px 10px;
                font-size: 14px;
                margin-left: 5px;
                color: #80bd01;
            }
            a:hover{
                color:#333;
            }
            .active{
                background: #80bd01;
                color: #fff;
                padding: 5px;
                border-radius: 3px;
            }
        }
        .page{
            padding: 5px 0px 10px 0px;
            margin-left: 5px;
        }
    }
</style>

