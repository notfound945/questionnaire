<template>
  <div class="q-pa-md" style="max-width: 500px">
    <div class="text-subtitle1">问题 {{no}} ：{{title}}</div>
    <q-input
      v-model="text"
      filled
      autogrow
      type="textarea"
    />
  </div>
</template>

<script>
export default {
  name: 'TextAreaField',
  props: ['title', 'no'],
  data () {
    return {
      text: '默认内容'
    }
  }
}
</script>

<style scoped>

</style>
