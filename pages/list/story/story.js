const app = getApp()

Page({
  data: {
    list: [],
    pageindex: 1,
    callbackcount: 15
  },
  onLoad: function () {
    this.fetchData()
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  toDetail(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../detail/detail/?id=${id}`
    })
  },
  fetchData(){
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'article_list',
        category_id: 56,
        pageSize: 10,
        pageIndex: 1
      },
      success: (res) => {
        console.log(res)
      }
    })
  }
})
