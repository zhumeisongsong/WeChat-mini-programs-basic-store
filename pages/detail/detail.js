const app = getApp()

Page({
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
        console.log(res)
      }
    })
  }
})