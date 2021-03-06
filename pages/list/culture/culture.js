const app = getApp()

Page({
  data: {
    data: [],
    pageindex: 1,
    callbackcount: 20,
    host: app.globalData.Host
  },
  onLoad: function () {
    this.fetchData()
  },

  fetchData() {
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'article_list',
        category_id: 56,
        pageSize: 20,
        pageIndex: 1
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          data: res.data.data
        })
      }
    })
  },

  goDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../detail/textDetail/textDetail?id=${id}`
    })
  },
})
