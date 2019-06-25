<template>
  <div class="index">
    <Layout></Layout>
    <div class="main">
      <el-table
        :data="tableData"
        :height='tableHeight'
        border
        style="width: 100%;margin-top:70px"
      >
        <el-table-column
          prop="userId"
          label="ID"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mobileNo"
          label="用户名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="password"
          label="密码"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Layout from '@/views/Layout.vue'
import Api from '@/common/api.js'
export default {
  data() {
    return {
      tableData: [],
      tableHeight: window.innerHeight - 70
    }
  },
  components: {
    Layout
  },
  methods: {
    async getLIst() {
      this.tableData = await Api.userList.get({ pageSize: 100 }).then(res => res.data.rows)
    }
  },
  mounted() {
    this.getLIst()
  }
}
</script>
<style lang="scss">
  .el-table--border {
    border-bottom: 1px solid #ebeef5;
  }
</style>
