<template>
  <div id="app">
    <trade-view ref="trade"></trade-view>
  </div>
</template>

<script>
import TradeView from './components/TradeView'
export default {
  name: 'App',
  components: {
    TradeView
  },
  mounted() {
    this.$refs.trade.init('BTCUSDT', 5)
  }
}
</script>

<style lang="scss">
@import "../static/css/normalize.css";
@import "../static/css/main.scss";
</style>
