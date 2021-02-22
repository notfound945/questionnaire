<template>
  <div class="q-ma-md col" style="max-width: 300px">
    <div class="text-subtitle1">问题 {{ no }} ：{{ title }}</div>
    <div class="q-gutter-md">
      <q-select v-model="model" :options="content" label="请选择"/>
    </div>
    <div v-if="model != null" class="text-subtitle2">你的选择是：{{ sexSelect }}</div>
  </div>
</template>

<script>
export default {
  name: 'ListBoxField',
  props: ['title', 'no', 'content'],
  data () {
    return {
      model: null
    }
  },
  computed: {
    sexSelect: function () {
      console.log('Trigger computed')
      return this.model
    }
  }
}
</script>

<style scoped>

</style>
