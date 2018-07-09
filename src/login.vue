<template>
    <div class="login-wrap" v-show="showLogin">
      <div style=" text-align: center;"> <img src="./assets/logo.png" ></div>
      <h3>登录</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
      <button v-on:click="login">登录</button>
    </div>
</template>

<style scoped>
  .login-wrap{
    margin-top: 100px;
    text-align:center;
    color: #2c3e50;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
     }
  input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
  p{color:red;}
  button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}
  span{cursor:pointer;}
  span:hover{color:#41b883;}
 body {

 }
</style>

<script>
  import {setCookie,getCookie} from './assets/js/cookie.js'
  import {signIn,getOrgIdByAccount}  from './api/request'
  export default{
    data(){
      return{

        showLogin: true,
        showRegister: false,
        showTishi: false,
        tishi: '',
        username: '',
        password: '',
        newUsername: '',
        newPassword: ''
      }
    },
    mounted(){
      console.log("------------sessionStorage---"+getCookie('user')/*sessionStorage.getItem("user")*/)

      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
     /* if (sessionStorage.getItem("user")!=null){
        this.$router.push('/home')
      }*/
      if(getCookie('user')!=''){
        this.$router.push('/home')
      }
    },
    methods:{
      login(){
        if(this.username == "" || this.password == ""){
          this.$message({
            type: 'info',
            message: '请输入账户或密码'
          });
        }else{
          let params = new URLSearchParams();
          params.append("loginid",this.username);
          params.append("password",this.password);
          signIn(params).then((res)=>{
            console.log(res)
            /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
            if(res.data.code==0){
              this.tishi = "用户名或密码不正确";
              this.showTishi = true
            }else{
              this.tishi = "登录成功"
              this.showTishi = true
              setCookie('user',this.username,1000*60)
            /*  sessionStorage.setItem("user",this.username)*/
              console.log(getCookie("user"));
             /* let para = {
                account:getCookie("user")
              };*/
             /* getOrgIdByAccount(para).then((res) => {
                 setCookie("orgId",res.data,1000*60)
              });*/
              setTimeout(function(){
                this.$router.push('/home')
              }.bind(this),1000)
            }
          })
        }
      }
    }
  }
</script>
