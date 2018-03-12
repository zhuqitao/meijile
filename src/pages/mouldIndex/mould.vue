<template>
    <div class="mould">
        <div class="head">
            <div class="logo">
                <div>One Step</div>
                <img src="/static/logo.png">
            </div>
            <mu-raised-button class="login-info" label="登录" primary/>
        </div>
        <div class="scroll">
            <div class="scroll-item">
                <img src="http://bk.image.styleweb.com.cn/2016/04/24/e4e8e1e7619aea9d38158892b44ed816.png">
            </div>
        </div>
        <div class="type">
            <mu-tabs :value="activeTab" class="type-bar" @change="handleTabChange">
                <mu-tab value="tab" title="所有网站" />
                <mu-tab value="tab1" title="个人网站" />
                <mu-tab value="tab2" title="企业网站" />
                <mu-tab value="tab3" title="销售网站" />
            </mu-tabs>
        </div>
        <div class="content">
            <div class="mould-item" v-for="item in list" :key="item.id">
                <mu-card>
                    <mu-card-media>
                        <img v-lazy="item.pic1" @mouseover="imgOver" @mouseout="imgOut"/>
                    </mu-card-media>
                    <mu-card-title title="减肥药网站模板" />
                    <mu-card-text>
                        减肥药网站模板,医疗网站模板,饮食健康网站模板,保健品网站模板
                    </mu-card-text>
                    <mu-card-actions>
                        <mu-raised-button label="预览风格" />
                        <mu-raised-button label="免费试用" primary/>
                    </mu-card-actions>
                </mu-card>
            </div>
        </div>
    </div>
</template>
<script>
    import "./mould.sass"
    import {mapGetters} from 'vuex'
    export default {
        data () {
            return {
                activeTab: "tab",
                list: [
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'},
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'},
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'},
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'},
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'},
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'},
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'},
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'},
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'},
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'},
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'},
                    {pic1: 'http://bk.image.styleweb.com.cn/sp/1513678566174?imageMogr2/crop/x900/thumbnail/500x'}
                ]
            }
        },
        created: function () {
            this.getMouldList({
                page: 0,
                size: 10
            })
        },
        computed: {
            ...mapGetters({
                mouldList: 'mouldList'
            })
        },
        methods: {
            getMouldList (state) {
                this.$store.dispatch('getMouldList', state)
            },
            handleTabChange (val) {
                this.activeTab = val
                this.getMouldList({
                    page: this.mouldList.number,
                    size: 10,
                    type: val.slice(3, 4)
                })
            },
            imgOver (e) {
                var imgHeight = e.target.height
                var conHeight = e.target.parentNode.offsetHeight
                var scrollHeight = imgHeight - conHeight
                e.target.style.transform = `translateY(-${scrollHeight}px)`
                e.target.style.transition = '5s'
            },
            imgOut (e) {
                e.target.style.transform = `translateY(0px)`
            }
        }
    }
</script>

