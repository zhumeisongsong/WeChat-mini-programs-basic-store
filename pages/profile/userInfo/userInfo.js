const app = getApp()

Page({
  data: {
    name: '',
    mobile: '',
    email: ''
  },
  onLoad: function (options) {

  },
  onReady: function () {
    wx.request({
      url: app.globalData.APIHost,
      data: {
        action: 'get_userinfo',
        guid: app.globalData.unionid,
      },
      success: (res) => {
        this.setData({
          email: res.data.email,
          mobile: res.data.mobile,
          name: res.data.user_name+''
        })
      }
    })
  },
  formSubmit: function(e) {
    wx.request({
      url: app.globalData.APIHost,
      data: {
        action: 'get_userinfo',
        guid: app.globalData.unionid,
      },
      success: (res) => {
        console.log(res)
      }
    })
  }
})