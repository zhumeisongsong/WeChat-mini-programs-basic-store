const app = getApp()

Page({
  data: {
    host: app.globalData.Host,
    list: [],
    pageindex: 1,
    callbackcount: 20
  },
  onLoad: function () {
    this.fetchData()
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  goDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../detail/detail?id=${id}`
    })
  },
  fetchData() {
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'article_list',
        category_id: 25,
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
