<template>
  <div class="column q-gutter-md">
    <q-card class="login-card column q-pa-md fixed-center items-center">
      <div class="title">
        <div class="q-ma-md text-h5 text-center" style="height: 30px">请登录</div>
      </div>
      <q-card-section class="col items-center">
        <q-form ref="loginForm"
                @submit="login"
                class="q-gutter-md"
        >
          <!--           用户名框-->
          <div>
            <q-input outlined v-model="username" label="用户名"
                     :rules="[
                      val => val && val.length > 0 || '请输入用户名',
                      val => val && val.length <= 10 || '用户名长度不应为10个字符以上']">
            </q-input>
          </div>
          <!--           密码框-->
          <div>
            <q-input v-model="password" outlined label="密码" :type="isPwd ? 'password' : 'text'" lazy-rules
                     :rules="[
                     val => val && val.length > 0 || '请输入密码',
                     val => val && val.length >= 6 || '密码最少为6位',
                     val => val && val.length <= 20 || '密码长度不会超过20位']">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <!--           验证码框-->
          <transition
            appear
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
          >
            <div v-if="password.length >= 6">
              <div class="row justify-between items-center">
                <q-input outlined v-model="validate" label="验证码" :rules="[
                     val => val && val.length > 0 || '请输入验证码',
                     val => val && val.length >= 4 || '验证码为4位',
                     val => val && val.length <= 4 || '验证码为4位'
                     ]">
                  <template v-slot:append>
                    <img alt="加载失败" title="看不清？更换一张" @click="changeValidate" style="width: 100px; font-size: 15px; text-align: center" :src="imgUrl">
                  </template>
                </q-input>
              </div>
            </div>
          </transition>
          <div class="row justify-center">
            <q-btn class="full-width" label="登 录" type="submit" size="lg" color="primary"/>
          </div>
          <div class="row justify-center">
            <q-btn flat class="full-width" style="color: #FF0080" label="注 册" size="lg"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
import { postRequest, getRequest } from 'src/axios'
import { Notify } from 'quasar'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      // 表单密码
      password: '',
      // 验证码
      validate: '',
      // 验证图片
      verifyImage: null,
      // 显示密码
      text: '',
      isPwd: true,
      // 底部弹出用户名复制窗口
      seamless: false,
      // 验证码图片地址
      imgUrl: ''
    }
  },
  async mounted () {
    // 加载验证码
    this.verifyImage = await getRequest(
      '/api/getCaptchaImage', 'blob').then(result => {
      return result.data
    }).catch(() => {
      return null
    })
    const blob = new Blob([this.verifyImage], { type: 'image/png;charset=utf-8' })
    this.imgUrl = window.URL.createObjectURL(blob)
  },
  methods: {
    login () {
      const params = {
        username: this.username,
        password: this.password,
        validate: this.validate
      }
      postRequest('/api/login', params).then(res => {
        if (res.data.requestCode === 200) {
          console.log('登录成功')
          Notify.create({
            position: 'top',
            color: 'green-4',
            textColor: 'white',
            icon: 'sentiment_very_satisfied',
            message: res.data.responseRemark
          })
        } else {
          if (res) {
            Notify.create({
              position: 'top',
              color: 'red-4',
              textColor: 'white',
              icon: 'cancel',
              message: res.data.responseRemark
            })
          } else {
            Notify.create({
              position: 'top',
              color: 'red-6',
              textColor: 'white',
              icon: 'cancel',
              message: '登录异常'
            })
          }
        }
      }).catch(err => {
        console.error(err)
      })
    },
    async changeValidate () {
      this.verifyImage = null
      this.imgUrl = null
      // 加载验证码
      this.verifyImage = await getRequest(
        '/api/getCaptchaImage', 'blob').then(result => {
        return result.data
      }).catch(() => {
        return null
      })
      const blob = new Blob([this.verifyImage], { type: 'image/png;charset=utf-8' })
      this.imgUrl = window.URL.createObjectURL(blob)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
