<template>
  <div class="wrap_table">
    <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="服务标题：">
            <el-input v-model="form.workId" readonly></el-input>
        </el-form-item>
        <el-form-item label="服务标题：">
            <el-input v-model="form.workTitle" readonly></el-input>
        </el-form-item>
        <el-form-item label="价格：">
            <el-input v-model="form.price" readonly></el-input>
        </el-form-item>
        <el-form-item label="服务类型：">
            <el-input v-model="form.serviceType" readonly></el-input>
        </el-form-item>
        <el-form-item label="服务方式：">
            <el-input v-model="form.serviceWay" readonly></el-input>
        </el-form-item>
        <el-form-item label="可预约开始时间：">
            <el-input v-model="form.enableDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="可预约结束时间：">
            <el-input v-model="form.enableEDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="服务时长：">
            <el-input v-model="form.totalTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="最大预约人数：">
            <el-input v-model="form.limitNum" readonly></el-input>
        </el-form-item>
        <el-form-item label="赠送服务：">
            <el-input v-model="form.freeService" readonly></el-input>
        </el-form-item>
        <el-form-item label="预约需求：">
            <el-input v-model="form.request" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系方式：">
            <el-input v-model="form.connextWay" readonly></el-input>
        </el-form-item>
        <el-form-item label="发布者：">
            <el-input v-model="form.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="发布时间：">
            <el-input v-model="form.releaseTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="套餐：">
            <div v-for="(v,i) in item" :key="i">{{v.itemContent}}</div>
        </el-form-item>
        <el-form-item label="作品图：">
            <img :src=v.imgUrl alt="" v-for="(v,i) in imgData" :key="i">
        </el-form-item>
        <el-form-item class="specific">
            <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Button, Input } from 'element-ui'
export default {
  name: 'ServiceDetail',
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElButton: Button,
    ElInput: Input
  },
  data () {
    return {
      form: {
      },
      item: [],
      imgData: [],
      workId: null
    }
  },
  mounted: function () {
    if (this.$route.params.workId) {
      this.workId = this.$route.params.workId
      sessionStorage.setItem('workId', this.workId)
    } else {
      this.workId = sessionStorage.getItem('workId')
    }
    this.$store.dispatch('querySingleWorkAct', {workId: this.workId})
      .then((res) => {
        if (res.data.success) {
          this.form = res.data.info[0]
          this.form.releaseTime = this.getDuring(new Date(this.form.releaseTime), 'yyyy-MM-dd hh:mm:ss')
          this.imgData = res.data.imgData
          this.item = res.data.item
        }
      }).catch(res => {
        console.log(res)
      })
  },
  methods: {
    getDuring (date, fmt) {
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      return fmt
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap_table{
    form{
        width:700px;
        margin:0 auto;
        color: #606266;
        img{
          width:50%;
          height:auto;
        }
    }
    .specific{
        text-align: center;
    }
}
</style>
