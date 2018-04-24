<template>
  <div class="header-table">
    <h1>商家数据统计</h1>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="16">
        <div class="grid-content ">
          <h2><span>用户名：</span>{{name}}</h2>
          <h2><span>注册时间：</span>{{ShopDate}}</h2>
          <h2><span>店铺名称：</span>{{ShopName}}</h2>
          <h2><span>管理权限：</span>{{admin}}</h2>
          <h2><span>更换头像：</span></h2>
          <el-upload class="avatar-uploader" action="http://localhost:8080" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "sllerIndex",
  data() {
    return {
      name: '神笔马良',
      ShopDate: '2018-01-01',
      ShopName: '灵魂画手',
      admin: '钻石会员',
      imageUrl: ''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    }
  }
};

</script>
<style>
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

.grid-content h2 {
  font-size: 16px;
  font-weight: normal;
  padding: 0;
  margin: 20px;
}

.grid-content span {
  display: inline-block;
  min-width: 90px;
  max-width: 140px;
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
.avatar-uploader{
  margin-left: 20px; 
}
.avatar-uploader .el-upload{
  border: 1px dashed #949494
}
</style>
