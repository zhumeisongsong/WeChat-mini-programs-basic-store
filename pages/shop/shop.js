import wxService from '../../plugins/WxService'
const app = getApp()

Page({
  data: {
    host: app.globalData.APIHost,
    category: [],
    tabList0: [],
    cart: [],
    count: 0,
    amount: 0,
    currentTab: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    this.getCarts()

    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'goodstype_list'
      },
      success: res => {
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
            for (let item of res.data.data) {
              item.count = 1
            }
            this.setData({
              ['tabList']: res.data.data
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

  addToCart (event) {
    let id = event.currentTarget.dataset.id
    this.wxService = new wxService
    this.wxService.getStorage({
      key: 'unionid'
    }).then(res => {
      wx.request({
        url: app.globalData.APIHost,
        method: 'GET',
        data: {
          action: 'cart_add',
          guid: res,
          good_id: id,
          num: 1,
        },
        success: res => {
          console.log(res)
          this.setData({
            amount: res.data.amount,
            count: res.data.num
          })
        }
      })
    })
  },

  getCarts () {
    this.wxService = new wxService
    this.wxService.getStorage({
      key: 'unionid'
    }).then(res => {
      wx.request({
        url: app.globalData.APIHost,
        method: 'GET',
        data: {
          action: 'cart_list',
          guid: res
        },
        success: res => {
          console.log(res)
          this.setData({
            cart: res.data,
            amount: res.data.amount,
            count: res.data.num
          })
        }
      })
    })
  },
  removeFromCart () {
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
