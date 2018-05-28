import wxService from '../../plugins/WxService'
const app = getApp()

Page({
  data: {
    category: [],
    tabList: [],
    cart: [],
    host: app.globalData.APIHost,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    let that = this

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
            pageSize: 20,
            pageIndex: 1,
            type_id: typeId
          },
          success: res => {
            this.setData({
              tabList: res.data.data
            })
          }
        })
      }
    })
  },
  onShow: function () {

  },

  fetchList (){

  },

  addToCar () {
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {},
      success: res => {
        this.setData({
          tabList: res.data.data
        })
      }
    })

  },
  getCarts () {
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {},
      success: res => {
        this.setData({
          tabList: res.data.data
        })
        console.log(this.data.tabList)
      }
    })
  },
  removeChart () {
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {},
      success: res => {
        this.setData({
          tabList: res.data.data
        })
        console.log(this.data.tabList)
      }
    })


  },
  onOrderConfirm () {
    this.wxService = new wxService
    this.wxService.getStorage({
      key: 'unionid'
    }).then(res => {
      console.log(res)
      wx.request({
        url: app.globalData.APIHost,
        method: 'GET',
        data: {
          action: 'order_add',
          guid: encodeURIComponent(res),
          express_id: 1,
          accept_name: '张三',
          province: '四川',
          city: '成都',
          contry: '龙泉驿区',
          address: 'XX小区',
          mobile: '18108272714',
          post_code: '610000',
          express_fee: 6
        },
        success: res => {
          console.log(res)
        }
      })
    })

  }
})
