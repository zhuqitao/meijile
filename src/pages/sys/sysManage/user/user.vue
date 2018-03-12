<template>
    <div class="menuManage">
        <!-- 移动端查看详情 -->
        <mu-dialog v-if="isShowDetail" :open="isShowDetail" title="详情" @close="isShowDetail = false" bodyClass="role-dia-log">
            <mu-list>
                <mu-list-item>
                   姓名： {{showDetailData.username}}
                </mu-list-item>
                <mu-list-item>
                   角色： {{showDetailData.roles[0].roleName}}
                </mu-list-item>
                <mu-list-item>
                   电话： {{showDetailData.mobile}}
                </mu-list-item>
                <mu-list-item>
                   密码： {{showDetailData.password}}
                </mu-list-item>
                <mu-list-item>
                   创建时间： {{showDetailData.createTime}}
                </mu-list-item>
            </mu-list>
            <mu-flat-button slot="actions" @click="isShowDetail = false" primary label="取消" />
            <mu-flat-button slot="actions" @click="editUserRole" primary label="确定" />
        </mu-dialog>
        <mu-dialog :open="openRole" title="分配角色" @close="openRole = false" bodyClass="role-dia-log">
            <mu-list>
                <mu-list-item v-for="item in roleList.content" :key="item.roleId" :title="item.remark">
                    <mu-radio :value="roleId" :nativeValue="item.roleId" name="roleId" class="demo-radio" @change="changeRadio(item.roleId)" slot="left"/>
                </mu-list-item>
            </mu-list>
            <mu-flat-button slot="actions" @click="openRole = false" primary label="取消" />
            <mu-flat-button slot="actions" @click="editUserRole" primary label="确定" />
        </mu-dialog>
        <Table v-if="isMobile" class="station-table" border :columns="columnsMobile" :data="userList.content"></Table>
        <Table v-else class="station-table" border :columns="columns" :data="userList.content"></Table>
        <mu-pagination class="stationPage" :total="userList.totalElements" :current="userList.number + 1" @pageChange="pageChange"></mu-pagination>
    </div>
</template>
<script>
    import dialog from '@/components/templates/AddEditDel_Dialog.vue'
    import "./user.sass"
    import {
        mapGetters
    } from 'vuex'
    export default {
        data () {
            return {
                aaa: true,
                openRole: false,      // 修改角色
                isShowDetail: false,  // 打开详情
                showDetailData: {},       // 详情数据
                roleId: '',
                userId: '',
                columns: [{
                        title: '名字',
                        key: 'username'
                    },
                    {
                        title: '角色',
                        key: 'roles',
                        render: (h, params) => {
                            return h(
                                "div", {
                                    //
                                },
                                params.row.roles[0].roleName
                            )
                        }
                    },
                    {
                        title: '手机',
                        key: 'mobile'
                    },
                    {
                        title: '密码',
                        key: 'password'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
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
                                                this.editRole(params.row)
                                            }
                                        }
                                    },
                                    "修改角色"
                                ),
                                h(
                                    "Button", {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        }
                                        // on: {
                                        //     click: () => {
                                        //         this.removeRole(params.row)
                                        //     }
                                        // }
                                    },
                                    "删除"
                                )
                            ])
                        }
                    }
                ],
                columnsMobile: [{
                        title: '名字',
                        key: 'username'
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: "70%",
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
                                                this.editRole(params.row)
                                            }
                                        }
                                    },
                                    "修改角色"
                                ),
                                h(
                                    "Button", {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px"
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
        computed: {
            ...mapGetters({
                userList: 'userList',
                roleList: 'roleList',
                isMobile: "isMobile"
            })
        },
        created () {
            this.getUserList(0, 10)
            this.getRoleList(0, 10)
        },
        methods: {
            getUserList (page, size) {
                this.$store.dispatch('getUserList', {page: page, size: size})
            },
            getRoleList (page, size) {
                this.$store.dispatch('getRoleList', {
                    page: page,
                    size: size
                })
            },
            editRole (params) {
                this.openRole = true
                this.userId = params.userId + ''
                this.roleId = params.roles[0].roleId + ''
            },
            editUserRole () {
                this.openRole = false
                this.$store.dispatch('editUserRole', {
                    roleId: this.roleId,
                    userId: this.userId
                }).then(res => {
                    if (res.success) {
                        this.$Message.success('修改成功')
                        this.getUserList(this.userList.number, 10)
                    } else {
                        this.$Message.error('修改失败')
                    }
                })
            },
            changeRadio (roleId) {
                this.roleId = roleId
            },
            pageChange: function (pageNumber) {
                this.$store.dispatch('getUserList', {
                    page: pageNumber - 1,
                    size: 10
                })
            },
            // 查看详情
            showDetail (row) {
                this.isShowDetail = true
                this.showDetailData = row
            }
        },
        mounted () {
            // console.log(this.$refs.tree.getCheckedNodes())
        },
        components: {
            'dia-log': dialog
        }
    }
</script>
