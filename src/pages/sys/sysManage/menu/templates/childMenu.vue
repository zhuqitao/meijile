<template>
    <div class="child-menu">
        <dia-log :open="open" :data="state" :cb="fun" @onInputChange="onInputChange"></dia-log>

        <mu-dialog v-if="open.isShowDetail" :open="open.isShowDetail" title="详情" @close="open.isShowDetail = false" bodyClass="role-dia-log">
            <mu-list>
                <mu-list-item>
                   菜单名字： {{showDetailData.name}}
                </mu-list-item>
                <mu-list-item>
                   菜单类型： {{showDetailData.type}}
                </mu-list-item>
                <mu-list-item>
                   颜色： {{showDetailData.colour}}
                </mu-list-item>
                <mu-list-item>
                   图标： {{showDetailData.icon}}
                </mu-list-item>
                
            </mu-list>
            <mu-flat-button slot="actions" @click="open.isShowDetail = false" primary label="确定" />
        </mu-dialog>
        <Table v-if="isMobile" border :columns="columnsMobile" :data="allChildMenuList"></Table>
        <Table v-else border :columns="columns" :data="allChildMenuList"></Table>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import dialog from '@/components/templates/AddEditDel_Dialog.vue'
export default {
    data () {
        return {
            // menuList: typeof (this.childMenu) === 'string' ? JSON.parse(this.childMenu) : this.childMenu,
            open: {
                isAdd: false,
                isEdit: false,
                isRemove: false,
                isShowDetail: false
            },
            fun: {
                editClick: this.editChildMenuClick,
                removeClick: this.removeChildMenuClick
            },
            showDetailData: {}, // 移动端详情数据
            state: {
                zhName: '', // 菜单中文名字
                url: '', // 菜单链接
                icon: '', // 菜单图标
                orderNum: '', // 菜单序号
                colour: '', // 菜单颜色
                type: '', // 菜单类型 （ 0：目录 1：菜单 2：按钮）
                id: '0', // 父菜单的id  如果添加主菜单  则：id=0
                name: '菜单',
                radiosArr: JSON.stringify([
                    {name: '目录', value: '0'},
                    {name: '菜单', value: '1'}
                ]),
                inputArr: JSON.stringify([
                    {name: '名字', value: 'zhName'},
                    {name: '链接', value: 'url'},
                    {name: '图标', value: 'icon'},
                    {name: '排序序号', value: 'orderNum'},
                    {name: '菜单颜色', value: 'colour'}
                ])
            },
            columns: [
                {
                    title: '',
                    width: 50
                },
                {
                    title: '名字',
                    key: 'name'
                },
                {
                    title: '类型',
                    key: 'type'
                },
                {
                    title: '颜色',
                    key: 'colour'
                },
                {
                    title: '图标',
                    key: 'icon'
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
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.editChildMenu(params.row)
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
                                            this.removeChildMenu(params.row)
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
                    title: '',
                    width: 50
                },
                {
                    title: '名字',
                    key: 'name'
                },
                {
                    title: "操作",
                    key: "action",
                    width: "60%",
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
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.editChildMenu(params.row)
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
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.removeChildMenu(params.row)
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
                                    style: {
                                        marginRight: "5px"
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
    props: ['parentId'],
    // props: {
    //     childMenu: [String],
    //     id: []
    // },
    computed: mapGetters({
        allChildMenuList: 'allChildMenuList',
        isMobile: "isMobile"
    }),
    created () {
        // console.log(this.childMenu)
    },
    methods: {
        getAllChildMenuList (parentId) {
            this.$store.dispatch('getAllChildMenuList', parentId)
        },
        editChildMenu (row) {
            this.open.isEdit = true
            this.state.zhName = row.name
            this.state.url = row.url
            this.state.type = row.type + ''
            this.state.icon = row.icon
            this.state.orderNum = row.orderNum
            this.state.colour = row.colour
            this.state.id = row.menuId
        },
        editChildMenuClick () {
            this.$store.dispatch('editMenuClick', this.state).then(res => {
                this.open.isEdit = false
                if (res.success) {
                    this.$Message.success('修改成功')
                    this.getAllChildMenuList(this.parentId)
                } else {
                    this.$Message.error('删除失败')
                }
            })
        },
        removeChildMenu (row) {
            this.open.isRemove = true
            this.state.zhName = row.name
            this.state.id = row.menuId
        },
        removeChildMenuClick () {
            this.$store.dispatch('removeMenuClick', this.state).then(res => {
                this.open.isRemove = false
                if (res.success) {
                    this.$Message.success('删除成功')
                    this.getAllChildMenuList(this.parentId)
                } else {
                    this.$Message.error('删除失败')
                }
            })
        },
        onInputChange (res) {
            this.state = res
        },
        // 显示详情
        showDetail (row) {
            this.open.isShowDetail = true
            this.showDetailData = row
        }
    },
    components: {
        'dia-log': dialog
    }
}
</script>

