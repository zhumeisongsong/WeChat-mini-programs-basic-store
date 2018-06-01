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

setStrMarke=function(str,subStr,indexs) {
  var string = str
  for (var i = 0; i < indexs.length; i++) {
    var s = app.globalData.Host
    string = string.substring(0, indexs[i]) + s + string.substring(indexs[i] + subStr.length, string.length);
  }
  return string;
}