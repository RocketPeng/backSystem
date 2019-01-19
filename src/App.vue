<template>
  <div id="app">
    <el-container style="height:100%;border:1px solid #eee" v-show="loginSucc">
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
                <el-menu-item index="1">
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
              <router-view :adminPage="adminPage"></router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <div class="loginBox">
      <el-dialog title="登 录" :visible.sync="centerDialogVisible" width="30%" center>
        <span>用户名密码:admin</span>
        <span>顾客:guest</span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
           </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="login">登 录</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1',
      loginSucc: false,
      centerDialogVisible: true,
      form: {
        name: '',
        pass: ''
      },
      userTable: [
        {
          userName: 'admin',
          userPass: 'admin',
          level: 'admin',
        },
        {
          userName: 'guest',
          userPass: 'guest',
          level: 'guest',
        }
      ],
      adminPage: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    login () {
      if (this.form.name === '' && this.form.pass ===  '' ) {
        this.$message.error('请输入用户名和密码')
      } else if (this.form.name === '' ) {
        this.$message.error('请输入用户名')
      } else if (this.form.pass ===  '' ) {
        this.$message.error('请输入密码')
      } else {
        for (let i in this.userTable){
          if (this.userTable[i].userPass === this.form.pass && this.userTable[i].userName === this.form.name) {
            this.centerDialogVisible = false
            this.loginSucc = true
              if (this.userTable[i].level === 'admin') {
                this.adminPage = true
                this.$message({
                  message: '登录成功(管理者)',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '登录成功(顾客)',
                  type: 'success'
                })
              }
            return
          }else if (this.userTable.length-1 === parseInt(i) && this.userTable[i].userPass !== this.form.pass && this.userTable[i].userName !== this.form.name){
            this.$message.error('用户名或密码错误')
          }
        }
      }
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
