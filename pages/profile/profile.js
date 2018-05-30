const app = getApp()

Page({
  data: {
    icons: [
      {
        type: 'pay',
        src: '/images/icon-pay.png',
        text: '待付款'
      },
      {
        type: 'deliver',
        src: '/images/icon-deliver.png',
        text: '待配送'
      },
      {
        type: 'way',
        src: '/images/icon-way.png',
        text: '配送中'
      },
      {
        type: 'finish',
        src: '/images/icon-finish.png',
        text: '已完成'
      }
    ],
  },
  onLoad: function () {

  },
  goOrder(){
    wx.navigateTo({
      url: `../list/order/order`
    })
  },
  goAddress(){
    wx.navigateTo({
      url: './address/address'
    })
  },
  goProfile(){
    wx.navigateTo({
      url: './userInfo/userInfo'
    })
  },
  goCotact(){
    wx.navigateTo({
      url: './contact/contact'
    })
  }
})
