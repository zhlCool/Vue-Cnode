<template>
    <div class="ArticleSection">
        <load-ing v-if="loading"></load-ing>
        <!-- 详细信息 -->
        <div id="article" v-else>
            <h1>{{post.title}}</h1>
            <ul>
                <li>• 分类：{{ postTab }}</li>
                <li>• {{post.visit_count}}次访问</li>
                <li>• 发布于：{{post.create_at | formatDate}}</li>
                <li>
                    • 作者
                    <router-link :to="{ name:'user',params:{name:post.author.loginname}}">
                        {{ post.author.loginname }}
                    </router-link>
                </li>
            </ul>
            <div v-html="post.content" id="content"></div>
        </div>
        <!-- 评论 -->
        <div id="reply">
            <div v-for="(reply,index) in post.replies" :key="index" class="replySec">
                <div class="replyUp">
                    <router-link :to='{name: "user",params:{name: reply.author.loginname}}'><img :src='reply.author.avatar_url'></router-link>
       			    <router-link :to='{name: "user",params:{name: reply.author.loginname}}'>{{reply.author.loginname}}</router-link>
       			    <span>
       			    	{{index + 1}}楼
       			    </span>
                </div>
                <section v-if='reply.ups.length > 0' class='thumbsClass'>
                    <span>❤ </span>{{reply.ups.length}}
                </section>
                <p v-html='reply.content'></p>
            </div>
        </div>
    </div>
</template>
<script>
import API_CONFIG from '@/api'
export default {
    name: 'Article',
    data(){
        return{
            post:{
                author:{
                    loginname: 'temp',
                }
            },
            loading:false
        }
    },
    computed:{
        postTab(){
            let type = this.post.tab.toString();
            if(type = 'ask'){
                return '问答';
            };
            if(type = 'share'){
                return '分享';
            };
            if(type = 'job'){
                return '招聘';
            };
            if(type = 'good'){
                return '精华';
            };
        }
    },
    methods:{
        getDetailData(){
            this.$Loading.start();
            this.$axios.get(`${API_CONFIG.topicDetail}${this.$route.params.id}`,{
                params:{
                    mdrender:true
                }
            })
            .then(res=>{
                this.$Loading.finish();
                this.$Message.success('数据获取成功');
                this.post = res.data.data;
                this.loading = false;
            })
            .catch(err=>{
                console.log(err)
                this.$Loading.error();
                this.$Message.error('数据获取异常');
            })
        }
    },
    beforeMount(){
        this.loading = true;
        this.getDetailData();
    }
}
</script>
<style scoped lang="scss">
	@import url("../../assets/style/markdown-github.css");
	.ArticleSection {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		display: inline-block;
		width: 840px;
        margin: 0 auto;
		border: 1px solid #ddd;	
	    padding: 0.8rem 0.4rem;
        // #content {
        //     padding: 1rem 1rem 2rem 1rem;
        //     line-height: 1.6;
        //     padding-bottom: 1rem;
        // }
        #article {
            background: white;
            margin-bottom: 10px;
            padding-left: 20px;
            padding-top: 10px;
            h1 {
                font-size:1.2rem;
		        font-weight: 600;
            }
            ul{
                padding: 10px 0px;
                border-bottom: 1px solid #ccc;
                li{
                  	display: inline-block;
                    font-size:0.8rem ;
                    color:#000 ;
                    padding-left: 5px;  
                    a{
                        color: inherit;
   		                text-decoration: none;
                    }
                }
            }
        }

        #reply {
            display: flex;
            flex-direction: column;
            .replySec {
                box-sizing: border-box;
                border-bottom: 1px solid #C0CCDA;
                /* width: 100%; */
                padding: 1rem;
                background: white;
                .thumbsClass {
                    float: right;
                    color: red;
                }
                p {
                    padding-left: 50px;
                    clear: both;
                    overflow:auto;
                    img {
                        max-width: 100%;
                        box-sizing: content-box;
                        background-color: #fff;
                    }	
                }
                img {
                    width: 1.5rem;
                    height: 1.5rem;
                    margin-right: 1rem;
                }
            }
            .replyUp {
                display: inline-block;
                span {
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 7px;
                    margin-left: 6px;
                    font-size: 14px;
                    color: #806767;
                }
                a{
                    color: black;
                    text-decoration: none;
                    font-weight: 600;
                }
                a:nth-of-type(2) {
                    margin-left: -14px;
                    vertical-align: super;
                }
            }
        }
	}
</style>
