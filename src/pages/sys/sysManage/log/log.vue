<template>
    <div>
        <div>
            <label>开始时间：</label>
            <mu-date-picker container="inline" hintText="请选择时间" v-model="startTime"/>
            <label>结束时间：</label>
            <mu-date-picker container="inline" hintText="请选择时间" v-model="endTime"/>
            <label>耗时：</label>
            <mu-text-field hintText="提示文字" v-model="spendTime"/>
            <label>IP查询：</label>
            <mu-auto-complete hintText="请随便输入点啥" @input="queryIPChange" :dataSource="IPSource" @change="queryIPChange" v-model="IP" />

            <mu-raised-button label="查询" @click="queryLog" class="demo-raised-button" primary/>
        </div>
        <Table border :columns="columns" :data="logList.content"></Table>
        <mu-pagination class="stationPage" :total="logList.totalElements" :current="logList.number + 1" @pageChange="pageChange"></mu-pagination>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import './log.sass'
export default {
    data () {
        return {
            startTime: '',
            endTime: '',
            spendTime: '',
            IP: '',
            // IPSource: [],
            columns: [
                {
                    title: '创建时间',
                    key: 'createDate'
                },
                {
                    title: 'IP',
                    key: 'ip'
                },
                {
                    title: '请求方式',
                    key: 'method'
                },
                {
                    title: '请求参数',
                    key: 'params'
                },
                {
                    title: '耗时',
                    key: 'spendTime'
                },
                {
                    title: '用户名字',
                    key: 'userName'
                }
            ]
        }
    },
    computed: mapGetters({
        logList: 'logList',
        IPSource: 'IPSource'
    }),
    created () {
        this.$store.dispatch('getLogList', {
            page: 0,
            size: 10
        })
        this.$store.dispatch('getIPSource')
    },
    methods: {
        pageChange: function (pageNumber) {
            this.$store.dispatch('getLogList', {
                page: pageNumber - 1,
                size: 10
            })
        },
        queryLog: function () {
            this.$store.dispatch('queryLog', {
                page: 0,
                size: 10,
                startTime: this.startTime,
                endTime: this.endTime,
                spendTime: this.spendTime,
                ip: this.IP
            })
        },
        queryIPChange: function () {
            //
        }
    }
}
</script>
