const app = getApp()

Page({
  data: {
    host: app.globalData.Host,
    data: [],
    count: null,
    pageindex: 1,
    callbackcount: 20
  },
  onLoad: function () {

  },
  onShow: function () {
    this.fetchData()
  },
  fetchData() {
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'user_order_list',
        guid: app.globalData.unionid,
        pageSize: 20,
        pageIndex: 1
      },
      success: (res) => {
        console.log(res)
        this.setData({
          data: res.data.data,
          count: res.data.count
        })
      }
    })
  }
})
