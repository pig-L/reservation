<template>
  <div class="wrap_login">
    <img src="../assets/bg2.jpg" alt="">
      <div class="login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
            <el-form-item label="用户" prop="user">
                <el-input v-model="ruleForm.user" type="text"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass"></el-input>
            </el-form-item>
            <el-form-item class="spec">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button, Message } from 'element-ui'
import md5 from 'js-md5'
export default {
  name: 'Login',
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button
  },
  data () {
    var checkUser = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('用户不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        user: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        user: [
          { validator: checkUser, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('adminLoginAct', {
            name: this.ruleForm.user,
            password: md5(this.ruleForm.pass)
          })
            .then((res) => {
              if (res.data.success) {
                this.$router.push({name: 'Index'})
                this.$store.dispatch('setUserInfoAct', res.data.info)
              } else {
                Message({
                  showClose: true,
                  message: res.data.message,
                  type: 'error'
                })
              }
            }).catch(res => {
              console.log(res)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
    .wrap_login{
        width:100%;
        height:100%;
        position:relative;
        img{
          width:100%;
        }
        .login{
            position:absolute;
            width:400px;
            right:10%;
            top:20%;
            background-color: white;
            border-radius: 20px;
        }
        form{
            padding: 50px 40px 10px 30px;
        }
        .el-button{
            margin-right: 15px;
        }
        .spec{
            text-align: center;
        }
    }
</style>
