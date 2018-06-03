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
  goDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../detail/secondDetail/secondDetail?id=${id}`
    })
  },
  fetchData() {
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'article_list',
        category_id: 58,
        pageSize: 10,
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
