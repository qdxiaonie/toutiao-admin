<template>
  <div class="login_container">
    <div class="login_form">
      <img class="logo_img" src="./logo1.jpg" alt />
      <el-form ref="loginForm" :model="user" :rules="formRules">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button
            class="login_btn"
            type="primary"
            @click="onLogin()"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
        agree: false,
      },
      // checked: false,
      loading: false,
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          {
            pattern: /^\d{6}$/,
            message: "请输入正确的验证码格式",
            trigger: "change",
          },
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback();
              } else {
                callback(new Error("请勾选同意协议"));
              }
            },
            trigger: "change",
          },
        ],
      },
      login() {
        //验证通过，提交登录
        this.loading = true;

        login(this.user)
          .then((res) => {
            this.loading = false;
            // console.log(res);
            this.$message({
              message: "登录成功",
              type: "success",
            });

            window.localStorage.setItem("user",JSON.stringify(res.data.data))
            //跳转到首页
            this.$router.push("/");
          })
          .catch((err) => {
            this.loading = false;
            console.log("登录失败", err);
            this.$message.error("登录失败，手机号或验证码错误");
          });
      },
    };
  },
  methods: {
    onLogin() {
      //获取表单数据
      const user = this.user;
      //表单验证

      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
.login_container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./timg.jpg") no-repeat;
  background-size: cover;
}
.login_form {
  background-color: #fff;
  padding: 0px 50px;
  min-width: 300px;
}
.login_btn {
  width: 100%;
}
.logo_img {
  width: 300px;
  height: 130px;
}
</style>