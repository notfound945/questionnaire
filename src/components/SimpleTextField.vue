<template>
  <div class="q-pa-md q-gutter-md row items-center" style="max-width: 300px">
    <div class="text-subtitle1">问题 {{no}} ：</div>
    <q-input v-model="text" :label="title" />
  </div>
</template>

<script>
export default {
  name: 'SimpleTextField',
  props: ['title', 'no'],
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style scoped>

</style>
