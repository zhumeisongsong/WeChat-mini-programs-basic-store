const app = getApp()

Page({
  data: {
    category: [],
    tabList: [],
    cart: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    const that = this
    console.log(app.globalData.APIHost)
    // that.setData({
    //   windowH:sysInfo.windowHeight-44,
    //   windoww:sysInfo.windowWidth
    // });
  }
})