<template>
    <div class="sign">
        <dia-log :open="open" :data="state" :cb="fun" @onInputChange="onInputChange"></dia-log>

        <mu-dialog v-if="isShowDetail" :open="isShowDetail" title="详情" @close="isShowDetail = false" bodyClass="role-dia-log">
            <mu-list>
                <mu-list-item>
                   创建时间： {{showDetailData.createTime}}
                </mu-list-item>
                <mu-list-item>
                   内容标志名字： {{showDetailData.zhName}}
                </mu-list-item>
                <mu-list-item>
                   内容标志英文名字： {{showDetailData.enName}}
                </mu-list-item>
                <mu-list-item>
                   类型： {{showDetailData.contentType}}
                </mu-list-item>
               
            </mu-list>
            <mu-flat-button slot="actions" @click="isShowDetail = false" primary label="确定" />
        </mu-dialog>
        <div class="add-sign-btn">
            <mu-raised-button @click="addSign" :label="'添加'+state.name" primary />
        </div>
        <Table v-if="isMobile" class="station-table" border :columns="columnsMobile" :data="signList.content"></Table>
        <Table v-else class="station-table" border :columns="columns" :data="signList.content"></Table>
        <mu-pagination class="stationPage" :total="signList.totalElements" :current="signList.number + 1" @pageChange="pageChange"></mu-pagination>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import dialog from '@/components/templates/AddEditDel_Dialog.vue'
import './sign.sass'
export default {
    data () {
        return {
            open: {
                isAdd: false,
                isEdit: false,
                isRemove: false
            },
            fun: {
                addClick: this.addSignClick,
                editClick: this.editSignClick,
                removeClick: this.removeSignClick
            },
            state: {
                zhName: '', // 内容标志中文名字
                enName: '', // 内容标志英文名字
                type: '1', // 内容标志类型 （1：文本；2：图片；3：链接）
                id: '', // 内容标志id
                name: '内容标志',
                radiosArr: JSON.stringify([
                    {name: '文本', value: '1'},
                    {name: '图片', value: '2'},
                    {name: '链接', value: '3'}
                ]),
                inputArr: JSON.stringify([
                    {name: '中文名字', value: 'zhName'},
                    {name: '英文名字', value: 'enName'}
                ])
            },
            isShowDetail: false,
            showDetailData: {},
            columns: [{
                        title: "创建时间",
                        key: "createTime"
                    },
                    {
                        title: "内容标志名称",
                        key: "zhName"
                    },
                    {
                        title: "内容标志英文名称",
                        key: "enName"
                    },
                    {
                        title: "类型",
                        key: "contentType"
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button", {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            margin: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.editSign(params.row)
                                            }
                                        }
                                    },
                                    "修改"
                                ),
                                h(
                                    "Button", {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.removeSign(params.row)
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ])
                        }
                    }
                ],
                columnsMobile: [
                    {
                        title: "内容标志名称",
                        key: "zhName"
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button", {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            margin: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.editSign(params.row)
                                            }
                                        }
                                    },
                                    "修改"
                                ),
                                h(
                                    "Button", {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        style: {
                                            margin: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.removeSign(params.row)
                                            }
                                        }
                                    },
                                    "删除"
                                ),
                                h(
                                    "Button", {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.showDetail(params.row)
                                            }
                                        }
                                    },
                                    "详情"
                                )
                            ])
                        }
                    }
                ]
        }
    },
    computed: mapGetters({
        signList: 'signList',
        isMobile: 'isMobile'
    }),
    created () {
        this.getSignList(0, 10)
    },
    methods: {
        onInputChange (res) {
            this.state = res
        },
        getSignList (page, size) {
            this.$store.dispatch('getSignList', {page: page, size: size})
        },
        addSign () {
            this.open.isAdd = true
        },
        addSignClick () {
            this.$store.dispatch('addSignClick', this.state).then((res) => {
                if (res.success) {
                    this.open.isAdd = false
                    this.$Message.success('添加成功')
                    this.getSignList(this.signList.number, 10)
                } else {
                    this.open.isAdd = false
                    this.$Message.error('添加失败')
                }
            }, (error) => {
                this.open.isAdd = false
                this.$Message.error('添加失败')
                throw new Error(error)
            })
        },
        editSign: function (row) {
            console.log(row)
            this.open.isEdit = true
            this.state.zhName = row.zhName
            this.state.enName = row.enName
            this.state.type = row.contentType.toString()
            this.state.id = row.id
        },
        editSignClick () {
            this.$store.dispatch('editSignClick', this.state).then(res => {
                if (res.success) {
                    this.open.isEdit = false
                    this.$Message.success('修改成功')
                    this.getSignList(this.signList.number, 10)
                } else {
                    this.open.isEdit = false
                    this.$Message.error('修改失败')
                }
            }, error => {
                this.open.isEdit = false
                this.$Message.error('修改失败')
                throw new Error(error)
            })
        },
        removeSign (params) {
            this.state.zhName = params.zhName
            this.open.isRemove = true
            this.state.id = params.id
        },
        removeSignClick () {
            this.$store.dispatch('removeSignClick', this.state).then(res => {
                if (res.success) {
                    this.open.isRemove = false
                    this.$Message.success('删除成功')
                    this.getSignList(this.signList.number, 10)
                } else {
                    this.open.isRemove = false
                    this.$Message.error('删除失败')
                }
            }, error => {
                this.open.isRemove = false
                this.$Message.error('删除失败')
                throw new Error(error)
            })
        },
        pageChange (pageNumber) { // 点击页数 改变当前页数
            this.getSignList(pageNumber - 1, 10)
        },
        // 显示详情
        showDetail (row) {
            this.isShowDetail = true
            this.showDetailData = row
        }
    },
    components: {
        'dia-log': dialog
    }
}
</script>
