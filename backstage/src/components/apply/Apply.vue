<template>
  <div>
    <template>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            label="申请人"
            >
            <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="身份证号码"
            >
            <template slot-scope="scope">
                <span>{{ scope.row.identityNum }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="身份证正面图片"
            >
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                <img :src=scope.row.idenImgInfr alt="">
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">查看图片</el-tag>
                </div>
                </el-popover>
            </template>
            </el-table-column>
            <el-table-column
            label="身份证背面图片"
            >
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                <img :src=scope.row.idenImgBack alt="">
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">查看图片</el-tag>
                </div>
                </el-popover>
            </template>
            </el-table-column>
            <el-table-column
            label="身份证明"
            >
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                <img :src=scope.row.licenseImg alt="">
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">查看图片</el-tag>
                </div>
                </el-popover>
            </template>
            </el-table-column>
            <el-table-column
            label="设备图片"
            >
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                <img :src=scope.row.deviceImg alt="">
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">查看图片</el-tag>
                </div>
                </el-popover>
            </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">同意</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
            </template>
            </el-table-column>
        </el-table>
    </template>
  </div>
</template>

<script>
import { Table, TableColumn, Popover, Button, Tag, Message } from 'element-ui'
export default {
  name: 'Apply',
  data () {
    return {
      tableData: []
    }
  },
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElPopover: Popover,
    ElButton: Button,
    ElTag: Tag
  },
  mounted: function () {
    this.findApply()
  },
  methods: {
    handleEdit (index, row) {
      this.$store.dispatch('dealApplyAct', {
        type: 1,
        apId: row.apId
      })
        .then((res) => {
          if (res.data.success) {
            Message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
            this.findApply()
          } else {
            Message({
              showClose: true,
              message: '操作失败',
              type: 'error'
            })
          }
        }).catch(res => {
          console.log(res)
        })
    },
    handleDelete (index, row) {
      this.$store.dispatch('dealApplyAct', {
        type: 2,
        apId: row.apId
      })
        .then((res) => {
          if (res.data.success) {
            Message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
            this.findApply()
          } else {
            Message({
              showClose: true,
              message: '操作失败',
              type: 'fail'
            })
          }
        }).catch(res => {
          console.log(res)
        })
    },
    findApply () {
      this.$store.dispatch('queryApplyAct')
        .then((res) => {
          if (res.data.success) {
            this.tableData = res.data.applyInfo
          }
        }).catch(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  img{
    width:50%;
  }
</style>
