<template>
  <div class="login">
    <div class="login-wrap">
      <ul>
        <li
          class="menu__tab"
          :class="{ active: item.isActive }"
          v-for="(item, index) in menuItem"
          :key="index"
          @click="handleClick(item)"
        >
          {{ item.menuText }}
        </li>
      </ul>
    </div>
    <el-form
      size="small"
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="login-form"
    >
      <el-form-item prop="user">
        <label>邮箱</label>
        <el-input
          type="text"
          v-model="ruleForm.user"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <label>密码</label>
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          minlength="6"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" v-if="isLogin">
        <label>确认密码</label>
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          minlength="6"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <label>验证码</label>
        <el-row :gutter="12">
          <el-col :span="16">
            <el-input v-model="ruleForm.code"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="success" class="block">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          class="block login-btn"
          @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  stripscript,
  validatePassword,
  validateEmail,
  validateVCode
} from "@/utils/validate.js";
export default {
  name: "login",
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validateEmail(value)) {
        callback(new Error("你输入的邮箱格式有误"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      value = stripscript(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePassword(value)) {
        callback(new Error("请输入6到20位字母加数字的密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      value = stripscript(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      var reg = /^[a-z0-9]{6}$/;
      value = stripscript(value);
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (validateVCode(value)) {
        return callback(new Error("请输入6位数字加字母的验证码"));
      } else {
        callback();
      }
    };
    return {
      menuItem: [
        { menuText: "登录", isActive: true },
        { menuText: "注册", isActive: false }
      ],
      isLogin: false,
      ruleForm: {
        pass: "",
        checkPass: "",
        user: "",
        code: ""
      },
      rules: {
        user: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClick(data) {
      this.menuItem.forEach(function(item) {
        item.isActive = false;
        //要先把isActive全置为false
      });
      data.isActive = true;
      if (data.menuText === "登录") {
        this.isLogin = false;
      } else if (data.menuText === "注册") {
        this.isLogin = true;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #344a5f;
  height: 100vh;
  .login-wrap {
    text-align: center;
    .menu__tab {
      color: #fff;
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
    }
    .active {
      background-color: #2f4255;
    }
  }
  .login-form {
    width: 300px;
    margin: 33px auto;
    line-height: 36px;
    .el-form-item {
      line-height: 40px;
      margin-bottom: 8px;
      label {
        color: white;
        font-size: 14px;
      }
      .block {
        display: block;
      }
      .login-btn {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
