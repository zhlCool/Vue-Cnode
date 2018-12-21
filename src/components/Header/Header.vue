<template>
    <div class="layout">
        <div class="ivu-layout-header">
            <div class="container">
                <div class="layout-logo">
                    <a href="#" class="brand">
                        <router-link :to="{name:'home'}">
                            <img src="../../assets/img/cnodejs_light.svg"/>
                        </router-link>
                    </a>
                </div>
                <ul class="ivu-menu">
                    <li class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <router-link :to="{name:'home'}">首页</router-link>
                    </li>
                    <li class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <a href="https://github.com/zhlCool" target="_blank">关于作者</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // name:'header',
    data(){
        return{
        }
    }
}
</script>

<style scoped lang="scss">
.layout-nav{
    width: 50px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout{
    border: 1px solid #d7dde4;
    background: #444;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    font-size: 13px;
    margin-bottom: 0;
    z-index: 9;
    width: 100%;
    .ivu-layout-header{
        background: #444;
        min-width: 960px;
        margin: 0 auto;
        padding: 0px;
        width: 1150px;
        max-width: 1400px;
            .layout-logo{
            width: 120px;
            height: 34px;
            line-height: 34px;
            color: #ccc;
            font-weight: 700;
            margin-top:14px;
            float: left;
                .layout-logo img{
                    max-width:100%;
                    margin-top:5px;
                }
        }
        .ivu-menu{
            float: right;
            width: 180px;
            height: 64px;
            line-height: 64px;
            text-align: center;
            li{
                width:70px;
                float: left;
                a{
                    color:#ccc;
                }
                a:hover{
                    color: #fff;
                }
            }
        }
    }
}
</style>
