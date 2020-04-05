<template>
  <div class="view-login">
    <h2 class="title-top">在线民主推荐考察系统</h2>
    <p class="tip">
      本次在线推荐和评测采用匿名的方式，用户名/密码随机生成，不记录任何个人信息，请放心填写
    </p>
    <div>
      <van-field v-model="username"
                 :left-icon="icon1"
                 type="text"
                 placeholder="请输入用户名"
                 :border="true"
                 size="large" />

      <van-field :border="true"
                 v-model="password"
                 :left-icon="icon2"
                 type="password"
                 size="large"
                 placeholder="请输入密码" />
    </div>
    <van-button type="primary"
                class="btn"
                color="#3692F3"
                @click="submit">登录</van-button>
  </div>
</template>
<script>

import { CellGroup, Field, Button } from 'vant'
import { Toast } from 'mand-mobile'
import axios from 'axios'
export default {
  name: 'login',
  components: {
    VanCellGroup: CellGroup,
    VanField: Field,
    VanButton: Button
  },
  created () {

  },
  data () {
    return {
      params: {},
      username: '',
      password: '',
      icon1: require('../../assets/img/icon_user.png'),
      icon2: require('../../assets/img/icon_pwd.png')
    }
  },

  methods: {
    login () {
      axios.get('/static/data/data1.json').then(res => {
        console.log(res)
        if (res.data.reCode === '0000') {
          this.params = res.data
          this.$router.push({ name: 'evaluation', params: this.params })
        }
      })
    },
    submit () {
      if (!this.username) {
        Toast.info('用户名不能为空！')
        return
      }
      if (!this.password) {
        Toast.info('密码不能为空！')
        return
      }
      this.login()
    }
  }
}
</script>
<style lang="less">
.view-login {
  position: fixed;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  .title-top {
    color: #030303;
    font-size: 21px;
    padding: 20px 0 0 0;
    margin: 0px;
    align-self: center;
  }
  .tip {
    color: #838383;
    font-size: 14px;
    padding: 16px 15px;
    line-height: 1.9129;
  }
  .van-cell {
    height: 48px;
    line-height: 48px;
    align-items: center;
    .van-cell__value {
      display: flex;
      align-items: center;
      flex-direction: row;
    }
    .van-icon {
      display: flex;
      align-items: center;
    }
    .van-icon__image {
      width: 25px;
      height: 25px;
    }
  }
  .van-cell:last-child {
    margin-top: 16px;
  }
  .van-cell::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0.4rem;
    border-bottom: 0.025rem solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .btn {
    margin: 74px 15px auto 15px;
  }
}
</style>
