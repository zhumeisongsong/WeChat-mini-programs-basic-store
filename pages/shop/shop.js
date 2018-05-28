const app = getApp()

Page({
  data: {
    category: [],
    tabList: [],
    cart: [],
    host:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    this.setData({
      host: app.globalAPIHost
    })
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'goodstype_list'
      },
      success: res => {
        console.log(res)
        this.setData({
          category: res.data.data
        })

        let typeId = res.data.data.Id

        wx.request({
          url: app.globalData.APIHost,
          method: 'GET',
          data: {
            action: 'goodslist',
            pageSize:20,
            pageIndex:1,
            type_id:typeId
          },
          success: res => {
            this.setData({
              tabList: res.data.data
            })
            console.log(this.data.tabList)
          }
        })
      }

    })
  }
})
