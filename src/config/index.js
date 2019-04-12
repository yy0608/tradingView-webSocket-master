// let apiPrefix = window.location.protocol
let apiPrefix = ''
let uploadPrefix = ''
let staticPrefix = ''
let wsPrefix = ''
let marketHttpPrefix = '' // 行情
let chatPrefix = '' // 聊天
let orderHttpPrefix = '' // 下单
let coinHttpPrefix = '' // 币对
let noticeWsPrefix = '' // 通知的订阅，包括成交、资产、撤单

if (process.env.NODE_ENV === 'development') {
  apiPrefix = 'http://192.168.10.54:9001'
  uploadPrefix = 'http://192.168.10.31:9999'
  staticPrefix = 'http://192.168.10.31/'
  // wsPrefix = 'ws://192.168.10.242:10000' // 火币
  wsPrefix = 'ws://192.168.10.242:8089' // 自己
  chatPrefix = 'ws://192.168.10.54:9001' // 54环境
  // chatPrefix = 'ws://192.168.10.243:9001' // sit环境
  // marketHttpPrefix = 'http://192.168.10.242:30055' // 火币
  marketHttpPrefix = 'http://192.168.10.242:30042' // 自己
  orderHttpPrefix = 'http://192.168.10.242:30060'
  coinHttpPrefix = 'http://192.168.10.64:20060'
  noticeWsPrefix = 'ws://192.168.10.242:9099'

  // apiPrefix = 'http://192.168.10.243:9001' // sit
  // uploadPrefix = 'http://192.168.10.31:9999'
  // staticPrefix = 'http://192.168.10.31/'
  // wsPrefix = 'ws://192.168.10.35:8089' // sit
  // chatPrefix = 'ws://192.168.10.243:9001' // sit环境
  // marketHttpPrefix = 'http://192.168.10.35:30042' // sit
  // orderHttpPrefix = 'http://192.168.10.35:30060' // sit
  // coinHttpPrefix = 'http://192.168.10.36:6789' // sit
  // noticeWsPrefix = 'ws://192.168.10.35:8099' // sit
} else {
  switch (process.env.type) {
    case 'test':
      apiPrefix = 'http://192.168.10.54:9001'
      uploadPrefix = 'http://192.168.10.31:9999'
      staticPrefix = 'http://192.168.10.31/'
      // wsPrefix = 'ws://192.168.10.242:10000' // 火币
      wsPrefix = 'ws://192.168.10.242:8089' // 自己
      chatPrefix = 'ws://192.168.10.54:9001' // 54环境
      // chatPrefix = 'ws://192.168.10.243:9001' // sit环境
      // marketHttpPrefix = 'http://192.168.10.242:30055' // 火币
      marketHttpPrefix = 'http://192.168.10.242:30042' // 自己
      orderHttpPrefix = 'http://192.168.10.242:30060'
      coinHttpPrefix = 'http://192.168.10.64:20060'
      noticeWsPrefix = 'ws://192.168.10.242:9099'

      // apiPrefix = 'http://192.168.10.54:9001'
      // uploadPrefix = 'http://192.168.10.31:9999'
      // staticPrefix = 'http://192.168.10.31/'
      // // wsPrefix = 'ws://192.168.10.242:10000' // 火币
      // wsPrefix = 'ws://192.168.10.242:8089' // 自己
      // chatPrefix = 'ws://192.168.10.54:9001' // 54环境
      // // chatPrefix = 'ws://192.168.10.243:9001' // sit环境
      // // marketHttpPrefix = 'http://192.168.10.242:30055' // 火币
      // marketHttpPrefix = 'http://192.168.10.242:30042' // 自己
      // orderHttpPrefix = 'http://192.168.10.242:30060'
      // coinHttpPrefix = 'http://192.168.10.64:20060'
      // noticeWsPrefix = 'ws://192.168.10.242:9099'
      break
    case 'sit1':
      apiPrefix = 'http://192.168.10.243:9001' // sit
      uploadPrefix = 'http://192.168.10.31:9999'
      staticPrefix = 'http://192.168.10.31/'
      wsPrefix = 'ws://192.168.10.35:8089' // sit
      chatPrefix = 'ws://192.168.10.243:9001' // sit环境
      marketHttpPrefix = 'http://192.168.10.35:30042' // sit
      orderHttpPrefix = 'http://192.168.10.35:30060' // sit
      coinHttpPrefix = 'http://192.168.10.36:6789' // sit
      noticeWsPrefix = 'ws://192.168.10.35:8099' // sit
      break
    case 'sit':
      apiPrefix = 'http://192.168.10.54:9001'
      uploadPrefix = 'http://192.168.10.31:9999'
      staticPrefix = 'http://192.168.10.31/'
      wsPrefix = 'ws://192.168.10.64:8089'
      marketHttpPrefix = 'http://192.168.10.242:20042'
      orderHttpPrefix = 'http://192.168.10.242:30060'
      coinHttpPrefix = 'http://192.168.10.64:20060'
      break
    case 'uat':
      apiPrefix = 'http://192.168.10.54:9001'
      uploadPrefix = 'http://192.168.10.31:9999'
      staticPrefix = 'http://192.168.10.31/'
      wsPrefix = 'ws://192.168.10.64:8089'
      marketHttpPrefix = 'http://192.168.10.64:20042'
      orderHttpPrefix = 'http://192.168.10.242:30060'
      coinHttpPrefix = 'http://192.168.10.64:20060'
      break
    case 'pro':
      apiPrefix = 'http://192.168.10.54:9001'
      uploadPrefix = 'http://192.168.10.31:9999'
      staticPrefix = 'http://192.168.10.31/'
      wsPrefix = 'ws://192.168.10.64:8089'
      marketHttpPrefix = 'http://192.168.10.64:20042'
      orderHttpPrefix = 'http://192.168.10.242:30060'
      coinHttpPrefix = 'http://192.168.10.64:20060'
      break
    default:
      apiPrefix = 'http://192.168.10.54:9001'
      uploadPrefix = 'http://192.168.10.31:9999'
      staticPrefix = 'http://192.168.10.31/'
      wsPrefix = 'ws://192.168.10.64:8089'
      marketHttpPrefix = 'http://192.168.10.64:20042'
      orderHttpPrefix = 'http://192.168.10.242:30060'
      coinHttpPrefix = 'http://192.168.10.64:20060'
      break
  }
}

