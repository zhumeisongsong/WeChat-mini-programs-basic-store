const app = getApp()

Page({
  data: {
    list:[],
    pageindex: 1,
    callbackcount: 15
  },
  onLoad: function () {
  },
  toDetail(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../detail/detail/?id=${id}`
    })
  },
  fetchData(){

  }
})
