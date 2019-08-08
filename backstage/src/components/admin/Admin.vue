<template>
  <div>
    <div class="wrap_button"><el-button type="primary" @click="$router.push({name: 'AddAdmin'})">新增</el-button></div>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
        label="管理员Id"
        prop="adminId"
        >
        </el-table-column>
        <el-table-column
        label="管理员名称"
        prop="adminName"
        >
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Table, TableColumn, Button } from 'element-ui'
export default {
  name: 'Admin',
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElButton: Button
  },
  data () {
    return {
      tableData: [
        {
          adminId: '8937498739473847389473894',
          adminName: '了快捷快递分开了的'
        }
      ]
    }
  },
  methods: {
    handleDelete (index, rows) {

    }
  }
}
</script>

<style lang="scss" scoped>
    .wrap_button{
        padding:20px;
    }
</style>
