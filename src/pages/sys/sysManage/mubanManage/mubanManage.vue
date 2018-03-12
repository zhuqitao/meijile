<template>
    <div class="mubanManage" style="margin: 10px">
        <dia-log :open="open" :data="state" :cb="fun" @onInputChange="onInputChange"></dia-log>


        <!-- editMuban -->
        <mu-dialog :open="openEditMuban" title="Dialog" @close="openEditMuban=false">
            <mu-text-field label="模板标题" v-model="edit.mubanTitle" labelFloat fullWidth/>
            <mu-text-field label="模板介绍" v-model="edit.mubanInfo" labelFloat fullWidth/>
            <mu-text-field label="访问地址" v-model="edit.mubanLinkurl" labelFloat fullWidth/>
            <mu-radio label="个人" name="type" nativeValue="1" v-model="edit.mubanType"/>
            <mu-radio label="企业" name="type" nativeValue="2" v-model="edit.mubanType"/>
            <mu-radio label="其他" name="type" nativeValue="3" v-model="edit.mubanType"/>
            <mu-flat-button slot="actions" @click="openEditMuban=false" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="editMubanClick" label="确定"/>
        </mu-dialog>

        <!-- 添加模板 -->
        <mu-dialog :open="openAddMuban" title="Dialog" @close="openAddMuban=false">
            <mu-text-field label="模板名字" v-model="add.mubanTitle" labelFloat fullWidth/>
            <mu-text-field label="模板介绍" v-model="add.mubanInfo" labelFloat fullWidth/>
            <mu-text-field label="模板前缀" v-model="add.mubanLinkurl" labelFloat fullWidth/>
            <mu-radio label="个人" name="type" nativeValue="1" v-model="add.mubanType"/>
            <mu-radio label="企业" name="type" nativeValue="2" v-model="add.mubanType"/>
            <mu-radio label="其他" name="type" nativeValue="3" v-model="add.mubanType"/>
            <input type="file" ref="avatarInputAdd">
            <mu-flat-button slot="actions" @click="openAddMuban=false" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="addMubanClick" label="确定"/>
        </mu-dialog>
        <mu-dialog :open="openEditPic" title="Dialog" @close="openEditPic=false">
            <div>
                <div class="avatarImg" @mouseover="avatarDisable=true" @mouseout="avatarDisable=false" @click="setAvatar">
                    <img class="avatarImg" :src="avatar" />
                    <span v-show="avatarDisable">更改</span>
                </div>
            </div>
            <input type="file" ref="avatarInput" @change="changeImage($event)" hidden>
            <mu-flat-button slot="actions" @click="openEditPic=false" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="editPicClick" label="确定"/>
        </mu-dialog>
        <mu-dialog :open="openState" title="Dialog" @close="openState=false">
            <mu-radio label="开启" name="group" nativeValue="1" v-model="mubanState"/>
            <mu-radio label="关闭" name="group" nativeValue="2" v-model="mubanState"/>
            <mu-flat-button slot="actions" @click="openState=false" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="editStateClick" label="确定"/>
        </mu-dialog>
        <div class="add-muban-btn">
            <mu-raised-button @click="addMuban" :label="'添加'+state.name" primary />
        </div>
        <Table class="station-table" border :columns="columns" :data="mubanList.content"></Table>
        <mu-pagination class="stationPage" :total="mubanList.totalElements" :current="mubanList.number + 1" @pageChange="pageChange"></mu-pagination>
    </div>
