<template>
  <div class="commodity_management">
    <div class="main" v-show="this.role==1001||this.role==2001">
        <div class="search">
        <!--@submit.native.prevent提交后不刷新页面-->
        <el-form :inline="true" @submit.native.prevent class="demo-form-inline">
          <el-form-item>
          <el-input placeholder="请输入商品名称" size="small" v-model.trim="name" clearable></el-input>
          </el-form-item>
          <el-select v-model="selectoptions" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.value"
                size="mini"
            >
            </el-option>
          </el-select>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click.native="search()">搜索</el-button>
          </el-form-item>

          <div class="add">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click.native="addComm()">新增</el-button>
          </div>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="pid" label="商品编号">
        </el-table-column>
        <el-table-column prop="name" label="商品名称">
        </el-table-column>
        <el-table-column prop="imageUrlList" label="商品图片">
          <template slot-scope="scope">
            <div style="display: inline-block;margin-right:5px;" v-for="(item,index) in scope.row.imageUrlList" :key="index">
              <img :src="item.url" alt="" width="40px">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品价格">
        </el-table-column>
        <el-table-column prop="stock" label="商品库存">
        </el-table-column>
        <el-table-column prop="limitBuy" label="限购数量">
        </el-table-column>
        <el-table-column prop="introduction" label="商品描述">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click.native="editCom(scope.row)" size="mini">修改</el-button>
            <el-button type="text" icon="el-icon-delete" @click.native="delCom(scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[12, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count" v-show="count>0">
        </el-pagination>
      </div>
      <!-- 弹框 -->
      <el-dialog min-width="600px" :title="titleMap[dialogStatus]" :visible.sync="createView" class='domain_dialog' :close-on-click-modal="false">
        <el-form :model="create" ref="create" label-width="100px" @submit.native.prevent :rules="rules">
          <el-form-item label="商品名称:" prop="name">
            <el-input v-model="create.name" placeholder="请输入商品名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品图片:">
            <el-upload name="imageList" :limit="6" class="upload-demo" :action="uploadImgUrl" :on-exceed="handleExceed" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleUploadSuccess" :before-remove="beforeRemove" multiple :file-list="fileList" :headers="headers">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品价格:" prop="price">
            <el-input v-model.number="create.price" placeholder="请输入商品价格" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品库存:" prop="stock">
            <el-input v-model.number="create.stock" placeholder="请输入商品库存" clearable></el-input>
          </el-form-item>
          <el-form-item label="限购数量:" prop="limitBuy">
            <el-input v-model.number="create.limitBuy" placeholder="请输入限制数量" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="create.introduction" placeholder="请输入商品描述"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="editSave('create')" v-if="this.dialogStatus == 'edit'">保 存</el-button>
          <el-button type="primary" @click.native="addSave('create')" v-else>保 存</el-button>
          <el-button @click.native="cancel('create')">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="main" v-show="this.role==3001">
      <div class="search">
        <el-form :inline="true" @submit.native.prevent class="demo-form-inline">
          <el-form-item>
            <el-input placeholder="请输入商品名称" size="small" @keyup.enter.native="searchEnterFun" v-model.trim="name" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click.native="search()">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="dataInfo">
        <div class="datalist">
          <ul class="list">
            <li v-for="(item,index) in tableData" :key="index" class="list_li">
              <div>
                <div style="text-align: left;margin-bottom: 30px;height: calc(100vh - 700px);">
                  <div style="display: inline-block;vertical-align: top; width:200px" class="block">
                    <el-image v-show="item.imageUrlList.length==0">
                      <div slot="error" class="image-slot">
                        <span>暂无图片</span>
                      </div>
                    </el-image>
                    <el-carousel :interval="5000" arrow="always" loop v-if="item.imageUrlList.length>1">
                      <el-carousel-item v-for="(data,index) in item.imageUrlList" :key="index">
                        <img :src="data.url" alt="">
                      </el-carousel-item>
                    </el-carousel>
                    <div v-else v-for="(data,index) in item.imageUrlList" :key="index">
                      <img :src="data.url" alt="">
                    </div>
                  </div>
                  <div class="info">
                    <div style="font-weight:600;overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;">{{item.name}}</div>
                    <div>价格：{{item.price}}</div>
                    <div v-if="item.stock>0">库存：{{item.stock}}</div>
                    <div v-else>库存：已售空</div>
                    <div>限购：{{item.limitBuy}}</div>
                  </div>
                </div>
                <div class="desc">
                  <span style="font-weight:600">商品描述:</span>
                  <div style="margin-top:10px;font-size:14px;"> {{item.introduction}}</div>
                </div>
                <div style="text-align: center">
                  <div style="margin-bottom: 20px;">
                    <el-input-number size="mini" v-model="num[index]" @change="handleChange(item,$event)" :min="1" :max="item.limitBuy" label="描述文字"></el-input-number>
                  </div>
                  <el-button type="primary" @click="buy(item,index)" size="small"  v-if="item.stock>0">购买</el-button>
                  <el-button type="primary" @click="buy(item,index)" size="small" v-else disabled>购买</el-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <el-dialog width="400px" lable-width="90px" title="购买商品" :visible.sync="createViews" class='domain_dialog' :close-on-click-modal="false">
          <el-form :model="create" ref="create" label-width="100px" @submit.native.prevent :rules="buyRules">
            <el-form-item label="提货时间:">
              <el-date-picker v-model="time" type="datetime" placeholder="选择提货时间" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="buySave('time')">保 存</el-button>
            <el-button @click.native="buyClear">取 消</el-button>
          </div>
        </el-dialog>
        <div class="paginations">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="count">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import appConfig from '@/util/appConfig';
  const api = appConfig.getDataUrl();
  export default {
    data() {
      return {
        selectoptions: '',
        options: [
                {
                value: '雅诗兰黛',
                label: '雅诗兰黛',},
                { value: '资生堂',
                  label: '资生堂',}
                ],
        tableData: [],
        currentPage: 1,
        pageSize: 12,
        count: 0,
        name: '',
        token: '',
        createView: false,
        titleMap: {
          add: '新增商品信息',
          edit: '修改商品信息'
        },
        dialogStatus: '',
        create: {
          name: '',
          price: null,
          stock: null,
          limitBuy: null,
          introduction: '',
          imageUrlList: []
        },
        rules: {
          name: [
            {
              required: true,
              message: '请输入商品名称',
              trigger: 'blur'
            }
          ],
          price: [
            {
              required: true,
              message: '请输入商品价格',
              trigger: 'blur'
            },
            { type: 'number', message: '商品价格必须为数字值' }
          ],
          stock: [
            {
              required: true,
              message: '请输入商品库存',
              trigger: 'blur'
            },
            { type: 'number', message: '商品库存必须为数字值' }
          ],
          limitBuy: [
            {
              required: true,
              message: '请输入限购数量',
              trigger: 'blur'
            },
            { type: 'number', message: '限购数量必须为数字值' }
          ]
        },
        uploadImgUrl: `${api}/store/product/add/image`, // 上传的图片服务器地址
        headers: {
          Authorization: localStorage.getItem('token')
        },
        num: [],
        role: '',
        fileList: [],
        createViews: false,
        buyRules: {
          time: [
            {
              required: true,
              message: '请选择时间日期',
              trigger: 'change'
            }
          ]
        },
        time: '',
        pid: ''
      };
    },
    mounted() {
      this.role = localStorage.getItem('role');
      this.token = localStorage.getItem('token');
      this.getData();
    },
    methods: {
      getData() {
        axios
                .get(
                        `${api}/store/product/page?name=${this.name}&index=${this.currentPage}&size=${this.pageSize}&selectoptions=${this.selectoptions}`,
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
                    for (let i = 0; i < this.tableData.length; i++) {
                      this.num.push(1);
                    }
                    console.log(this.num)
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
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      search() {
        this.getData();
      },
      handleRemove(file, fileList) {
        const list = [];
        fileList.forEach((item) => {
          if (!item.response) {
            list.push(item.url);
          } else {
            list.push(item.response.data[0]);
          }
        });
        this.create.imageUrlList = list;
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      addComm() {
        this.create = {};
        this.fileList = [];
        this.dialogStatus = 'add';
        this.createView = true;
      },
      //新增
      addSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = this.create;
            axios
                    .post(`${api}/store/product/add`, param, {
                      headers: {
                        //头部参数
                        Authorization: this.token
                      }
                    })
                    .then((res) => {
                      if (res.data.code == 20000) {
                        this.createView = false;
                        this.currentPage = 1;
                        this.pageSize=12;
                        this.getData();
                        this.$message({
                          message: res.data.msg,
                          type: 'success'
                        });
                      } else {
                        this.$message.error(res.data.msg);
                      }
                    });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancel(formName) {
        this.create = {};
        this.fileList = [];
        this.$refs[formName].resetFields();
        this.createView = false;
      },
      //修改
      editCom(val) {
        this.fileList = [];
        this.create = {};
        this.dialogStatus = 'edit';
        let list = [];
        for (let i = 0; i < val.imageUrlList.length; i++) {
          let name = val.imageUrlList[i].url.substring(
                  val.imageUrlList[i].url.lastIndexOf('/') + 1,
                  val.imageUrlList[i].url.length
          );
          list.push(val.imageUrlList[i].url);
          this.fileList.push({
            name: name,
            url: val.imageUrlList[i].url
          });
        }
        val.imageUrlList = new Array(list);
        this.create = JSON.parse(JSON.stringify(val));
        this.createView = true;
      },
      editSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = new FormData();
            //遍历声明的data
            //这里的key就是id
            for (let key in JSON.parse(JSON.stringify(this.create))) {
              //append()方法，可以把键值key放到FormData对象里面去
              param.append(
                      key,
                      JSON.parse(JSON.stringify(this.create))[key]
              );
            }
            axios
                    .patch(`${api}/store/product/info`, param, {
                      headers: {
                        //头部参数
                        Authorization: this.token
                      }
                    })
                    .then((res) => {
                      if (res.data.code == 20000) {
                        this.createView = false;
                        this.currentPage = 1;
                        this.pageSize=12;
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除
      delCom(val) {
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
                          .patch(`${api}/store/product/info`, param, {
                            headers: {
                              //头部参数
                              Authorization: this.token
                            }
                          })
                          .then((res) => {
                            if (res.data.code == 20000) {
                              this.currentPage = 1;
                              this.pageSize = 12;
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
      },
      handleExceed(files, fileList) {
        this.$message.warning(
                `当前限制选择 6 个文件，本次选择了 ${
                        files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        );
      },
      handleUploadSuccess(response, file, fileList) {
        const list = [];
        // 遍历这个列表
        fileList.forEach((item) => {
          // 判断列表中的每一项是否有response属性（图片上传添加的对象和echoImgList添加的对象，里面的属性值不一样）
          if (!item.response) {
            list.push(item.url);
          } else {
            list.push(item.response.data[0]);
          }
        });
        this.create.imageUrlList = list;
      },
      handleChange(row, val) {
        this.tableData.map(v => {
          console.log(v.id)
          if (row.id === v.id) {
            this.$set(v, 'num', val) //通过$set设置数据集合里面的参数进行渲染
          }
        })
      },
      buy(val, index) {
        this.time = '';
        this.pid = val.pid;
        console.log(this.num[index])
        this.num = this.num[index];
        this.createViews = true;
      },
      buySave() {
        let param = {};
        param.uid = localStorage.getItem('uid');
        param.pid = this.pid;
        param.count = this.num;
        param.orderTime = this.time;
        axios
                .post(`${api}/store/productOrder/add`, param, {
                  headers: {
                    //头部参数
                    Authorization: this.token
                  }
                })
                .then((res) => {
                  if (res.data.code == 20000) {
                    this.createViews = false;
                    this.currentPage = 1;
                    this.pageSize = 12;
                    this.num=[];
                    this.getData();
                    this.time = '';
                    this.$message({
                      message: '购买成功',
                      type: 'success'
                    });
                  } else {
                    this.createViews = false;
                    this.$message.error(res.data.msg);
                  }
                });
      },
      buyClear() {
        this.createViews = false;
        this.time = '';
      }
    }
  };
</script>

<style lang="less">
  .commodity_management {
    .search {
      text-align: left;
      padding: 15px 15px 0px 15px;
    }
    .pagination {
      margin-top: 20px;
      margin-right: 20px;
    }
    .add {
      float: right;
      margin-right: 20px;
    }
    .upload-demo {
      float: left;
    }
    .el-upload {
      display: table;
    }
    .el-upload__tip {
      text-align: left;
    }
    .dataInfo {
      height: calc(100vh - 185px);
      overflow-y: scroll;
    }
    .datalist {
      .list {
        padding: 15px;
        padding: 15px;
        text-align: left;
        .list_li {
          list-style: none;
          display: inline-block;
          vertical-align: top;
          width: 26%;
          height: 380px;
          // float: left;
          border: 1px solid #e3e3e3;
          padding: 30px;
          margin-left: 10px;
          margin-right: 10px;
          border-radius: 4px;
          box-shadow: 0px 8px 24px 11px rgba(199, 199, 199, 0.35);
          margin-bottom: 20px;
          .el-carousel__item h3 {
            color: #475669;
            font-size: 18px;
            opacity: 0.75;
            line-height: 300px;
            margin: 0;
          }
          .el-carousel__container {
            height: calc(100vh - 700px);
          }
          .el-image {
            width: 100%;
            height: calc(100vh - 700px);
            background: #f5f5f5;
            .image-slot {
              text-align: center;
              line-height: calc(100vh - 700px);
              font-size: 16px;
            }
          }
          img {
            width: 100%;
            display: inline-block;
            vertical-align: top;
            max-height: calc(100vh - 700px);
          }
          .info {
            display: inline-block;
            vertical-align: top;
            margin-left: 10px;
            font-size: 14px;
            width: 216px;
            div {
              margin-bottom: 10px;
            }
          }
          .desc {
            text-align: left;
            margin-bottom: 20px;
            div {
              height: 40px;
              margin-top: 10px;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
      .el-date-editor {
        display: block;
      }
    }
  }
</style>
