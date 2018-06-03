const app = getApp()

Page({
  data: {
    host: app.globalData.Host,
    src: ''
  },
  onLoad: function () {
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'get_imgpage'
      },
      success: res => {
        console.log(res)
        this.setData({
          src: res.data.img_page
        })
      }
    })
  }
})
