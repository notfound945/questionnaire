<template>
  <div class="q-pa-md">
    <div class="text-subtitle1">问题 {{no}} ：{{ title }}</div>
    <q-file
      v-model="files"
      label="选择文件"
      outlined
      use-chips
      multiple
      style="max-width: 300px"
    />
  </div>
</template>

<script>
export default {
  name: 'FileUploadField',
  props: ['title', 'no'],
  data () {
    return {
      files: null
    }
  }
}
</script>

<style scoped>

</style>
