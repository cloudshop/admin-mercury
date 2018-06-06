<template>
  <div class="header-table">
    <h1>商家数据统计</h1>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="16">
        <div class="grid-content ">
          <div class="shop-info" v-show="!noInfo">
            <h2 class="flexbox"><span class="shoptitle">店铺名称：</span><span>{{userData.name}}</span></h2>
            <h2 class="flexbox"><span class="shoptitle">注册时间：</span><span>{{createdTime}}</span></h2>
            <h2 class="flexbox"><span class="shoptitle">所在地：</span>
              <!-- <span>{{userData.provice + '    ' + userData.city + '    ' + userData.street}}</span> -->
              <input type="text" v-model="address" class="address"><button @click="submitAddress(userData.id)" class="submit">提交</button>
            </h2>
            <!-- <h2><span>管理权限：</span>{{item}}</h2> -->
            <!-- <h2><span>更换头像：</span></h2> -->
            <div class="flexbox shopimg">
              <span class="shoptitle">店铺背景图：</span>
              <div class="imgbox">
                <img class="imgs" :src="userData.imgIntroduces">
                <el-button type="primary" @click="handleEdit()">重新上传</el-button>
              </div>
             <!--  <span>一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...一段很长的文字描述...</span> -->
            </div>
          </div>
          <div class="no-info" v-show="noInfo">
            <p>这个商家没有数据哦！</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--编辑界面-->
    <el-dialog title="编辑店铺背景" :visible.sync="editFormVisible" width="30%">
      <span>请选择图片</span>
      <el-upload class="avatar-uploader" :action="ossUploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!-- <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit" :loading="loading" class="title1">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "sllerIndex",
  data() {
    return {
      // dialogImageUrl: '',
      // dialogVisible: false,
      ossUploadUrl: 'http://app.grjf365.com/api/file/api/ossUpload',
      noInfo: false,
      userData: {},
      editFormVisible: false,
      loading: false,
      mainimageUrl: '',
      imageUrl: '',
      address:''
    };
  },
  created() {
    this.getUserData()
  },
  methods: {
    submitAddress(shopId){
      console.log(shopId);
      console.log(this.address);
      const url = 'user/api/mercuries/updateBackgroundMercuryInfo';
      this.$axios.put(url,{id:shopId,city:this.address})
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getUserData() {
      // const url = 'http://cloud.eyun.online:9080/user/api/mercuries/usermercurie'
      const url = 'user/api/mercuries/usermercurie'
      this.$axios.get(url)
        .then((res) => {
          console.log(res)
          this.userData = res.data;
          console.log(this.userData);
          this.createdTime =  this.userData.createdTime.split('T')[0];
          this.address = this.userData.city;
        })
        .catch((error) => {
          this.noInfo = true
          this.$message("获取信息失败");
        })
    },
    // handlePictureCardPreview(file) {
    //    this.dialogImageUrl = file.url;
    //    this.dialogVisible = true;
    //  },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.mainimageUrl = res[0];
      console.log(this.mainimageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPEG && !isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPEG、JPG、PNG 格式!');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false
      }
    },
    handleEdit() {
      this.editFormVisible = true;
    },
    close() {
      this.editFormVisible = false;
    },
    submit() {
      // const url = 'http://cloud.eyun.online:9080/user/api/mercuries/setBackground'
      const url = 'user/api/mercuries/setBackground'
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        this.loading = true;
        // 此处应该请求数据
        // console.log(123)
        this.$axios.put(url, { 'imgIntroduces': this.mainimageUrl }).then((res) => {
          setTimeout(() => {
            this.$message({ message: "提交成功！", type: "success" });
            this.mainimageUrl = '';
            this.imageUrl = '';
            this.getUserData();
            this.loading = false;
          }, 1000);
          this.editFormVisible = false;
        }).catch((err) => {
          this.$message.error(err.response.data.title);
          this.editFormVisible = false;
          this.loading = false;
        })
      });
    },
  }
};

</script>

<style scoped>
.flexbox .address{
  line-height: 1rem;
  outline: none;
  padding: 0 5px; 
  border-radius: 3px;
  border: 1px solid #bbb;
  background: #f5f5f5;
}
.flexbox .submit{
  background: #409EFF;
  padding: 0.3rem 1rem;
  border: 0;
  border-radius: 3px;
  color: #fff;
  margin-left: 5px;
}

.header-table {
  text-align: left;
}

.header-table h1 {
  font-size: 28px;
  text-align: center;
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
  padding: 30px;
  border-radius: 4px;
  min-height: 36px;
  border: 1px solid #9e9e9e;
  background: #f5f5f5;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.flexbox {
  display: flex;
  font-size: 16px;
  font-weight: normal;
  padding: 0;
  margin-bottom: 26px;
}

.shoptitle {
  width: 120px;
  flex: 120px 0 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.el-icon-plus {
  border: 1px solid #ccc;
  border-radius: 10px;
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
  overflow: hidden;
  border-radius: 12px;
  display: block;
  border: 1px solid #ccc;
}

.imgbox {
  flex: 178px 0 0;
  margin-right: 20px;
  text-align: center;
}

.imgs {
  width: 178px;
  height: 178px;
  display: block;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.avatar-uploader {
  margin: 0 auto;
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #949494
}

.no-info {
  text-align: center;
  margin: 100px 0;
}

</style>
