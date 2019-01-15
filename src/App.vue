<template>
  <div id="app">
    <el-container style="height:100%;border:1px solid #eee">
      <el-header height="62px">
        <div class="img-wrapper">
          <img src="@/assets/logo.fdb9ad2.png" alt="">
        </div>
        <div class="user-img">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-submenu index="2">
              <template slot="title">账户信息</template>
              <el-menu-item index="2-1" >修改密码</el-menu-item>
              <el-menu-item index="2-2" >退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col>
              <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">主页</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <div class="content-wrapper">
              <router-view/>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='stylus' scoped>
  #app{
    height: 100%;
  }
  .el-header{
    background-color: #fff;
    border: 1px solid #E9EEF3;
    color: #333;
    line-height: 60px;
    box-shadow: 0 1px 1px #eee;
  }
  .el-aside {
    position: fixed;
    height: 100%;
    background-color: #D3DCE6;
    color: #333;
  }
  .el-main {
    position: relative;
    box-sizing: border-box;
    margin-left: 200px;
    padding:15px 15px 0 15px;
    background-color: #eee;
    color: #333;
  }
  .img-wrapper
    position: absolute
    top: -25px;
    left: 30px;
    width: 140px;
    height: 120px;
    img
      width: 100%
  .content-wrapper
    box-sizing: border-box;
    min-height: 100%
    background-color: #fff
    border-radius: 2px;
    padding: 20px 20px 0 20px;
  .user-img
    float: right;
    margin-right: 20px
</style>
