<template>
    <div class="UserInfo">
       <load-ing v-if="loading"></load-ing>
       <div class="userInfomation" v-else>
           <section>
               <img v-lazy="userinfo.avatar_url"  :title="userinfo.loginname">
                <span>{{userinfo.loginname}}</span>
                <p>{{userinfo.score}} 积分</p>
                <p>注册时间: {{ userinfo.create_at | formatDate}}</p>
           </section>
			<div class="replies">
				<p>回复的主题</p>
				<ul>
					<li v-for="item in userinfo.recent_replies">
						<router-link :to="{ name: 'post_content', params: { id: item.id,name:item.author.loginname }}" :title="item.title">
							{{item.title}}
						</router-link>
					</li>
				</ul>
			</div>
			<div class="topics">
				<p>创建的主题</p>
				<ul>
					<li v-for="item in userinfo.recent_topics">
						<router-link :to="{ name: 'post_content', params: { id: item.id,name:item.author.loginname }}" :title="item.title">
							{{item.title}}
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
    name:'User',
    data(){
        return{
            userinfo:{},
            loading:false
        }
    },
    methods:{
        getUserData(){
			this.$Loading.start();
            this.$axios.get(`${API_CONFIG.user}${this.$route.params.name}`)
            .then(res=>{
                if(res.data.success == true){
                    this.userinfo = res.data.data;
					this.loading = false
					this.$Loading.finish();
                }
            })
            .catch(err=>{
				console.log(err)
                this.$Loading.error();
                this.$Message.error('数据获取异常');
            })
        }
    },
    beforeMount(){
        this.loading = true
        this.getUserData();
	},
	watch:{
		$route(){
			console.log(this.$route)
		}
	}
}
</script>
<style scoped lang="scss">
	.userInfomation {
		background: white;
		width: 75%;
		margin: 10px auto;
		section {
			padding: 12px;
		}
		img {
			width: 5rem;
		}
		li {
			list-style:none;
		}
		.replies,.topics {
			font-size: 0.72rem;
			border-top: 10px #DDDDDD solid;
		}
		div p{
			padding: 12px 0 12px 12px;
			background-color: rgba(212, 205, 205, 0.17);
			font-size: 0.75rem;		
		}
		div ul li{
			padding: 4px 0 4px 12px;
			white-space: nowrap;
			font-size: 0.72rem;
			text-overflow: ellipsis;
			overflow: hidden;
			line-height: 30px;
			vertical-align: middle;	
			a{
				color: #094E99;
				text-decoration: none;
			}
		}
	}
</style>
