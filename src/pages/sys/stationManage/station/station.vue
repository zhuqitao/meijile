<template>
    <div class="station">

        <!-- 提示信息 -->
        <mu-toast v-if="toast" :message="message" @close="toast = false"/>
        <!-- 删除站点弹窗 -->
        <mu-dialog :open="delStationOpen" title="新建站点" @close="delStationOpen = false">
            确定删除？
            <mu-flat-button slot="actions" @click="delStationOpen = false" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="delStationOpenClick" label="确定"/>
        </mu-dialog>
        <div class="head">
        </div>
        <div class="content">
            <div class="item" v-for="item in stationList.content" :key="item.id">
                <div class="head">
                    {{item.name}}
                </div>
                <div class="address">
                    {{item.prefix}}.meijile.xin
                </div>
                <div class="btn">

                    <mu-raised-button label="编辑站点" size="12px" @click="goEditMuban(item.prefix)">
                        <mu-icon value="desktop_windows" :size="16"/>
                    </mu-raised-button>
                    <mu-raised-button label="访问站点" @click="goStation(item.prefix)">
                        <mu-icon value="phone_android" :size="16"/>
                    </mu-raised-button>
                    <mu-raised-button label="删除" @click="delStation(item)" backgroundColor="red">
                        <mu-icon value="border_color" :size="16"/>
                    </mu-raised-button>
                    
                </div>
            </div>
            
            <div class="item hidden"></div>
            <div class="item hidden"></div>
            <div class="item hidden"></div>
            <div class="item hidden"></div>
        </div>
    </div>
</template>
<script>
    import './station.sass'
    import {mapGetters} from 'vuex'
    export default {
        data: () => {
            return {
                toast: false, // 提示信息开关
                message: '', // 提示信息内容
                delStationOpen: false, // 删除站点开关
                stationId: '' // 站点id
            }
        },
        computed: {
            ...mapGetters({
                stationList: 'stationList'
            })
        },
        created: function () {
            this.getStationList()
        },
        methods: {
            getStationList () {
                this.$store.dispatch('getStationList', {
                    page: 0,
                    size: 10
                })
            },
            goEditMuban (prefix) {
                let token = localStorage.getItem('currentUser_token')
                // window.open('http://' + prefix + '.meijile.xin/editStation?token=' + token)
                window.open(`http://127.0.0.1/editStation?token=${token}&prefix=${prefix}`)
            },
            goStation (prefix) {
                let token = localStorage.getItem('currentUser_token')
                window.open('http://' + prefix + '.meijile.xin')
            },
            delStation (item) {
                this.stationId = item.id
                this.delStationOpen = true
            },
            delStationOpenClick () {
                this.$store.dispatch('delStationOpenClick', {stationId: this.stationId}).then(res => {
                    this.delStationOpen = false
                    this.toast = false
                    this.message = res.msg
                    setTimeout(() => {
                        this.toast = false
                    }, 1000)
                    if (res.success) {
                        this.getStationList()
                    }
                })
            }
        }
    }
</script>