export default {
  apiPrefix,
  uploadPrefix,
  staticPrefix,
  wsPrefix,
  chatPrefix,
  marketHttpPrefix,
  orderHttpPrefix,
  coinHttpPrefix,
  noticeWsPrefix,
  limit: 5,
  excludePermissionUrls: [ '/', '/index.html', '/entrance.html', '/bb.html', '/c2c.html', '/help.html', '/article_detail.html', '/abm.html', '/tool.html', '/stipulation.html' ],
  appealReasons: [
    {
      value: 1,
      label: '对方一直未放币'
    },
    {
      value: 2,
      label: '对方存在欺诈行为'
    },
    {
      value: 3,
      label: '对方通过其他方式引导我付款'
    },
    {
      value: 4,
      label: '对方付款金额跟订单金额不符'
    },
    {
      value: 5,
      label: '对方未付款'
    },
    {
      value: 6,
      label: '其它'
    }
  ],
  countryCodeArr: {
    'cn': '中国'
  },
  adOrderStatusMap: ['待付款', '待放币', '申诉中', '已取消', '已完成'], // 0：待付款；1：待放币 2:申诉中 3:已取消,4:已完成
  orderStatus: [ // 订单状态合集
    '挂单中',
    '挂单交易中',
    '交易完成',
    '挂单撤单中',
    '撤单成功',
    '撤单失败',
    '挂单部分成交',
    '挂单部分撤销'
  ],
  bbErrorCodeArr: {
    '-1': '未知错误',
    '0': '成功',
    '1': '参数错误',
    '2': '请求地址错误',
    '3': '系统错误',
    '10215': '认证失败',
    '30050': '订单不存在',
    '30051': '锁定资产失败',
    '30052': '查询资产失败',
    '30053': '币对已停盘',
    // '30054': '买入价格超过最新成交控制价',
    '30054': '买入价不能大于最新成交价的120%',
    '30055': '卖出价不能低于最新成交价的80%',
    '30200': '用户没有币币资产',
    '30201': '用户没有该币种资产',
    '30202': '用户币种资产不足',
    '30203': '数据库异常',
    '30204': '超出了最大数量',
    '30205': '冻结资产不足',
    '30206': '量不能为负',
    '30207': '价不能为负'
  }
}
