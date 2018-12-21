
<template>
    <aside id="RightBar" v-if="isShow && isLoading">
        <div class="personal-information">
            <div class="tourist-box">
                <div class="cnode">
                    CNode：Node.js专业中文社区
                </div>
                <div class="tourlist">
                    <span v-if="isFlag!=2">当前是游客状态 ,</span>
                    <a href="javascript:;" v-if="isFlag!=2" @click="modal1 = true">请登录</a>
                    <Modal
                        v-model="modal1"
                        title="登录到Cnode社区"
                        @on-ok="handleSubmit('formInline')"
                        @on-cancel="cancellogin">
                        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                            <FormItem prop="user">
                                <Input type="text" v-model="formInline.user" placeholder="Username">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="password" v-model="formInline.password" placeholder="Password">
                                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                        </Form>
                    </Modal>

                    <span v-if="isFlag==2">欢迎您,{{isUser}}</span>
                    <Button type="primary" @click="modal2 = true" v-if="isFlag==2">退出</Button>
                    <Modal
                        v-model="modal2"
                        title="确定要退出Cnode社区吗？"
                        @on-ok="ok"
                        @on-cancel="cancel">
                        <p>CNode 社区为国内最大最具影响力的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
                        <p>CNode 社区由一批热爱 Node.js 技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对 Node.js 感兴趣的朋友。</p>
                        <p>CNode 的 SLA 保证是，一个9，即 90.000000%。</p>
                        <p>社区目前由 <a href="https://cnodejs.org/user/alsotang" target="_blank">@alsotang</a> 在维护，有问题请联系：<a href="https://github.com/alsotang" target="_blank">https://github.com/alsotang</a> </p>
                        <p>请关注我们的官方微博：<a href="http://weibo.com/cnodejs" target="_blank">http://weibo.com/cnodejs</a></p>
                    </Modal>
                </div>
            </div>

            <div class="pay">
                <div class="paytitle">给作者买杯咖啡</div>
                <Carousel autoplay :autoplay-speed="5000" v-model="value1" loop>
                    <CarouselItem>
                        <div class="demo-carousel">
                            <img src="../../assets/img/wechat.png" >
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div class="demo-carousel">
                            <img src="../../assets/img/alipay.png">
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>
        </div>    
    </aside>
</template>
<script>
import store from '@/store/index'
export default {
    inject: ['reload'],
    data () {
        return {
            modal1: false,
            modal2: false,
            user:'',
            value1:0,
            isRightBar:false,
            loginflag:2,
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入一个合法的用户名！', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '输入的密码不能为空！', trigger: 'change' },
                    { type: 'string', min: 6, message: '输入的密码不得小于6位字符！', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        ok () {
            store.commit("ChangeNewFlag",1)
            this.$Message.success('已退出!');
            this.reload();
        },
        cancel(){
            this.$Message.info('暂未退出!');
        }
        ,
        handleSubmit(name) {
            let localUser = window.localStorage.getItem('user');
            let localPassword = window.localStorage.getItem('password');
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.formInline.user === localUser && this.formInline.password === localPassword){
                        store.commit("ChangeNewFlag",this.loginflag);
                        store.commit("ChangeUser",this.formInline.user)
                        this.$Message.success('登录成功!');
                        this.reload();
                    }else{
                        this.$Message.error('登录失败!请检查你的用户名和密码是否正确！!');
                    }
                } else {
                    this.$Message.error('登录失败!请检查你的用户名和密码是否正确！');
                }
            })
            
        },
        cancellogin(){
            this.$refs.formInline.resetFields();
            this.$Message.info('暂未登录!');
        }
    },
    computed:{
        isFlag:function(){
            return this.$store.getters.isFlag;
        },
        isShow:function(){
            return this.$store.getters.isShow;
        },
        isUser:function(){
            return this.$store.getters.isUser;
        },
        isLoading:function(){
            return this.$store.getters.isLoading;
            
        }
    }
}
</script>
<style scoped lang="scss">
#RightBar{
    float: right;
    width: 290px;
    .personal-information{
        border-radius:5px;
        .tourist-box{
            background: #fff;
            padding:15px;
            .cnode{
                color:#000;
            }
        }
        .tourlist{
            margin-top:15px;
        }
    }
    .pay{
        background: #fff;
        margin-top: 25px;
        padding: 10px;
        border-radius: 5px;
        pointer-events:none;
        .paytitle{
            font-weight: 600;
            text-align: center;
            padding: 10px;
            margin-bottom:10px;
            background:#f6f6f6; 
        }
        .demo-carousel{
            width: 260px;
            height: 260px;
        }
    }	
    	
}
</style>
