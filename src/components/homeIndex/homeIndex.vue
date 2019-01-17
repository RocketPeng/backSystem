<template>
  <div>
    <el-button size="mini" type="primary" @click="addRow">添加项目</el-button>
    <el-button size="mini" type="primary" @click="handleClick" v-if="!showEdit">编辑</el-button>
    <el-button size="mini" type="primary" @click="handleFinish" v-if="showEdit">完成</el-button>
    <el-table :data="tableData" style="width: 100%">
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
          <el-input :value="scope.row.price" v-if="showEdit" v-model="scope.row[scope.column.property]"></el-input>
          <span v-if="!showEdit">{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template slot-scope="scope">
          <el-input :value="scope.row.description" v-if="showEdit" v-model="scope.row[scope.column.property]"></el-input>
          <span v-if="!showEdit">{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="image" label="图片" width="300">
        <template slot-scope="scope" >
          <img :src="scope.row.image" class="img-pic" v-if="!showEdit" alt="没有图片">
          <div v-if="showEdit" :key="scope.$index">
            <!-- <input type="file" @change="getFile"> -->
            <el-input type="text" placeholder="请输入图片地址" @change="showPic(scope.row.image)" v-model="scope.row[scope.column.property]"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="170">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
    handleClick () {
      this.showEdit = true
    },
    handleFinish () {
      for (let i in this.tableData) {
        if (this.tableData[i].name === '' || this.tableData[i].price === '' || this.tableData[i].image === '') {
          let num = parseInt(i)+1
          this.$message.error(`你的第${num}个商品还没填写完毕`)
          return
        }
      }
      this.showEdit = false
      this.$message({
          message: '修改成功',
          type: 'success'
        });
      //  修改成功后上传数据
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.showEdit = false
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
      //  删除完后需要上传一次数据
    },
    addRow () {
      let list = {
        "name": "",
        "price": 0,
        "description": "咸粥",
        "image": ""
      }
      this.tableData.unshift(list)
      this.showEdit = true
    },
    //     getFile (e) {
    //       let files = e.target.files
    //       console.log(files)
    //       可以获取到上传内的内容,需要变成base64才可以预览
    //     }
    showPic () {
      let values
      console.log(values)
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
  .imgwrapper{
    width: 100px
    height: 100px;
  }
  .imgwrapper img{
    width: 100%
  }
</style>
