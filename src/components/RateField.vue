<template>
  <div class="q-pa-md">
    <div class="text-subtitle1">问题 {{ no }} ：{{ title }}</div>
    <q-rating
      v-model="ratingModel"
      size="2em"
      :max="5"
      color="primary"
    />
  </div>
</template>

<script>
export default {
  name: 'RateField',
  props: ['title', 'no'],
  data () {
    return {
      ratingModel: null
    }
  }
}
</script>

<style scoped>

</style>
