<template>
    <div class="login-wrap">
        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm login-container">
            <h2 class="title">贡融积分<span class="logtitle"></span>商家管理平台</h2>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
           <!--  <div class="yanzheng">
                <div class="yanzma">
                    <el-input placeholder="请输入验证码" v-model="ruleForm.validateCode" clearable> </el-input>
                </div>
                <div class="shuaxin">
                    <span>1234</span>
                    <el-button type="primary">刷新</el-button>
                </div>
            </div> -->
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')" :loading="logining">登录</el-button>
            </el-form-item>
            <div class="logoncont">
                <el-button type="text" @click.native="register" >注册</el-button>
                <el-button type="text">忘记密码</el-button>
            </div>
        </el-form>
    </div>
</template>
<script type="text/ecmascript-6">
// 导入登录接口方法
import { login } from "@/api/getData";
export default {
    name: "login",
    data() {
        return {
            //定义loading默认为false
            logining: false,
            ruleForm: {
                //username和password默认为空
                username: "",
                password: "",
                validateCode: '',
                user:''
            },
            //rules前端验证
            rules: {
                username: [
                    { required: true, message: "请输入账号", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },
    watch:{
        ruleForm (val){
            console.log(val)
        }
    },
    // 里面的函数只有调用才会执行
    methods: {
        // var p1=/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/; 
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.logining = true;
                    const res = login(this.ruieForm);
                    console.log(res);
                    if (res.success) {
                        //如果请求成功就让他2秒跳转路由
                        setTimeout(() => {
                            this.logining = false;
                            this.$router.push({ path: "/sllerIndex" });
                        }, 2000);
                    } else {
                        this.$message.error("用户名密码错误！");
                        this.logining = false;
                        return false;
                    }
                } else {
                    this.$message.error("请输入用户名密码！");
                    this.logining = false;
                    return false;
                }
            });
        },
        register(){
            this.$router.push({ path: "/register" });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 15%;
    background-image: url("../assets/img/bg.png");
    background-color: #112346;
    background-repeat: no-repeat;
    background-position: center right;
}
.login-container {
    border-radius: 10px;
    margin: 0px auto;
    width: 350px;
    padding: 30px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    text-align: left;
}
.login-container h2{
    margin-bottom: 20px;
}
.title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.remember {
    margin: 0px 0px 35px 0px;
}
.logoncont {
    display: flex;
    justify-content: space-between;
}
.logtitle{
    padding: 0 20px;
}
.yanzheng{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.yanzma{
        width: 35%;
}
.shuaxin span{
    display: inline-block;
    border: 1px solid #ccc;
    font-size: 22px;
    width: 80px;
    text-align: center;
    height: 40px;
    vertical-align: top;
    line-height: 40px;
    box-sizing: border-box;
    border-radius: 4px;
    margin-right: 10px;
}
</style>