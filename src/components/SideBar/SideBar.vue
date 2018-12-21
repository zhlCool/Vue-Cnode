<template>
    <div class="SideBar">
        <load-ing v-if="loading"></load-ing>
        <div class="autherinfo" v-else>
            <div class="authersummay">
                <p>作者</p>
                <router-link :to="{name: 'user',params:{ name:userinfo.loginname }}">
                    <img v-lazy="userinfo.avatar_url">
                </router-link>  
                <router-link :to="{name: 'user',params:{ name:userinfo.loginname }}" :title="userinfo.loginname">
                    {{userinfo.loginname}}
                </router-link>
                <section>
                    积分: {{userinfo.score}}
                </section>
            </div>
            <div class="recent_topics" v-show="topicsLimitBy5.length!=0">
                <p>作者最近主题</p>
                <ul>
                    <li v-for="(list,index) in topicsLimitBy5">
                        <router-link :to="{name:'post_content',params:{ id:list.id,name:list.author.loginname }}" :title="list.title">
                            {{list.title}}
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="recent_replies" v-show="userinfo.recent_replies.length!=0">
				<p>作者最近回复</p>
				<ul>
					<li v-for="list in userinfo.recent_replies">
						<router-link :to="{ name: 'post_content', params: { id: list.id,name:list.author.loginname }}" :title="list.title">
							{{list.title}}
						</router-link>
					</li>
				</ul>				
			</div>
        </div>
    </div>
</template>
<script>
import API_CONFIG from '@/api'
export default {
    name:'SideBar',
    data(){
        return{
            userinfo:null,
            loading:false
        }
    },
    methods:{
        getUserdata(){
			this.$Loading.start();
			this.$axios.get(`${API_CONFIG.user}${this.$route.params.name}`)
            .then(res=>{
                if(res.data.success == true){
                    this.userinfo = res.data.data;
					this.loading = false
					this.$Loading.finish();
                	// this.$Message.success('数据获取成功');
				}
            })
            .catch(err=>{
				console.log(err)
				this.$Loading.error();
                this.$Message.error('数据获取异常');
            })
        }
    },
    computed:{
        topicsLimitBy5(){
            return this.userinfo.recent_topics.slice(0,5)
		}
    },
    beforeMount(){
        this.loading = true;
        this.getUserdata();
    },
    watch:{
        $route(){
            this.getUserdata();
        }
    }
}
</script>
<style scoped>
	.SideBar {
		float: right;
		width: 290px;
		box-sizing: border-box;
	    /* margin-right: 3%; */
	    padding: 0.8rem 0.4rem;		
	}
	.SideBar .autherinfo {
		background: white;
	}
	.SideBar > div p {
		padding: 12px 0 12px 12px;
	    background-color: rgba(212, 205, 205, 0.17);
  		font-size: 0.75rem;
	}
	.SideBar img {
	    width: 3.5rem;
	    display: inline-block;
	    padding: 0 0 0 6px;
	    border-radius: 3px;
	}
	.SideBar a{
		text-decoration: none;
		color: #a8a3a3;
	}
	.SideBar .authersummay  > a {
		display: inline-block;
	    padding: 12px 0 0 6px;
	    vertical-align: top;
	}
	.SideBar .authersummay  > a[title] {
		margin-top: 20px;
  	    margin-left: 2px;
	}
	.SideBar section {
		padding: 12px 0 12px 12px;
		font-size: 0.75rem;
	}
	.SideBar li {
		list-style: none;
	}
	.recent_topics,.recent_replies {
	    font-size: 0.72rem;
	    border-top: 10px #DDDDDD solid;
	}
	.recent_topics li,
	.recent_replies li {
		padding: 4px 0 0 12px;
		color: #C0CCDA;
		white-space: nowrap;
	}
	.recent_topics ul,
	.recent_replies ul {
		padding: 10px 0 10px 0;
	}
	.recent_topics li a,
	.recent_replies li a {
		text-overflow: ellipsis;
		overflow: hidden;
	    max-width: 95%;
   		display: inline-block;
	}
</style>
