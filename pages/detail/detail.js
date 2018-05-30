import wxService from '../../plugins/WxService'
import WxParse from '../../wxParse/wxParse.js'
const app = getApp()

Page({
  data: {
    title: '',
    Host: app.globalData.Host
  },
  onLoad: function (e) {
    this.fetchData(e.id)
  },

  fetchData(id){
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'article_info',
        id: id
      },
      success: (res) => {
        this.setData({
          title: res.data.data[0].title
        })
        WxParse.wxParse('content', 'html', decodeURIComponent(res.data.data[0].content), this)

      }
    })
  }
})