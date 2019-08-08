<template>
  <div>
  <div class="wrap_search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="服务ID">
        <el-input v-model="formInline.workId" placeholder="请输入搜索的ID"></el-input>
      </el-form-item>
      <el-form-item label="服务类型">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="所有类型" value=""></el-option>
          <el-option label="毕业大合照" value="毕业大合照"></el-option>
          <el-option label="化妆" value="化妆"></el-option>
          <el-option label="毕业跟拍" value="毕业跟拍"></el-option>
          <el-option label="个人写真" value="个人写真"></el-option>
          <el-option label="服装出租" value="服装出租"></el-option>
          <el-option label="造型" value="造型"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table
    :data="tableData"
    style="width: 100%"
    :max-height="tableHeight">
    <el-table-column
      fixed
      prop="workId"
      label="服务ID"
      >
    </el-table-column>
    <el-table-column
      prop="workTitle"
      label="服务标题"
      >
    </el-table-column>
    <el-table-column
      prop="price"
      label="服务价格"
      >
    </el-table-column>
    <el-table-column
      prop="serviceType"
      label="服务类型"
      >
    </el-table-column>
    <el-table-column
      prop="serviceWay"
      label="服务方式"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="发布人"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="checkRow(scope.$index, tableData)"
          type="text"
          size="small">
          查看
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          下架
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { Table, TableColumn, Button, Pagination, Input, Select, Option, Form, FormItem, MessageBox, message } from 'element-ui'
export default {
  name: 'ServiceManage',
  data () {
    return {
      tableData: [],
      tableHeight: null,
      currentPage: 1,
      searchId: '',
      searchTitle: '',
      formInline: {
        workId: '',
        region: ''
      },
      total: null
    }
  },
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElButton: Button,
    ElPagination: Pagination,
    ElInput: Input,
    ElSelect: Select,
    ElOption: Option,
    ElForm: Form,
    ElFormItem: FormItem
  },
  methods: {
    deleteRow (index, rows) {
      MessageBox.confirm('确定要下架该服务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('adminDeleteWorksAct', {
          workId: rows[index].workId
        })
          .then((res) => {
            if (res.data.success) {
              message({
                type: 'success',
                message: '操作成功'
              })
              rows.splice(index, 1)
              this.total--
            } else {
              message({
                type: 'error',
                message: '操作失败'
              })
            }
          }).catch(res => {
            console.log(res)
          })
      }).catch(() => {
        message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    checkRow (index, rows) {
      this.$router.push({name: 'ServiceDetail', params: {workId: rows[index].workId}})
    },
    getViewPort () {
      if (document.compatMode === 'BackCompat') { // 浏览器嗅探，混杂模式
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        }
      } else {
        return {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight
        }
      }
    },
    handleCurrentChange (val) {
      this.queryWorks(val)
      this.currentPage = val
    },
    search () {
      this.queryWorks(this.currentPage)
    },
    queryWorks (page) {
      this.$store.dispatch('adminqueryWorksAct', {
        num: page,
        workId: this.formInline.workId,
        serviceType: this.formInline.region
      })
        .then((res) => {
          if (res.data.success) {
            this.tableData = res.data.worksInfo
            this.total = res.data.total
          }
        }).catch(res => {
          console.log(res)
        })
    }
  },
  mounted: function () {
    this.tableHeight = this.getViewPort().height - 250
    this.queryWorks(this.currentPage)
  }
}
</script>

<style lang="scss" scoped>
  .el-pagination{
    margin-top:30px;
  }
  .wrap_search{
    .el-input{
      width:300px;
      margin-right:40px;
    }
    margin-bottom:20px;
  }
</style>
