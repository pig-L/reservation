<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="投诉原因：">
                <span>{{ props.row.cpContent }}</span>
            </el-form-item>
            <el-form-item label="投诉证据：">
                <img :src="v" alt="" v-for="(v,i) in props.row.cpimg.split(',')" :key="i">
            </el-form-item>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column
        label="投诉人"
        prop="userName"
        width="150px">
        </el-table-column>
        <el-table-column
        label="投诉商家"
        prop="name"
        width="150px">
        </el-table-column>
        <el-table-column
        label="投诉原因"
        prop="cpContent">
        </el-table-column>
        <el-table-column
        label="投诉时间"
        prop="cpTime"
        width="170px">
         <template slot-scope="scope">
           {{scope.row.cpTime | getDuring('yyyy-MM-dd hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">已审阅</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDeleteWork(scope.$index, scope.row)">下架该服务</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDeleteUser(scope.$index, scope.row)">删除该商家</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Table, TableColumn, Button, Form, FormItem, MessageBox, message } from 'element-ui'
export default {
  name: 'Complaint',
  data () {
    return {
      tableData: []
    }
  },
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElButton: Button,
    ElForm: Form,
    ElFormItem: FormItem
  },
  mounted: function () {
    this.$store.dispatch('queryComplaintAct')
      .then((res) => {
        if (res.data.success) {
          this.tableData = res.data.complaintInfo
        }
      }).catch(res => {
        console.log(res)
      })
  },
  methods: {
    handleEdit (index, row) {
      MessageBox.confirm('确定执行已查阅操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dealComplaint(3, row.cpId, null, index)
      }).catch(() => {
        message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleDeleteWork (index, row) {
      MessageBox.confirm('确定下架该服务', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dealComplaint(1, row.cpId, row.workId, index)
      }).catch(() => {
        message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleDeleteUser (index, row) {
      MessageBox.confirm('确定删除该商家', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dealComplaint(2, row.cpId, row.merchatId, index)
      }).catch(() => {
        message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    dealComplaint (type, cpId, tId, index) {
      this.$store.dispatch('dealComplaintAct', {
        type: type,
        cpId: cpId,
        tId: tId
      })
        .then((res) => {
          if (res.data.success) {
            message({
              type: 'success',
              message: '操作成功'
            })
            this.tableData.splice(index, 1)
          } else {
            message({
              type: 'error',
              message: '操作失败'
            })
          }
        }).catch(res => {
          console.log(res)
        })
    }
  },
  filters: {
    getDuring (data, fmt) {
      var date = new Date(data)
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
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-form-item__content{
      img{
          width:25%;
          height:auto;
          &:hover{
              width:50%;
          }
      }
  }
  .demo-table-expand .el-form-item{
    margin-right:20px;
    width:100%;
  }
</style>
