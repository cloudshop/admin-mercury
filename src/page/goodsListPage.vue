  <template>
    <div class="header-table">
       
        <!--列表-->
        <el-table :data="listData" highlight-current-row stripe v-loading="loading" element-loading-text="拼命加载中" style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <!-- <el-table-column type="index" width="60"> -->
            <!-- </el-table-column> -->
            <el-table-column prop="skucode" label="商品编号" width="100">
            </el-table-column>
            <el-table-column prop="skuname" label="商品名称" width="100">
            </el-table-column>
            <el-table-column prop="price" label="商品单价" width="100">
                <template slot-scope="scope">{{scope.row.price+'元'}}</template>
            </el-table-column>
            <el-table-column prop="transfer"  label="让利价格" width="100">
            </el-table-column>
            <el-table-column prop="count" label="库存" width="100">
            </el-table-column>
            <el-table-column prop="publishtime" label="发布时间" width="100">
            </el-table-column>
             <el-table-column  prop="status" label="状态" width="100">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <!-- <el-col :span="24" class="toolbar">
            <el-pagination background layout="prev,total, pager, next" :total="total" :current-page="filter.currentPage" @current-change="handleCurrentChange" @size-change="handleSizeChange" style="text-align:center;margin-top:10px;">
            </el-pagination>
        </el-col> -->

        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible">
            <div class="goods" >
                <span>商品名称</span>
                <span>{{editForm.skuname}}</span>
                
            </div>
            <div class="goods" >
                <span>商品编号</span>
                <span>{{editForm.skucode}}</span>
            </div>
             <div class="goods" >
                <span>商品单价</span>
                <span>{{editForm.price}}</span>
                <input type="number" class="goodsinput" v-model.trim="editForm.price" min="0.00"  placeholder="商品单价" />
            </div>
             <div class="goods" >
                <span>让利价格</span>
                <span>{{editForm.transfer}}</span>
                <input type="number" class="goodsinput" v-model.trim="editForm.transfer" min="0.00"  placeholder="商品单价" />
            </div>
             <div class="goods" >
                <span>库存</span>
                <span>{{editForm.count}}</span>
                <input type="number" class="goodsinput" v-model.trim="editForm.count" min="0.00"  placeholder="商品单价" />
            </div>
            <div class="goods" >
                <span>发布时间</span>
                <span>{{editForm.publishtime}}</span>
                <input type="number" class="goodsinput" v-model.trim="editForm.publishtime" min="0.00"  placeholder="商品单价" />
            </div>
            <div class="goods" >
                <span>状态</span>
                <span>{{editForm.status}}</span>
                <input type="number" class="goodsinput" v-model.trim="editForm.status" min="0.00"  placeholder="商品单价" />
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit" :loading="loading" class="title1">提交</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script type="text/ecmascript-6">
// 导入获取表格数据接口方法
// import { getTableData } from "@/api/getData";
export default {
    name: "goodsListPage",
    data() {
        return {
            listData:[],
            goods: [],
            userData: [], //数据列表
            loading: false, //是显示加载
            searchName: "", //搜索的名字
            dayValue: "", //选择时间
            searchdata: [],
            editFormVisible: false, //控制编辑页面显示与隐藏
            dialogFormVisible: false, //控制新增页面显示与隐藏
            total: 0, //总页数
            filter: {
                //分页插件
                pageSize: 15, // 页大小
                currentPage: 1 // 当前页
            },
            //新增编辑字段
            editForm: {
                id: 0,
                name: "",
                gender: "1",
                age: 0,
                date: "Tue Apr 10 2018 00:00:00 GMT+0800 (中国标准时间)",
                county: ""
            }
        };
    },
    filters:{
       // addPrice(userData){

       // } 
    },
    // 数据发生改变
    watch: {
        // editForm: function() {
        //     alert(JSON.stringify(this.editForm))
        // }
    },
    // 创建完毕状态(里面是操作)
    created() {
        // 获取数据
        // const res = getTableData();
        // 判断数据是否成功
        // if (res.success) {
        //     this.userData = res.data.userData;
        //     this.total = 200;
        // } else {
        //     this.$message.error("获取数据失败");
        //     this.logining = false;
        //     return false;
        // }
        const url = 'http://cloud.eyun.online:9080/product/api/product/skuStore'
        const data = {shopId:5,pageNum:1,pageSize:10}
        this.$axios.post(url,data)
        .then((res) => {
          this.listData = res.data;
          console.log(res)
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    // 里面的函数只有被调用才会执行
    methods: {

        // 编辑页面取消方法（隐藏编辑页面）
        close() {
            this.editFormVisible = false;
        },
        //显示编辑界面
        handleEdit: function(index, row) {
            this.editFormVisible = true;
            // 深拷贝并赋值
            this.editForm = Object.assign({}, row); //合并对象操作
            console.log(this.editForm);
        },
        // 删除方法
        handleDelete: function(index, row) {
            this.$confirm("确认删除吗?", "提示", {
                type: "warning"
            }).then(() => {
                this.loading = true;
                setTimeout(() => {
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.userData.splice(index, 1);
                    this.loading = false;
                }, 2000);
                this.getuserData();
            });
            console.log(index, row);
        },
        // 搜索方法
        // search: function() {
        //     this.searchdata = [];
        //     let searchName = this.searchName;
        //     if (searchName == "") {
        //         this.$message("请输入姓名");
        //         return false;
        //     }
        //     let dayValue = this.dayValue;
        //     this.loading = true;
        //     const res = getTableData();
        //     for (let o of res.data.userData) {
        //         if (o.name == searchName) {
        //             this.searchdata.push(o);
        //         }
        //     }
        //     this.loading = false;
        //     this.userData = this.searchdata;
        //     console.log(this.searchdata);
        // },
        // 编辑、新增弹窗 提交方法
        submit: function() {
            this.$refs.editForm.validate(valid => {
                console.log(valid);
                if (valid) {
                    this.$confirm("确认提交吗？", "提示", {}).then(() => {
                        this.loading = true;
                        // 此处应该请求数据，暂时写为push，直接放在数据末尾，
                        console.log(this.editForm);
                        this.userData.push(this.editForm);
                        setTimeout(() => {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            this.loading = false;
                        }, 2000);
                        this.editFormVisible = false;
                    });
                }
            });
        },
        // pageSize 改变时会触发
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        // currentPage 改变时会触发
        handleCurrentChange(val) {
            // let datalist = this.goods;
            // 保存当前页
            // this.filter.currentPage = val;
            // 获取数据
            // this.getuser();
            // console.log(`当前页: ${val}`);
        },
        // 分页获取数据
        getuser() {
            // 获取设置的显示条数
            // const res1 = getTableData();
            // console.log(this.userData);
            // this.userData = res1.data.userData;
        }
    }
};
</script>
<style scoped>
.title1 {
    font-size: 12px;
}
.header-table {
    text-align: left;
}
.goodsinput {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>