<template>
  <q-page class="flex flex-center">
<!--    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >-->
    <div id="echarts" style="height: 500px; width: 800px"></div>
    <canvas id="canvas"></canvas>
    <img id="qrcode"/>
  </q-page>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'PageIndex',
  data () {
    return {
      title: 'Demo'
    }
  },
  async mounted () {
    var echarts = require('echarts')
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echarts'))
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })

    // 生成二维码
    const canvas = document.getElementById('canvas')
    QRCode.toCanvas(canvas, 'www.notfound945.cn', { errorCorrectionLevel: 'H' }, function (error) {
      if (error) console.error(error)
      console.log('Generate QRCode success!')
    })
    // ES6方法 generateQR('text', {})
    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 0.3,
      margin: 1
      // color: {
      //   dark: '#010599FF',
      //   light: '#FFBF60FF'
      // }
    }
    const generateQR = async text => {
      try {
        const res = await QRCode.toDataURL(text, opts)
        return res
      } catch (err) {
        console.error(err)
      }
    }
    const qrcodeUrl = await generateQR('https://notfound945')
    // document.getElementById('qrcode').src = qrcodeUrl
    console.log('QRCode url ', qrcodeUrl)
  }
}
</script>
<style lang="sass" scoped>

</style>
