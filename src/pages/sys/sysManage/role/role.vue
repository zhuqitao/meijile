<template>
    <div class="roleManage">
        <dia-log :open="open" :data="state" :cb="fun" @onInputChange="onInputChange"></dia-log>
        <!-- <Modal v-model="openPower" title="选择权限菜单" @on-ok="saveSysMenu">
                <Tree :data="sysMenuList" show-checkbox ref="tree"></Tree>
            </Modal> -->
        <mu-dialog :open="openPower" title="用户权限" toggleNested @close="openPower = false" bodyClass="power-dia-log">
            <mu-list>
                <mu-list-item v-for="item in sysMenuList" :key="item.menuId" :title="item.name" toggleNested>
                    <mu-checkbox class="demo-checkbox" name="checkedMenuIds" :value="item.flag" @change="changeCheck(item.menuId)" slot="left" />
                    <mu-list-item slot="nested" v-for="childItem in item.subMenus" :key="childItem.menuId" :title="childItem.name">
                        <mu-checkbox class="demo-checkbox" name="checkedMenuIds" :nativeValue="childItem.menuId" :value="childItem.flag" @change="changeCheck(childItem.menuId)" slot="left"/>
                    </mu-list-item>
                </mu-list-item>
            </mu-list>
            <mu-flat-button slot="actions" @click="openPower = false" primary label="取消" />
            <mu-flat-button slot="actions" @click="saveSysMenu" primary label="确定" />
        </mu-dialog>
        <div class="add-role-btn">
            <mu-raised-button  @click="addRole" label="添加角色" primary />
        </div>
        <Table class="station-table" border :columns="columns" :data="roleList.content"></Table>
        <!-- <mu-pagination class="stationPage" :total="stationList.totalElements" :current="stationList.number + 1" @pageChange="pageChange"></mu-pagination> -->
    </div>
</template>
<script>
    import dialog from '@/components/templates/AddEditDel_Dialog.vue'
    import "./role.sass"
    import {
        mapGetters
    } from 'vuex'
    export default {
        data () {
            return {
                openPower: false,
                roleId: '',
                open: {
                    isAdd: false,
                    isEdit: false,
                    isRemove: false
                },
                fun: {
                    addClick: this.addRoleClick,
                    editClick: this.editRoleClick,
                    removeClick: this.removeRoleClick
                },
                state: {
                    zhName: '', // 菜单中文名字
                    id: '0', // 父菜单的id  如果添加主菜单  则：id=0
                    name: '角色',
                    radiosArr: JSON.stringify([]),
                    inputArr: JSON.stringify([{
                        name: '名字',
                        value: 'zhName'
                    }])
                },
                columns: [{
                        title: '名字',
                        key: 'roleName'
                    },
                    {
                        title: '类型',
                        key: 'remark'
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
                                    "修改"
                                ),
                                h(
                                    "Button", {
                                        props: {
                                            type: "success",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.powerManage(params.row)
                                            }
                                        }
                                    },
                                    "权限管理"
                                ),
                                h(
                                    "Button", {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.removeRole(params.row)
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ])
                        }
                    }
                ]
            }
        },
        computed: {
            ...mapGetters({
                roleList: 'roleList',
                sysMenuList: 'sysMenuList',
                checkedMenuIds: 'checkedMenuIds'
            })
        },
        created () {
            this.getRoleList(0, 10)
            // this.getMenuByRole(1)
        },
        methods: {
            getRoleList (page, size) {
                this.$store.dispatch('getRoleList', {
                    page: page,
                    size: size
                })
            },
            getMenuByRole (roleId) {
                this.$store.dispatch('getMenuByRole', roleId)
            },
            saveSysMenu () {
                this.openPower = false
                this.$store.dispatch('updateRole', {
                    roleId: this.roleId,
                    menuIds: this.checkedMenuIds.join(',')
                }).then(res => {
                    this.openPower = false
                    if (res.success) {
                        this.$Message.success('保存成功')
                        this.getMenuByRole(this.roleId)
                    } else {
                        this.$Message.error('保存失败')
                    }
                })
            },
            powerManage (params) {
                this.openPower = true
                this.roleId = params.roleId
                this.getMenuByRole(params.roleId)
            },
            changeCheck (menuId) {
                this.$store.dispatch('checkChange', menuId)
            },
            addRole () {
                this.open.isAdd = true
            },
            addRoleClick () {
                this.$store.dispatch('addRoleClick', this.state.zhName).then(res => {
                    this.open.isAdd = false
                    if (res.success) {
                        this.$Message.success('添加成功')
                        this.getRoleList(this.roleList.number, 10)
                    } else {
                        this.$Message.error('添加失败')
                    }
                })
            },
            editRole  (row) {
                this.open.isEdit = true
                this.state.zhName = row.roleName
                this.state.id = row.roleId
            },
            editRoleClick () {
                this.$store.dispatch('editRoleClick', this.state).then(res => {
                    this.open.isEdit = false
                    if (res.success) {
                        this.$Message.success('修改成功')
                        this.getRoleList(this.roleList.number, 10)
                    } else {
                        this.$Message.error('修改失败')
                    }
                })
            },
            removeRole (row) {
                this.open.isRemove = true
                this.state.zhName = row.roleName
                this.state.id = row.roleId
            },
            removeRoleClick () {
                this.$store.dispatch('removeRoleClick', this.state).then(res => {
                    this.open.isRemove = false
                    if (res.success) {
                        this.$Message.success('删除成功')
                        this.getRoleList(this.roleList.number, 10)
                    } else {
                        this.$Message.error('删除失败')
                    }
                })
            },
            onInputChange (res) {
                this.state = res
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
