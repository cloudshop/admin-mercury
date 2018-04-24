<template>
  <div class="header-table">
    <el-row>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="选择商品分类"></el-step>
          <el-step title="填写商品详情"></el-step>
          <el-step title="上传商品图片"></el-step>
          <el-step title="商品发布成功"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <div class="goodcontent" style="margin:20px 0;">
      <classi-fication :type1.sync="type1" :type2.sync="type2" :type3.sync="type3"> </classi-fication>
      <div class="goods" style="margin:20px 0;">
      <span>商品品牌：</span>
      <el-input class="goodsinput" v-model="goodsBrand" placeholder="请输入商品名称"></el-input>
    </div>
    </div>
    <div class="goodcontent">
      <h3>商品基本信息</h3>
      <div class="goods">
        <span>商品名称：</span>
        <el-input class="goodsinput" v-model="goodsName" placeholder="请输入商品名称"></el-input>
      </div>
      <div class="goods">
        <span>商品价格：</span>
        <el-input-number v-model="goodsPrice" :min="0.00" :max="999999" label="描述文字"></el-input-number>
        <span style="margin-left:20px;">元</span>
      </div>
      <div class="goods" style="align-items: flex-start;" v-for="(item,index) in goodsClass">
        <span style="margin-top:8px;">商品规格：</span>
        <el-input class="goodsspec" v-model="item.attr" @change="createGoodsList" clearable placeholder="如颜色"></el-input>
        <div class="goodstages">
          <el-tag style="margin-right:10px;margin-bottom:10px;" :key="tag" v-for="tag in item.attrValue" closable :disable-transitions="false" @close="removeTag(index,tag)">
            {{tag}}
          </el-tag>
          <el-input style="margin-bottom:10px;width:100px" class="input-new-tag" v-if="item.flag" v-model="item.inputValue" placeholder="请输入内容" size="small" @keyup.enter.native="addNewTag(index,item.inputValue)" @blur="addNewTag(index,item.inputValue)">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">+ 添加标签</el-button>
        </div>
        <el-button type="danger" size="small" style="margin:0 20px;" @click="deleteSpec(index)">删除规格</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="center">
        <el-button type="primary" :disabled="goodsClass.length===2" @click="addSpec">添加商品规格</el-button>
        <!-- <el-button type="primary" style="margin-left:20px;" @click="createGoodsList">生成商品列表</el-button> -->
      </el-row>
      <div class="goods">
        <table class="newclass" width="100%">
          <thead align=center>
            <tr>
              <th width="14%" v-for="(item,index) in goodsClass" v-show="item.attr || item.attr != ''">{{item.attr }}</th>
              <th width="18%">商品价格</th>
              <th width="18%">让利</th>
              <th width="18%">库存</th>
              <th width="18%">商家货号</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in goodsList">
              <td>{{item.attrValue}}</td>
              <td v-if="item.AnotherValue ">{{item.AnotherValue}}</td>
              <td>
                <input type="number" class="goodsinput" v-model.trim="item.price" min="0.00" @blur="checkPrice(item.skuPrice)" placeholder="商品单价" />
              </td>
              <td>
                <input type="text" class="goodsinput" disabled="true" placeholder="请输入内容" />
              </td>
              <td>
                <input type="number" class="goodsinput" v-model.trim="item.skuCount" min="0" placeholder="商品库存" />
              </td>
              <td>
                <input type="text" class="goodsinput" v-model.trim="item.skuCode" placeholder="商品货号" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="goods">
        <span>商品库存：</span>
        <el-input class="goodsinput" v-model="goodsNumber" :disabled="true">
          <template slot="append">件</template>
        </el-input>
      </div>
      <div class="goods">
        <span>商品货号：</span>
        <el-input class="goodsinput" v-model="goodsNumber" placeholder="请输入商品货号"></el-input>
      </div>
      <div class="goods">
        <span>商品图片：</span>
        <el-upload class="avatar-uploader" action="http://cloud.eyun.online:9080/file/api/ossUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="mainimageUrl" :src="mainimageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <p class="mainds">上传商品默认主图，如多规格值时默认使用该图或分规格上传各规格主图；支持jpg、jif、png格式上传或从图片空间中选择，<span>建议使用尺寸800×800像素以上
            、大小不超过1M的正方形图片，</span>上传后的图片将会自动保存在图片空间的默认分类中。</p>
      <!-- <div v-show="active==2"> -->
      <div >
        <h3>商品详情描述</h3>
        <div class="goods">
          <span>商品描述：</span>
          <div class="imgrule">
            <p>1、基本要求</p>
            <li>(1)手机详情总体大小：图片+文字，图片不超过20张，文字不超过500字；</li>
            <li>建议：所有图片都是宝贝相关图片。</li>
            <p>2、图片大小要求：</p>
            <li>(1)建议使用宽度480～620像素、高度小于960像素的图片；</li>
            <li>(2)格式为：JPG\JPEG\GIF\PNG；</li>
            <li>举例：可以上传一张宽度为480，高度为960像素，格式为JPEG的图片</li>
          </div>
        </div>
        <div class="goodimg ">
          <quill-editor :upload-url="uploadUrl" @input="captureVal" @focus="onEditorFocus($event)"></quill-editor>
        </div>
      </div>
      <h3>支付方式</h3>
      <div class="goods">
        <el-checkbox-group v-model="payList">
          <el-checkbox label="余额支付"></el-checkbox>
          <el-checkbox label="微信"></el-checkbox>
          <el-checkbox label="支付宝 C"></el-checkbox>
        </el-checkbox-group>
      </div>
      <h3>商品物流信息</h3>
      <div class="goods">
        <span>所在地：</span>
        <!-- <el-cascader :options="options" v-model="goodsAddrs" @change="selectAddrs"> -->
        <!-- <el-cascader  v-model="goodsAddrs" > -->
        <!-- </el-cascader> -->
      </div>
      <div class="goods">
        <span>运费：</span>
        <el-input-number class="goodsinput" :min="1" :max="10" label="描述文字" v-model="goodsFreight">
        </el-input-number>
        <span>元</span>
      </div>
      <h3>其他信息</h3>
      <div class="goods">
        <span>商品其他信息：</span>
        <el-input class="goodsinput" v-model="goodsOther" placeholder="请填写内容"></el-input>
      </div>
    </div>
    <div class="goodcontent">
      <h3>上传商品图片</h3>
      <div class="goods">
        <span>商品1：</span>
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :auto-upload="false" :limit="5" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
// 导入富文本编辑器模板
import quillEditor from '../components/quillEditor'
import classiFication from '../components/classiFication'
export default {
  name: "goodsAddNew",
  components: { quillEditor,classiFication },
  data() {
    return {
      goodsBrand:'',//商品品牌
      type1: '', //选择一级分类
      type2: '', //选择二级分类
      type3: '', //选择三级分类
      firstCategory: '', //一级分类
      secondCategory: '', //二级&&三级分类
      secondIndex: '', //二级分类下标
      thirdCategory: '', //二级&&三级分类
      goodsList: [],
      selectedGoods: ['zujian', 'data', 'tag'], //选择商品分类
      goodsName: '', //商品名
      goodsPrice: 0, //商品价格
      goodsNumber: '', //商品货号
      mainimageUrl: '', //商品图片 默认主图链接
      payList: [], //商品支付方式
      goodsAddrs: [], //商品所在地
      goodsFreight: 0, //商品运费
      goodsOther: '', //商品其他信息
      goodsDescribe: '', //商品描述
      uploadUrl: 'http://127.0.0.1:9120/', //富文本编辑器里面的图片上传地址
      contents: '', //富文本编辑器里面的内容
      //商品规格 标签
      goodsClass: [{
        attr: '红色',
        flag: '',
        attrValue: ['标签1', '标签2', '标签3']
      }, {
        attr: '蓝色色',
        flag: '',
        attrValue: ['标签3', '标签4', '标签5']
      }],
      flag: 0,
      active: 1,
      loading: false, //是显示加载
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  // 数据发生改变
  watch: {
    type1(val){
      console.log(val)
    },
    type2(val){
      console.log(val)
    },
    type3(val){
      console.log(val)
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    
  },
  mounted() {
   
  },
  computed: {

  },
  // 里面的函数只有被调用才会执行
  methods: {
    checkPrice(val) {
      if (val < 0) {
        this.$message.error("最小价格不能小于0元");
        return false
      }
    },

    // 生成商品列表
    createGoodsList() {
      let that = this;
      let arr = [];
      if (that.goodsClass.length === 1) {
        let val = that.goodsClass[0].attrValue;
        for (let i = 0; i < val.length; i++) {
          let obj = Object.create(null);
          obj.attr=that.goodsClass[0].attr;
          obj.attrAnother = '';
          obj.AnotherValue = '';
          obj.skuCount = '',
          obj.skuPrice = '';
          obj.transfer = '';
          obj.skuCode = '';
          obj.attrValue = val[i];
          arr.push(obj)
          obj = {}
        }
      } else if (that.goodsClass.length === 2) {
        let val = that.goodsClass[0].attrValue;
        let val2 = that.goodsClass[1].attrValue;
        for (let i = 0; i < val.length; i++) {

          for (let j = 0; j < val2.length; j++) {
            let obj = Object.create(null);
            obj.attr=that.goodsClass[0].attr;
            obj.attrAnother = that.goodsClass[1].attr;
            obj.AnotherValue = val2[j];
            obj.skuCount = '',
            obj.skuPrice = '';
            obj.transfer = '';
            obj.skuCode = '';
            obj.attrValue = val[i];
            arr.push(obj)
            obj = {}
          }
        }

      }
      that.goodsList = arr;
      console.log(that.goodsList)
      arr = []
    },
    //删除标签
    removeTag(index, tag) {

      this.goodsClass[index].attrValue.splice(this.goodsClass[index].attrValue.indexOf(tag), 1);
      console.log(this.goodsClass[index].attrValue);
      this.createGoodsList();
    },
    //添加标签
    addNewTag(index, val) {
      let inputValue = val;
      if (inputValue && !this.goodsClass[index].attrValue.includes(inputValue)) {
        this.goodsClass[index].attrValue.push(inputValue);
        console.log(this.goodsClass[index].attrValue)
      }
      this.createGoodsList();
      this.goodsClass[index].flag = false;
      this.goodsClass[index].inputValue = '';
    },
    //显示添加新标签输入框
    showInput(index) {
      this.goodsClass[index].flag = true
    },
    //删除规格
    deleteSpec(index) {
      this.goodsClass.splice(index, 1);
      this.createGoodsList();
    },
    //添加规则
    addSpec() {
      this.goodsClass.push({
        attr: '',
        flag: '',
        attrValue: []
      })
    },
    //上传商品主图成功回调
    handleAvatarSuccess(res, file) {
      this.mainimageUrl = URL.createObjectURL(file.raw);
    },
    //上传商品主图之前操作
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //选择商品地址
    selectAddrs(value) {
      this.goodsAddrs = value;
      console.log(this.goodsAddrs);
    },
    //获取富文本编辑器里面的内容
    captureVal(val) {
      this.contents = val;
    },
    onEditorFocus() {},
    next() {
      if (this.active++ > 3) this.active = 0;
    },
    // 商品描述图片提交方法
    submit: function() {},
    // submitUpload() {
    //   this.$refs.upload.submit();
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // handlePreview(file) {
    //   console.log(file);
    // },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    slelectlist() {
      console.log(this.goodsAddrs)
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

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.goodcontent {
  padding: 0 20px;
}

.goodcontent h3 {
  border-bottom: 1px solid #a7a7a7;
  padding-bottom: 6px;
  margin: 20px 0;
}

.onlist {
  background: #c8d8fd;
  border-radius: 6px;
}

.goods {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  padding: 0 20px;
}

.goodsdescribe {
  display: flex;
  margin-bottom: 20px;
  position: relative;
  align-items: top;
}

.goods span {
  display: inline-block;
  min-width: 80px;
  padding-right: 20px;
}

.goodsspec {
  width: 120px;
  margin-right: 20px;
  flex: 0 0 120px;
}

.goodstages {
  /*margin-right: 20px;*/
}

.goodsspec input {
  width: 100px;
}

.goodsinput {
  width: 40%;
}

.goodstextarea {
  width: 60%;
}

.goodimg {
  margin-left: 100px;
  margin-bottom: 20px;
  position: relative;
  padding: 0 20px;
}

.uploadimg {
  box-sizing: border-box;
  padding: 20px;
  width: 350px;
  height: 480px;
  border: 1px solid #ccc;
  margin-left: 100px;
  border-radius: 4px;
  /*overflow-y: scroll;*/
  margin-bottom: 40px;
  position: relative;
}

.imgrule {
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  background: #e8e8e8;
}

.imgrule p {
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.imgrule li {
  list-style: none;
  font-size: 14px;
  margin-top: 10px;
  text-indent: 24px;
}

.maining {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.maining input {
  width: 100%;
  height: 100%;
}

.mainds {
  padding: 0;
  margin-left: 120px;
  text-indent: 24px;
  font-size: 14px;
  width: 600px;
  background: #e8e8e8;
  padding: 20px;
  border-radius: 6px;
}

.mainds span {
  color: #ff6161
}

.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.chociseactive{
  background: #8792af;
  color: #fff;
}


/* Table Head */

.newclass {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ccc;
  margin-top: 20px;
  background: #fff;
  /*box-shadow: 0px 3px 3px rgba(0,0,0,.3);*/
}

.newclass input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.newclass th,
.newclass td {
  padding: 8px 4px;
  text-align: cneter;
  border: 1px solid #ccc;
}

.newclass thead tr {
  background: #8cc253;
  color: #fff;
}

.newclass tbody tr:nth-child(even) {
  background: #eee;
}

.newclass td {
  text-align: center
}

.newclass tbody tr:hover {
  background: #80c7fe;
  color: #fff;
}

</style>
