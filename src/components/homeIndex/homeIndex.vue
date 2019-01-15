<template>
  <el-table :data="tableData" style="width: 100%" @cell-click="handleEdit()">
      <el-table-column type="index" label="序号" width="50">
    </el-table-column>
    <el-table-column prop="name" label="菜名" width="300">
      <template slot-scope="scope">
        <el-input :value="scope.row.name" v-if="showEdit" v-model="scope.row[scope.column.property]"></el-input>
        <span v-if="!showEdit">{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="price" label="价格" width="100">
      <template slot-scope="scope">
        <el-input :value="scope.row.price" v-if="showEdit"></el-input>
        <span v-if="!showEdit">{{scope.row.price}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="description" label="描述">
      <template slot-scope="scope">
        <el-input :value="scope.row.description" v-if="showEdit"></el-input>
        <span v-if="!showEdit">{{scope.row.description}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="image" label="图片" width="300">
      <template slot-scope="scope" >
        <img :src="scope.row.image" class="img-pic">
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="170">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-if="!showEdit">编辑</el-button>
        <el-button size="mini" @click="handleFinish(scope.$index, scope.row)" v-if="showEdit">完成</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [],
      showEdit: false,
      modelInfo: '',
      showButton: false
    }
  },
  methods: {
    handleEdit (index, row) {
      this.showEdit = true
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleFinish (index, row) {
      this.showEdit = false
    },
    handleCurrentChange () {
      console.log('hi')
      this.showEdit = true
    }
  },
  mounted () {
    axios.get('/api/goods').then(res => {
      res = res.data
      if (res && res.errno === 0) {
        Array.from(res.data).forEach(item => {
          Array.from(item.foods).forEach(item => {
            this.tableData.push(item)
          })
        })
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  .img-pic{
    width: 120px;
    height: 120px;
  }
</style>
