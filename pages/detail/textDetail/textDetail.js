import WxParse from '../../../wxParse/wxParse.js'
import {pathJoinHost} from '../../../utils/util'
const app = getApp()

Page({
  data: {
    title: '',
    Host: app.globalData.Host
  },
  onLoad: function (e) {
    this.fetchData(e.id)
  },
  onShow: function () {
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
        console.log(res.data)
        this.setData({
          title: res.data.data[0].title
        })
        let content = decodeURIComponent(res.data.data[0].content)
        console.log(content)
        WxParse.wxParse('content', 'html', content, this)
      }
    })
  }
})