</template>
<script>
    import Vue from "vue"
    import axios from 'axios'
    import "./mubanManage.sass"
    import dialog from '@/components/templates/AddEditDel_Dialog.vue'
    import {
        mapGetters
    } from "vuex"
    const querystring = require('querystring')
    
    export default {
        data () {
            return {
                open: {
                    isAdd: false,
                    isEdit: false,
                    isRemove: false
                },
                fun: {
                    addClick: this.addMubanClick,
                    editClick: this.editMubanClick,
                    removeClick: this.removeMubanClick
                },
                state: {
                    title: '', // 模板标题
                    info: '', // 模板介绍
                    linkUrlstr: '', // 模板预览地址
                    type: '1', // 添加或修改模板的类型 1：个人 2：企业 3：销售
                    id: '', // 模板id
                    name: '模板',
                    radiosArr: JSON.stringify([
                        {name: '个人', value: '1'},
                        {name: '企业', value: '2'},
                        {name: '销售', value: '3'}
                    ]),
                    inputArr: JSON.stringify([
                        {name: '模板标题', value: 'title'},
                        {name: '模板介绍', value: 'info'},
                        {name: '访问地址', value: 'url'}
                    ])
                },
                openEditMuban: false,
                openEditPic: false,
                openState: false,
                openAddMuban: false,
                mubanId: '',
                mubanState: '',
                add: {
                    mubanTitle: '',
                    mubanInfo: '',
                    mubanLinkurl: '',
                    mubanType: ''
                },
                edit: {
                    mubanId: '',
                    mubanTitle: '',
                    mubanInfo: '',
                    mubanLinkurl: '',
                    mubanType: ''
                },
                avatar: '/static/logo.png',
                uploadData: {id: '2'},
                avatarDisable: false,
                columns: [{
                        title: "创建时间",
                        key: "createTime"
                    },
                    {
                        title: "模板标题",
                        key: "title"
                    },
                    {
                        title: "模板介绍",
                        key: "info"
                    },
                    {
                        title: "链接",
                        key: "linkUrlstr"
                    },
                    {
                        title: "类型",
                        key: "type"
                    },
                    {
                        title: "开启状态",
                        key: "status"
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width: 300,
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
                                                this.editMuban(params.row)
                                            }
                                        }
                                    },
                                    "修改"
                                ),
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
                                                this.editPic(params.row)
                                            }
                                        }
                                    },
                                    "修改图片"
                                ),
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
                                                this.editState(params.row)
                                            }
                                        }
                                    },
                                    "修改状态"
                                ),
                                h(
                                    "Button", {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.removeMuban(params.row)
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ])
                        }
                    }
                ]
                // stationData: this.stationList
            }
        },
        computed: mapGetters({
            mubanList: "mubanList" // 站点数据 包括站点列表和分页信息
        }),
        created () {
            this.getMubanList(0, 10)
        },
        methods: {
            onInputChange (res) {
                this.state = res
            },
            getMubanList (page, size) { // 获取站点数据
                this.$store.dispatch("getMubanList", {
                    page: page,
                    size: size
                })
            },
            addMuban () {
                this.openAddMuban = true
            },
            addMubanClick () { // 添加模板
                var image = new FormData()
                image.append('title', this.add.mubanTitle)
                image.append('info', this.add.mubanInfo)
                image.append('linkurl', this.add.mubanLinkurl)
                image.append('type', this.add.mubanType)
                image.append('file', this.$refs.avatarInputAdd.files[0])
                this.$store.dispatch("addMubanClick", image).then((res) => {
                    this.openAddMuban = false
                    if (res.success) {
                        this.$Message.success("添加成功")
                        this.getMubanList(this.mubanList.number, 10)
                    } else {
                        this.$Message.error('添加失败')
                    }
                })
            },
            editMuban (row) {
                this.openEditMuban = true
                this.edit.mubanTitle = row.title
                this.edit.mubanInfo = row.info
                this.edit.mubanLinkurl = row.linkurl
                this.edit.mubanType = row.type + ''
                this.edit.mubanId = row.id
            },
            editMubanClick () {
                this.$store.dispatch("editMubanClick", this.edit).then((res) => {
                    this.openEditMuban = false
                    if (res.success) {
                        this.$Message.success("修改成功")
                        this.getMubanList(this.mubanList.number, 10)
                    } else {
                        this.$Message.error('修改失败')
                    }
                })
            },
            editPic (row) {
                console.log(row)
                this.mubanId = row.id
                this.openEditPic = true
            },
            setAvatar () {
                this.$refs.avatarInput.click()
            },
            changeImage (e) {
                var file = e.target.files[0]
                var reader = new FileReader()
                var that = this
                reader.readAsDataURL(file)
                reader.onload = function (e) {
                    that.avatar = this.result
                }
            },
            editPicClick () {
                // 修改了头像
                if (this.$refs.avatarInput.files.length !== 0) {
                    var image = new FormData()
                    image.append('id', this.mubanId)
                    image.append('file', this.$refs.avatarInput.files[0])
                    this.$store.dispatch('uploadMubanPic', image).then(res => {
                        this.openEditPic = false
                        if (res.success) {
                            this.$Message.success('上传成功')
                        } else {
                            this.$Message.error('上传失败')
                        }
                    })
                }
            },
            editState (row) {
                this.mubanId = row.id
                this.mubanState = row.status + ''
                this.openState = true
            },
            editStateClick () {
                this.$store.dispatch('editStateClick', {
                    id: this.mubanId,
                    status: this.mubanState
                }).then(res => {
                    this.openState = false
                    if (res.success) {
                        this.$Message.success('修改成功')
                        this.getMubanList(this.mubanList.number, 10)
                    } else {
                        this.$Message.error('修改失败')
                    }
                })
            },
            removeMuban (params) {
                this.state.id = params.id
                this.state.zhName = params.zhName
                this.open.isRemove = true
            },
            removeMubanClick () {
                this.$store.dispatch("removeMubanClick", this.state).then((res) => {
                    this.open.isRemove = false
                    if (res.success) {
                        this.$Message.success('删除成功')
                        this.getMubanList(this.mubanList.number, 10)
                    } else {
                        this.$Messsage.error('删除失败')
                    }
                })
            },
            pageChange (pageNumber) { // 点击页数 改变当前页数
                this.getMubanList(pageNumber - 1, 10)
            }
        },
        components: {
            'dia-log': dialog
        }
    }
</script>
