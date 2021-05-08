<template>
    <div class="userMsg">
        <div class="main">
            <div class="search">
                <el-form :inline="true" @submit.native.prevent class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="请输入用户名" size="small" v-model.trim="username" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click.native="search()">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="uid" label="用户编号">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                </el-table-column>
<!--                <el-table-column prop="password" label="密码">-->
<!--                </el-table-column>-->
                <el-table-column prop="roleType" label="角色">
                    <template slot-scope="scope">
                        <span v-show="scope.row.roleType==1001">管理员</span>
                        <span v-show="scope.row.roleType==2001">员工</span>
                        <span v-show="scope.row.roleType==3001">顾客</span>
                    </template>
                </el-table-column>
                <el-table-column prop="telephone" label="电话">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" :formatter="timeFormatter">
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click.native="editUser(scope.row)" size="mini">修改</el-button>
                        <el-button type="text" icon="el-icon-delete" @click.native="delUser(scope.row)" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count" v-show="count>0">
                </el-pagination>
            </div>
            <!-- 弹框 -->
            <el-dialog width="600px" title="修改权限" lable-width="100px" :visible.sync="createView" class='domain_dialog' :close-on-click-modal="false">
                <el-form :model="create" ref="create" label-width="100px" :rules="rules" @submit.native.prevent>
                    <el-form-item label="姓名:" prop="name">
                        <el-input v-model="create.name" placeholder="请输入用户名" clearable disabled></el-input>
                    </el-form-item>
                              <el-form-item label="角色:" prop="roleType">
                    <el-radio-group v-model="create.roleType">
                        <el-radio :label="1001">管理员</el-radio>
                        <el-radio :label="2001">员工</el-radio>
                        <el-radio :label="3001">顾客</el-radio>
                    </el-radio-group>
                </el-form-item>
                    <el-form-item label="电话:" prop="telephone">
                        <el-input v-model="create.telephone" placeholder="请输入电话" clearable disabled></el-input>
<!--                    </el-form-item>-->
<!--                        <el-form-item label="修改密码:" prop="password">-->
<!--                        <el-input v-model="create.password" placeholder="请输入修改密码" clearable></el-input>-->
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click.native="editSave('create')">保 存</el-button>
                    <el-button @click.native="cancel('create')">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import appConfig from '@/util/appConfig';
    const api = appConfig.getDataUrl();
    import moment from 'moment';
    export default {
        data() {
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入手机号'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return {
                tableData: [],
                pageSize: 10,
                page: 10,
                currentPage: 1,
                username: '',
                count: 0,
                createView: false,
                create: {
                    name: '',
                    telephone: '',
                    password: '',
                    roleType: ''
                },
                token: '',
                rules:{
                    telephone: [
                        {
                            required: true,
                            message: '请输入手机号',
                            trigger: 'blur'
                        },
                        { validator: checkPhone, trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            this.token = localStorage.getItem('token');
            this.getData();
        },
        methods: {
            getData() {
                axios
                    .get(
                        `${api}/store/user/getByUsername?username=${
                            this.username
                        }&index=${this.currentPage}&size=${this.pageSize}`,
                        {
                            headers: {
                                //头部参数
                                Authorization: this.token
                            }
                        }
                    )
                    .then((res) => {
                        if (res.data.code == 20000) {
                            this.count = res.data.data.count;
                            this.tableData = res.data.data.list;
                        } else if (res.data.code == 40001) {
                            this.$message({
                                message: '登录超时,返回登录页面',
                                type: 'warning'
                            });
                            // localStorage.clear();
                            this.$router.push({
                                path: '/login'
                            });
                        }
                    });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            search() {
                this.getData();
            },
            timeFormatter(row){
                return moment(row.createTime).format('YYYY-MM-DD HH:mm:ss');
            },
            cancel(formName){
                this.$refs[formName].resetFields();
                this.createView = false;
            },
            editUser(row) {
                this.create = JSON.parse(JSON.stringify(row));
                this.createView = true;
            },
            editSave() {
                let param = new FormData();
                //遍历声明的data
                //这里的key就是id
                let dataList = JSON.parse(JSON.stringify(this.create));
                for (let key in dataList) {
                    //append()方法，可以把键值key放到FormData对象里面去
                    param.append(key, dataList[key]);
                }
                axios
                    .patch(`${api}/store/user/info/admin`, param, {
                        headers: {
                            //头部参数
                            Authorization: this.token
                        }
                    })
                    .then((res) => {
                        if (res.data.code == 20000) {
                            this.createView = false;
                            this.currentPage = 1;
                            this.pageSize10;
                            this.getData();
                            this.create = {};
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
            },
            delUser(val) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        let param = new FormData();
                        //遍历声明的data
                        //这里的key就是id
                        val.isDelete = true;
                        for (let key in val) {
                            //append()方法，可以把键值key放到FormData对象里面去
                            param.append(key, val[key]);
                        }
                        axios
                            .patch(`${api}/store/user/info/admin`, param, {
                                headers: {
                                    //头部参数
                                    Authorization: this.token
                                }
                            })
                            .then((res) => {
                                if (res.data.code == 20000) {
                                    this.currentPage = 1;
                                    this.pageSize = 10;
                                    this.getData();
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    });
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            }
        }
    };
</script>

<style lang="less">
    .userMsg {
        .el-form-item__content {
            text-align: left;
        }
        .el-select {
            display: block;
        }
    }
</style>
