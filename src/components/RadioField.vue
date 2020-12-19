<template>
  <div class="q-pa-md">
    <div class="text-subtitle1">问题 {{no}} ：</div>
    <div class="q-gutter-sm">
      <q-radio v-model="shape" val="line" label="Line" />
      <q-radio v-model="shape" val="rectangle" label="Rectangle" />
      <q-radio v-model="shape" val="ellipse" label="Ellipse" />
      <q-radio v-model="shape" val="polygon" label="Polygon" />
    </div>
    <div class="q-px-sm">
      {{title}} <strong>{{ shape }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioField',
  props: ['title', 'no'],
  data () {
    return {
      shape: 'line'
    }
  }
}
</script>

<style scoped>

</style>
