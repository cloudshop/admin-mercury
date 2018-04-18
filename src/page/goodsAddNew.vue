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
        <div class="goodcontent">
            <div><span>您添加的商品分类为：</span><span v-if="goddsClassification1">{{goddsClassification1}}<i class="el-icon-arrow-right"></i></span><span v-if="goddsClassification2">{{goddsClassification2}}<i class="el-icon-arrow-right"></i></span><span v-if="goddsClassification3">{{goddsClassification3}}</span></div>
            <el-row :gutter="20" >
                <el-col :span="8">
                    <div class="grid-content  category">
                        <ul v-for="(item,index) in options">
                          <li class="goodlist " :key="index" :value="item.value" @click="slect1(item.value,item.children)">
                            <el-radio  label="1">备选项</el-radio>
                           <i class="el-icon-d-arrow-right"></i></li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content category ">
                       <ul v-for="(item,index) in options2">
                          <li class="goodlist " :key="index" :value="item.value" @click="slect2(item.value,item.children)"><span>{{item.label}}</span> <i class="el-icon-d-arrow-right"></i></li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content category">
                   <ul v-for="(item,index) in options3">
                          <li class="goodlist " :key="index" :value="item.value" @click="slect3(item.value)"><span>{{item.label}}</span> <i class="el-icon-d-arrow-right"></i></li>
                        </ul>
                  </div>
                </el-col>
            </el-row>
            <el-cascader 
              :options="options"
              v-model="selectedOptions3"
              @change="handleChange"
              change-on-select
            >
            </el-cascader>
        </div>
        <div class="goodcontent" >
            <h3>商品基本信息</h3>
            <div class="goods">
                <span>商品名称：</span>
                <el-input class="goodsinput" v-model="goodsName" placeholder="请输入内容"></el-input>
            </div>
            <div class="goods">
                <span>商品价格：</span>
                <el-input class="goodsinput" placeholder="请输入内容" v-model="goodsPrice">
                <template slot="append">元</template>
                </el-input>
            </div>
            <add-tags :goodsspec="goodsspec" :dynamicTags="dynamicTags" @ievent="changSpec"></add-tags>
            <div class="goods" style="justify-content: center;">
              <el-button type="primary" @click="addSpec"  >添加规格</el-button>
            </div>
          
            <div class="goods">
                <span>商品货号：</span>
                <el-input class="goodsinput" v-model="goodsName" placeholder="请输入内容"></el-input>
            </div>
            <div class="goods">
                <span>商品图片：</span>
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="mainimageUrl" :src="mainimageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
               <!--  <div class="maining">
                    <input type="file">
                </div> -->
            </div>
            <p class="mainds">上传商品默认主图，如多规格值时默认使用该图或分规格上传各规格主图；支持jpg、jif、png格式上传或从图片空间中选择，<span>建议使用尺寸800×800像素以上
            、大小不超过1M的正方形图片，</span>上传后的图片将会自动保存在图片空间的默认分类中。</p>
            <h3>商品详情描述</h3>
            <div class="goods">
                <span>商品描述：</span>
                <el-input
                  type="textarea" class="goodstextarea"
                  :autosize="{ minRows: 4, maxRows: 8}"
                  placeholder="请输入内容"
                  v-model="textarea3">
                </el-input>
            </div>
            <div class="goodimg ">
                <div class="uploadimg">
                   <el-upload
                      class="upload-demo"
                      :multiple="true"
                      ref="upload"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      :auto-upload="false">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    
                </div>
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
            <h3>支付方式</h3>
            <div class="goods">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="余额支付"></el-checkbox>
                    <el-checkbox label="微信"></el-checkbox>
                    <el-checkbox label="支付宝 C"></el-checkbox>
                </el-checkbox-group>
            </div>
            <h3>商品物流信息</h3>
            <div class="goods">
                <span>所在地：</span>
                <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
            </div>
            <div class="goods">
                <span>运费：</span>
                <el-input class="goodsinput" placeholder="请输入内容" v-model="goodsPrice">
                <template slot="append">元</template>
                </el-input>
            </div>
            <h3>其他信息</h3>
            <div class="goods">
                <span>商品其他信息：</span>
                <el-input class="goodsinput" v-model="goodsName" placeholder="请填写内容"></el-input>
            </div>


<!-- <tinymce :height="300" v-model="content"></tinymce> -->




        </div>
        <div class="goodcontent">
            <h3>上传商品图片</h3>
            <div class="goods">
                <span>商品1：</span>
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :auto-upload="false"
                    :limit="5"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                     <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </div>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
</template>

