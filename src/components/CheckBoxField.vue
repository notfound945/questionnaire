<template>
  <div class="q-pa-md">
    <div class="text-subtitle1">问题 {{ no }} ：{{ title }}</div>
    <q-option-group
      v-model="result"
      :options="content"
      color="green"
      type="checkbox"
      :inline="inline"
    />
    <div v-if="result.length !== 0" class="text-subtitle2">你的选择是：{{ checkSelect }}</div>
  </div>
</template>

<script>
export default {
  name: 'CheckBoxField',
  props: ['title', 'no', 'content', 'inline'],
  data () {
    return {
      result: []
    }
  },
  computed: {
    checkSelect: function () {
      return this.result
    }
  }
}
</script>

<style scoped>

</style>
