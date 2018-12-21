<template>
    <div class="layout">
        <div class="layout-footer">
            <div class="links">
                <a href="/rss" class="dark">RSS</a> |
                <a href="https://github.com/cnodejs/nodeclub" class="dark">源码地址</a>
            </div>
            <div class="col_fade">
                <p>CNode 社区为国内最专业的 Node.js 开源技术社区， 致力于 Node.js 的技术研究。</p>
                <p>服务器赞助商为<a href="https://www.ucloud.cn/?utm_source=zanzhu&utm_campaign=cnodejs&utm_medium=display&utm_content=yejiao&ytag=cnodejs_logo" target="_blank" class="sponsor_outlink" data-label="ucloud_bottom">
                    <img src="../../assets/img/footerlogo1.png" alt="ucloud" title="ucloud" width="92px">
                </a>存储赞助商为
                <a href="http://www.qiniu.com?ref=cnode" target="_blank" class="sponsor_outlink" data-label="qiniu_bottom">
                    <img src="../../assets/img/footerlogo2.png" alt="七牛云存储" title="七牛云存储" width="115px"> 
                </a>由
                <a href="https://www.aliyun.com/product/nodejs?ref=cnode" taget="_blank" class="sponsor_outlink" data-label="alinode_bottom">
                    <img src="../../assets/img/footerlogo3.png" alt="alinode" title="alinode" height="54px" width="166px">
                </a>提供应用性能服务。
                </p>
                <p>新手搭建 Node.js 服务器， 推荐使用无需备案的
                    <a href="https://www.digitalocean.com/?refcode=eba02656eeb3">
                        DigitalOcean(https://www.digitalocean.com/)
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style scoped>
.layout{
    clear: both;
    background: #fff;
}
.layout-footer{
    position: relative;
    bottom: 0;
    width: 1150px;
    max-width: 1400px;
    min-width: 960px;
    margin: 0 auto;
    color: #e2e2e2;
    padding: 10px 0;
    font-size: 13px;
    line-height: 2em;
}
.dark{
    color: #666;
    text-decoration: none;
}
.col_fade{
    color: #ababab;
}

.col_fade p{
    line-height: 20px;
    /* vertical-align: bottom; */
    word-break: brear-word;
    margin: 0 0 10px;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
</style>