<script type="text/ecmascript-6">
// 导入获取表格数据接口方法
import { getTableData } from "@/api/getData"
import addTags from '../components/addTags'
import Tinymce from '../components/Tinymce'
  // function formatData(data){
  //   var result = [];
  //   for(var key in data){
  //     result.push({
  //       value: key
  //     })
  //   }
  //   return result
  // }

export default {
    name: "goodsAddNew",
    components:{addTags,Tinymce},
    data() {
        return {
          goddsClassification1:'',
          goddsClassification2:'',
          goddsClassification3:'',
          content:'',
          // options1:'',
          options2:'',
          options3:'',
          mainimageUrl:'',
            flag:0,
            goodsspec:'白色',
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',
            ceshi:'324',
            active: 0,
            loading: false, //是显示加载
            goodsClass: [],
            goodsName:'',
            goodsPrice:'',
            textarea3:'',
            dialogImageUrl: '',
            dialogVisible: false,
            fileList:[],
            checkList:[],
            options: [
                {
                  value: 'zhinan',
                  label: '指南',
                  children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                      value: 'yizhi',
                      label: '一致'
                    }, {
                      value: 'fankui',
                      label: '反馈'
                    }, {
                      value: 'xiaolv',
                      label: '效率'
                    }, {
                      value: 'kekong',
                      label: '可控'
                    }]
                  }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                      value: 'cexiangdaohang',
                      label: '侧向导航'
                    }, {
                      value: 'dingbudaohang',
                      label: '顶部导航'
                    }]
                  }]
                }, 
                {
                  value: 'zujian',
                  label: '组件',
                  children: [
                      {
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                          value: 'layout',
                          label: 'Layout 布局'
                        }, {
                          value: 'color',
                          label: 'Color 色彩'
                        }, {
                          value: 'typography',
                          label: 'Typography 字体'
                        }, {
                          value: 'icon',
                          label: 'Icon 图标'
                        }, {
                          value: 'button',
                          label: 'Button 按钮'
                        }]
                      }, 
                      {
                        value: 'form',
                        label: 'Form',
                        children: [{
                          value: 'radio',
                          label: 'Radio 单选框'
                        }, {
                          value: 'checkbox',
                          label: 'Checkbox 多选框'
                        }, {
                          value: 'input',
                          label: 'Input 输入框'
                        }, {
                          value: 'input-number',
                          label: 'InputNumber 计数器'
                        }, {
                          value: 'select',
                          label: 'Select 选择器'
                        }, {
                          value: 'cascader',
                          label: 'Cascader 级联选择器'
                        }, {
                          value: 'switch',
                          label: 'Switch 开关'
                        }, {
                          value: 'slider',
                          label: 'Slider 滑块'
                        }, {
                          value: 'time-picker',
                          label: 'TimePicker 时间选择器'
                        }, {
                          value: 'date-picker',
                          label: 'DatePicker 日期选择器'
                        }, {
                          value: 'datetime-picker',
                          label: 'DateTimePicker 日期时间选择器'
                        }, {
                          value: 'upload',
                          label: 'Upload 上传'
                        }, {
                          value: 'rate',
                          label: 'Rate 评分'
                        }, {
                          value: 'form',
                          label: 'Form 表单'
                        }]
                      }, 
                      {
                        value: 'data',
                        label: 'Data',
                        children: [{
                          value: 'table',
                          label: 'Table 表格'
                        }, {
                          value: 'tag',
                          label: 'Tag 标签'
                        }, {
                          value: 'progress',
                          label: 'Progress 进度条'
                        }, {
                          value: 'tree',
                          label: 'Tree 树形控件'
                        }, {
                          value: 'pagination',
                          label: 'Pagination 分页'
                        }, {
                          value: 'badge',
                          label: 'Badge 标记'
                        }]
                      }, 
                      {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                          value: 'alert',
                          label: 'Alert 警告'
                        }, {
                          value: 'loading',
                          label: 'Loading 加载'
                        }, {
                          value: 'message',
                          label: 'Message 消息提示'
                        }, {
                          value: 'message-box',
                          label: 'MessageBox 弹框'
                        }, {
                          value: 'notification',
                          label: 'Notification 通知'
                        }]
                      }, 
                      {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                          value: 'menu',
                          label: 'NavMenu 导航菜单'
                        }, {
                          value: 'tabs',
                          label: 'Tabs 标签页'
                        }, {
                          value: 'breadcrumb',
                          label: 'Breadcrumb 面包屑'
                        }, {
                          value: 'dropdown',
                          label: 'Dropdown 下拉菜单'
                        }, {
                          value: 'steps',
                          label: 'Steps 步骤条'
                        }]
                      }, 
                      {
                        value: 'others',
                        label: 'Others',
                        children: [{
                          value: 'dialog',
                          label: 'Dialog 对话框'
                        }, {
                          value: 'tooltip',
                          label: 'Tooltip 文字提示'
                        }, {
                          value: 'popover',
                          label: 'Popover 弹出框'
                        }, {
                          value: 'card',
                          label: 'Card 卡片'
                        }, {
                          value: 'carousel',
                          label: 'Carousel 走马灯'
                        }, {
                          value: 'collapse',
                          label: 'Collapse 折叠面板'
                        }]
                      }]
                }, 
                {
                  value: 'ziyuan',
                  label: '资源',
                  children: [{
                    value: 'axure',
                    label: 'Axure Components'
                  }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                  }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                  }]
                }
            ],
            selectedOptions: [],
            selectedOptions3: ['zujian', 'data', 'tag']
        };
    },
    // 数据发生改变
    watch: {
       dynamicTags(){
        console.log(this.dynamicTags)
       },
       goodsspec(){
         console.log(this.goodsspec)
       },
       options2(){
          this.options3=this.options2[0].children
          this.goddsClassification3 = this.options2[0].children[0].value
       }
    },
    // 创建完毕状态(里面是操作)
    created() {
     
    },
    mounted(){
      console.log(this.options[2].children)
      console.log(this.goodsspec)
      this.options2=this.options[0].children
      this.options3=this.options2[0].children
    },
    // 里面的函数只有被调用才会执行
    methods: {
      // formatData(){
      //     var result = [];
      //     for(var key in options){
      //       result.push({
      //         value: key
      //       })
      //     }
      //     this.options1= result
      // },
      slect1(val,child){
        this.goddsClassification1 = val;
        this.options2=child;
        this.goddsClassification2 = this.options2[0].value
        // this.goddsClassification1 = child[0].value
        // console.log(this.options2)
      },
      slect2(val,child){
        this.goddsClassification2 = val;
        this.options3=child;
        // this.goddsClassification2 = child[0].value
        // console.log(this.options3)
      },
      slect3(val){
        this.goddsClassification3 = val;
        // this.goddsClassification3 = child[0].value
        console.log(val)
      },
      handleAvatarSuccess(res, file) {
        this.mainimageUrl = URL.createObjectURL(file.raw);
      },
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
        addSpec(){
          var that = this;
          this.flag +=1;
          console.log()
        },
        changSpec(val){
          this.$on('ievent',()=>this.goodsspec= val)
          // this.goodsspec= val;
          console.log(val)
        },
        dayin(){
          console.log(this.options)
        },
        next() {
            if (this.active++ > 3) this.active = 0;
        },
        
        // 提交方法
        submit: function() {
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleChange(value) {
            console.log(value);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        slelectlist(){
          console.log(this.selectedOptions3)
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
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .goodcontent{
    padding: 0 20px;
  }
  .goodcontent h3{
    border-bottom: 1px solid #a7a7a7;
    padding-bottom: 6px;
    margin: 20px 0;
  }
  .category{
    /*margin: 20px;*/
    padding: 16px;
    border: 1px solid #ccc;
  }
  .category ul,li{
      margin: 0;
      padding: 0;
      list-style: none;
  }
  .goodlist{
    padding: 10px;
    /* background: #ececec; */
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .onlist{
    background: #c8d8fd;
    border-radius: 6px;
  }
  .goods{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    padding: 0 20px;
  }
  .goodsdescribe{
    display: flex;
    margin-bottom: 20px;
    position: relative;
    align-items: top;
  }
  .goods span{
    display: inline-block;
    min-width: 80px;
    padding-right: 20px;
  }
  .goodsinput{
    width: 40%;
  }
  .goodstextarea{
    width: 60%;
  }
  .goodimg{
    display: flex;
    margin-bottom: 20px;
    position: relative;
    padding: 0 20px;
  }
  .uploadimg{
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
  .imgrule{
    width: 40%;
    margin-left: 60px;
  }
  .imgrule p{
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }
  .imgrule li{
    list-style: none;
    font-size: 14px;
    margin-top: 10px;
    text-indent: 24px;
  }
  .maining{
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .maining input{
    width: 100%;
    height: 100%;

  }
  .mainds{
    padding: 0;
    padding-left: 100px;
    text-indent: 24px;
    margin: 0;
    font-size: 14px;
    width: 600px;
  }
  .mainds span{
    color: #ff6161
  }
   .el-tag + .el-tag {
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
</style>