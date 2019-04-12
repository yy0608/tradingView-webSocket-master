<template>
  <div id="trade-view">
  </div>
</template>

<script>
import { widget as TvWidget } from '../../../static/tradeview/charting_library/charting_library.min.js'
import socket from './datafeeds/socket.js'
import datafeeds from './datafeeds/datafees.js'
import config from '@/config'
export default {
  data() {
    return {
      klineInterval: '5m',
      curSymbol: 'ETH/BTC',
      widget: null,
      socket: new socket(config.wsPrefix + '/kdata_ws'),
      datafeeds: new datafeeds(this),
      symbol: null,
      interval: null,
      cacheData: {},
      lastTime: null,
      getBarTimer: null,
      isLoading: true
    }
  },
  created() {
    this.getKlineHistory()
    this.socket.doOpen()
    this.socket.on('open', () => {
      this.socket.send({ cmd: 'req', args: [`candle.M5.btcusdt}`, 1440, parseInt(Date.now() / 1000)] })
    })
    this.socket.on('message', this.onMessage)
  },
  methods: {
    init(symbol = 'BTCUSDT', interval = 5) {
      if (!this.widget) {
        this.widget = new TvWidget({
          symbol: symbol,
          interval: interval,
          // fullscreen: true,
          container_id: 'trade-view',
          datafeed: this.datafeeds,
          library_path: '/static/tradeview/charting_library/',
          disabled_features: [
            'header_symbol_search',
            'volume_force_overlay' // 显示右侧的volume量
          ],
          enabled_features: [],
          timezone: 'Asia/Shanghai',
          locale: 'zh',
          debug: false,
          fullscreen: true,
          theme: 'dark',
          overrides: {
            'symbolWatermarkProperties.color': 'rgba(0, 0, 0, 0)',
            'mainSeriesProperties.candleStyle.drawBorder': true,
            'mainSeriesProperties.candleStyle.borderUpColor': '#f00',
            'mainSeriesProperties.candleStyle.borderDownColor': '#f00',
            'paneProperties.legendProperties.showStudyValues': false,
            'paneProperties.legendProperties.showSeriesTitle': false
          }
        })
        this.widget.onChartReady(() => { // 显示MA数据线
          this.widgetMaFunc(this.widget, 5, 6, '#965fc4')
          this.widgetMaFunc(this.widget, 10, 6, '#84aad5')
          this.widgetMaFunc(this.widget, 30, 6, '#55b263')
          this.widgetMaFunc(this.widget, 60, 6, '#b7248a')
        })
        this.symbol = symbol
        this.interval = interval
      }
    },
    widgetMaFunc (widget, number, precision, color) {
      widget.chart().createStudy('Moving Average', false, false, [ number ], null, {
        precision,
        'plot.color.0': color
      })
    },
    sendMessage(data) {
      if (this.socket.checkOpen()) {
        this.socket.send(data)
      } else {
        this.socket.on('open', () => {
          this.socket.send(data)
        })
      }
    },
    unSubscribe(interval) {
      if (interval < 60) {
        this.sendMessage({ cmd: 'unsub', args: [`candle.M${interval}.${this.symbol.toLowerCase()}`, 1440, parseInt(Date.now() / 1000)] })
      } else if (interval >= 60) {
        this.sendMessage({ cmd: 'unsub', args: [`candle.H${interval / 60}.${this.symbol.toLowerCase()}`, 1440, parseInt(Date.now() / 1000)] })
      } else {
        this.sendMessage({ cmd: 'unsub', args: [`candle.D1.${this.symbol.toLowerCase()}`, 207, parseInt(Date.now() / 1000)] })
      }
    },
    subscribe() {
      if (this.interval < 60) {
        this.sendMessage({ cmd: 'sub', args: [`candle.M${this.interval}.${this.symbol.toLowerCase()}`] })
      } else if (this.interval >= 60) {
        this.sendMessage({ cmd: 'sub', args: [`candle.H${this.interval / 60}.${this.symbol.toLowerCase()}`] })
      } else {
        this.sendMessage({ cmd: 'sub', args: [`candle.D1.${this.symbol.toLowerCase()}`] })
      }
    },
    async getKlineHistory () {
      this.isLoadingHistory = true
      let from
      let to = Math.round(Date.now() / 1000)
      switch (this.klineInterval) {
        case '1m':
          from = to - 2 * 24 * 3600
          break
        case '5m':
          from = to - 1.5 * 2 * 24 * 3600
          break
        case '15m':
          from = to - 2.5 * 2 * 24 * 3600
          break
        case '30m':
          from = to - 5 * 2 * 24 * 3600
          break
        case '1h':
          from = to - 12 * 2 * 24 * 3600
          break
        case '4h':
          from = to - 50 * 2 * 24 * 3600
          break
        case '1day':
          from = to - 1500 * 2 * 24 * 3600
          break
        case '5day':
          from = to - 1500 * 2 * 24 * 3600
          break
      }
      const { data } = await this.$axios({
        url: config.marketHttpPrefix + '/kline_his',
        method: 'post',
        data: {
          channel: `${this.curSymbol}.kline.${this.klineInterval}`, // symbol: ETH/BTC
          from,
          to
        }
      })
      this.historyLoadInit = false
      this.isLoadingHistory = false
      console.log(data.sublist.length)
      let sublist = data.sublist.map(item => {
        item = {
          // time: new Date(item.date).getTime(),
          time: parseInt(item.time),
          close: parseFloat(item.close),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
          open: parseFloat(item.open),
          volume: parseFloat(item.volume),
          id: new Date(item.date).getTime() / 1000
          // id: parseInt(item.time) / 1000
        }
        return item
      })
      // {"time":1550886600000,"close":0.037182,"high":0.037187,"low":0.037182,"open":0.037187,"volume":4.4764,"id":1550886600}
      this.onMessage({ data: sublist })
    },
    onMessage(data) {
      // console.log(data)
      if (data.data && data.data.length) {
        const list = []
        const ticker = `${this.symbol}-${this.interval}`
        data.data.forEach(function (element) {
          list.push({
            time: this.klineWsval !== 'D' || this.klineWsval !== '1D' ? element.id * 1000 : element.id,
            open: parseFloat(element.open),
            high: parseFloat(element.high),
            low: parseFloat(element.low),
            close: parseFloat(element.close),
            // count: 10,
            // base_vol: 10,
            // quote_vol: 12,
            volume: parseFloat(element.volume)
          })
        }, this)
        this.cacheData[ticker] = list
        this.lastTime = list[list.length - 1].time
        this.subscribe()
      }
      if (data.type && data.type.indexOf(this.symbol.toLowerCase()) !== -1) {
        // console.log(' >> sub:', data.type)
        this.datafeeds.barsUpdater.updateData()
        const ticker = `${this.symbol}-${this.interval}`
        const barsData = {
          time: data.id * 1000,
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close,
          volume: data.quote_vol
        }
        if (barsData.time >= this.lastTime && this.cacheData[ticker] && this.cacheData[ticker].length) {
          this.cacheData[ticker][this.cacheData[ticker].length - 1] = barsData
        }
      }
    },
    getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback) {
      // console.log(' >> :', rangeStartDate, rangeEndDate)
      if (this.interval !== resolution) {
        this.unSubscribe(this.interval)
        this.interval = resolution
        if (resolution < 60) {
          this.sendMessage({ cmd: 'req', args: [`candle.M${this.interval}.${this.symbol.toLowerCase()}`, 1440, parseInt(Date.now() / 1000)] })
        } else if (resolution >= 60) {
          this.sendMessage({ cmd: 'req', args: [`candle.H${this.interval / 60}.${this.symbol.toLowerCase()}`, 1440, parseInt(Date.now() / 1000)] })
        } else {
          this.sendMessage({ cmd: 'req', args: [`candle.D1.${this.symbol.toLowerCase()}`, 800, parseInt(Date.now() / 1000)] })
        }
      }
      const ticker = `${this.symbol}-${this.interval}`
      if (this.cacheData[ticker] && this.cacheData[ticker].length) {
        this.isLoading = false
        const newBars = []
        this.cacheData[ticker].forEach(item => {
          if (item.time >= rangeStartDate * 1000 && item.time <= rangeEndDate * 1000) {
            newBars.push(item)
          }
        })
        onLoadedCallback(newBars)
      } else {
        const self = this
        this.getBarTimer = setTimeout(function () {
          self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback)
        }, 10)
      }
    }
  }
}
</script>

