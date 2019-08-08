<template>
  <div>
  <div class="wrap_search">
    <el-input
    placeholder="请输入用户Id搜索"
    v-model="searchId"
    clearable>
    </el-input>
    <el-button type="primary" @click="search">查询</el-button>
  </div>
  <el-table
    :data="tableData"
    style="width: 100%"
    :max-height="tableHeight">
    <el-table-column
      fixed
      prop="userId"
      label="用户Id"
      >
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户昵称"
      >
    </el-table-column>
    <el-table-column
      prop="phoneNum"
      label="手机号"
      >
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      >
    </el-table-column>
    <el-table-column
      prop="jobType"
      label="身份"
      >
    </el-table-column>
    <el-table-column
      prop="identityNum"
      label="身份号"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="100"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { Table, TableColumn, Button, Pagination, Input, MessageBox, message } from 'element-ui'
export default {
  name: 'UserManage',
  data () {
    return {
      tableData: [],
      tableHeight: null,
      currentPage: 1,
      searchId: '',
      total: null
    }
  },
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElButton: Button,
    ElPagination: Pagination,
    ElInput: Input
  },
  methods: {
    deleteRow (index, rows) {
      MessageBox.confirm('确定删除该用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('adminDeleteUserAct', {
          userId: rows[index].userId
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
      this.currentPage = val
      this.search()
    },
    search () {
      this.$store.dispatch('adminqueryUserAct', {
        userId: this.searchId,
        num: this.currentPage
      })
        .then((res) => {
          if (res.data.success) {
            this.tableData = res.data.userInfo
            this.total = res.data.total
          }
        }).catch(res => {
          console.log(res)
        })
    }
  },
  mounted: function () {
    this.tableHeight = this.getViewPort().height - 250
    this.search()
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
