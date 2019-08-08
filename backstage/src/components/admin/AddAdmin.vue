<template>
  <div class="wrap_add">
    <div class="wrap_back">
        <div>新增管理员</div>
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="管理员名称" prop="user">
            <el-input v-model="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button, Message } from 'element-ui'
import md5 from 'js-md5'
export default {
  name: 'AddAdmin',
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button
  },
  data () {
    var checkUser = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('管理员名称不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        user: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
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
          this.$store.dispatch('addAdminAct', {
            name: this.ruleForm.user,
            password: md5(this.ruleForm.pass)
          })
            .then((res) => {
              if (res.data.success) {
                Message({
                  showClose: true,
                  message: res.data.message,
                  type: 'success'
                })
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
    .wrap_add{
        .el-form {
            width:400px;
            margin:50px auto;
        }
    }
    .wrap_back{
        font-size:22px;
        div{
            padding-bottom:20px;
        }
    }
</style>
