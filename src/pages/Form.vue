<template>
  <div class="q-ma-md q-gutter-md">
    <div class="text-h5 text-center">动态表单测试</div>
    <q-btn color="primary" @click="list.push(1)" label="添加文本框"/>
    <q-btn color="primary" @click="list.push(2)" label="添加单选"/>
    <div v-for="(n, index) in list" v-bind:key="index">
      <SimpleTextField v-if="n === 1" title="姓名" v-bind:no="index"></SimpleTextField>
      <RadioField v-else-if="n === 2" title="你最喜欢的明星是？" v-bind:no="index"></RadioField>
    </div>
  </div>
</template>

<script>

import SimpleTextField from 'components/SimpleTextField'
import RadioField from 'components/RadioField'

export default {
  name: 'Form',
  components: {
    RadioField,
    SimpleTextField
  },
  data () {
    return {
      list: [],
      text_num: 0,
      radio_num: 0
    }
  }
}
</script>

<style scoped>

</style>
