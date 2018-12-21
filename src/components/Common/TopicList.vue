<template>
    <ul>
        <li v-for="post in datalist" >
            <router-link :to="{ name:'post_content', params:{ id: post.id,name:post.author.loginname} }" :title="post.author_id">
                <img v-lazy="post.author.avatar_url" :title="post.author.loginname">
            </router-link>
            <span class="read">{{ post.reply_count }}/{{ post.visit_count }}</span>
            <span class="tag" :class="tag(post).className" v-if="post.tab">{{ tag(post).text }}</span>
            <router-link :to="{ name:'post_content', params:{ id: post.id,name:post.author.loginname} }" :title="post.author_id">
                {{post.title}}
            </router-link>
            <span class="last_reply">
                {{post.last_reply_at | formatDate}}
            </span>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'TopicsList',
    data(){
        return{

        }
    },
    props:{
        datalist:{
            type:Array,
            default(){
                return []
            },
            required:true
        }
    },
    methods:{
        tag(topic){
            if(topic.top){
                return{
                    text:'置顶',
                    className: 'top'
                }
            }
            if(topic.good){
                return{
                    text:'精华',
                    className: 'good'
                }
            }
            switch(topic.tab){
                //问答
                case 'ask':
                return {
                    text: '问答',
                    className: topic.tab
                };
                // 分享
                case 'share':
                return {
                    text: '分享',
                    className: topic.tab
                };
                // 招聘
                case 'job':
                return {
                    text: '招聘',
                    className: topic.tab
                };
                // 精华
                case 'good':
                return {
                    text: '精华',
                    className: topic.tab
                };
                // 测试
                case 'dev':
                return {
                    text: '测试',
                    className: topic.tab
                };
                default:
                return {
                    text: '',
                    className: 'default'
                }
            }
        }
    }
}
</script>
<style scoped lang="scss">
    ul{
        display: block;
        list-style-type: disc;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        li {
            list-style: none;
            margin-bottom: 14px;
            border-bottom: 1px solid #E7E7E7;
            line-height: 30px;
            padding-right: 10px;
            background:#fff;
            position: relative;
            padding: 10px 0px 10px 10px;
            font-size: 14px; 
            img {
                width: 1.5rem;
                height: 1.5rem;
            }
            .read{
                display: inline-block;
                text-align: center;
                width: 70px;
                font-size: 12px;
                margin: 0 10px;
            }
            a {
                text-decoration: none;
                color: inherit;
                -o-text-overflow: ellipsis;
                white-space: nowrap;
                display: inline-block;
                vertical-align: middle;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 70%;
            }	
            .last_reply {
                float:right;
                margin-top: 0.3rem; 
                text-align: center;
                width: 70px;
                font-size: 12px;
            }
            .tag{
                margin-top: 7px;
                font-size: 12px;
                color: #999;
                background: #e5e5e5;
                padding: 2px 4px;
                border-radius: 3px;
                font-weight: 500;
            }
            .good{
                background: #80bd01;
                color: #fff;
            }
            .top{
                background: #80bd01;
                color: #fff;   
            }
        }
        li:hover{
            background-color: #eee;
        }
    }
</style>

