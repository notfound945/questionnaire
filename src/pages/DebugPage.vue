<template>
  <q-layout view="lHh Lpr lFf">
    <q-page class="q-gutter-md">
      <div class="text-h5 text-center">Debug Page</div>
      <div class="col  flex-center q-gutter-md q-ma-md">
        <!--        API接口测试开始-->
        <div class="q-gutter-md">
          <div class="text-h5">接口测试</div>
          <q-separator/>
          <div class="q-gutter-md">
            <q-input outlined v-model="address" label="API地址"/>
            <q-btn color="primary" @click="request" label="请 求"/>
          </div>
        </div>
        <!--        API接口测试结束-->
        <!--        登录测试开始-->
        <div class="q-gutter-md">
          <div class="text-h5">登录测试</div>
          <q-separator/>
          <div class="row q-gutter-md">
            <q-input outlined v-model="validate" label="验证码" :rules="[
                     val => val && val.length > 0 || '请输入验证码',
                     val => val && val.length >= 4 || '验证码为4位',
                     val => val && val.length <= 4 || '验证码为4位'
                     ]">

              <template v-slot:append>
                <img alt="加载失败" title="看不清？更换一张" style="width: 100px; font-size: 15px; text-align: center"
                     :src="imgUrl">
              </template>
            </q-input>
          </div>
          <q-btn color="primary" @click="login" label="登录"/>
          <q-btn color="primary" @click="getValidate" label="获取验证码"/>
          <q-btn color="primary" @click="getLog" no-caps label="获取 log"/>
          <q-btn color="primary" @click="getUser" no-caps label="获取 all user"/>
          <q-btn color="primary" @click="exit" label="登出"/>
        </div>
        <!--        登录测试结束-->

        <div class="row">
          <div class="text-h5">登录测试</div>
          <q-separator/>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { getRequest, postRequest } from 'src/axios'
import _ from 'lodash'

export default {
  name: 'DebugPage',
  data () {
    return {
      validate: '',
      address: '',
      imgUrl: ''
    }
  },
  async mounted () {
    await getRequest('/api/getCaptchaImage', 'blob').then(res => {
      const blob = new Blob([res.data], { type: 'image/png;charset=utf-8' })
      this.imgUrl = window.URL.createObjectURL(blob)
    })
  },
  methods: {
    request () {
      console.log('Request Address => ', '/api/' + this.address)
      getRequest('/api/' + this.address).then(res => {
        console.log(res)
      }).catch(err => {
        console.error(err)
      })
    },
    login () {
      const params = {
        username: 'phl',
        password: '123456',
        validate: this.validate
      }
      postRequest('/api/login', params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    async getValidate () {
      await getRequest(
        '/api/getCaptchaImage', 'blob').then(result => {
        const blob = new Blob([result.data], { type: 'image/png;charset=utf-8' })
        this.imgUrl = window.URL.createObjectURL(blob)
        return result
      }).catch(() => {
        return null
      })
    },
    async getLog () {
      await getRequest('/api/log').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    async getUser () {
      const res = await getRequest('/api/user/all').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      if (_.isUndefined(res)) {
        console.log('无响应')
      }
    },
    async exit () {
      await getRequest('/api/logout').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
