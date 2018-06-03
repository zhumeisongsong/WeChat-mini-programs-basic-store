import wxService from '../../plugins/WxService'
const app = getApp()

Page({
  data: {
    host: app.globalData.Host,
    category: [],
    cart: [],
    count: 0,
    amount: 0,
    modal: false,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
  },

  onLoad: function () {
    this.fetchList()
  },

  fetchList() {
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
            for (let item of res.data.data) {
              item.count = 0
            }
            this.setData({
              tabList: res.data.data
            })
          }
        })
      }
    })
  },

  tab(event) {
    let id = event.currentTarget.id;
    let obj = {};
    console.log(id)
    obj.curHdIndex = id;
    obj.curBdIndex = id;
    this.setData({
      tabArr: obj
    })
  },

  addToCart(event) {
    let item = event.currentTarget.dataset.item
    let obj = this.data.cart
    let isNew = true

    if (item.count === 0) {
      item.count = 1
    }
    let price = item.price / item.count
    // let list = this.data.tabList
    if (obj.length > 0) {
      for (let i in obj) {
        if (obj[i].id === item.id) {
          obj[i].price = obj[i].price + price
          obj[i].count = obj[i].count + 1
          console.log(obj[i])
          isNew = false
        }
      }
    }

    if (isNew) {
      obj.push(item)
    }

    this.setData({
      cart: obj,
      // tabList: list,
      count: this.data.count + 1,
      amount: this.data.amount + price
    })
  },
  removeFromCart(event) {
    let item = event.currentTarget.dataset.item
    let obj = this.data.cart
    let price = item.price / item.count

    console.log(item)

    if (obj.length > 0) {
      for (let i of obj) {
        if (i.id === item.id && i.count > 0) {
          i.price = i.price - price
          i.count = i.count - 1
        }
      }
      if (item.count > 1)
        this.setData({
          cart: obj,
          // tabList: list,
          count: this.data.count - 1,
          amount: this.data.amount - price
        })
    }
  },
  clearCart() {
    this.setData({
      cart: [],
      count: 0,
      amount: 0
    })
  },

  showModal() {
    this.setData({
      modal: true
    })
  },
  closeModal() {
    this.setData({
      modal: false
    })
  },

  goConfirm() {
    if(this.data.count>0){
      this.submitCart()
      this.clearCart()
      wx.navigateTo({
        url: '../confirm/confirm'
      })
    }else{
      wx.showToast({
        icon: 'none',
        title: '请添加商品',
      })
    }
  },

  submitCart(){
    for (let item of this.data.cart) {
      wx.request({
        url: app.globalData.APIHost,
        method: 'GET',
        data: {
          action: 'cart_add',
          guid: app.globalData.unionid,
          good_id: item.id,
          num: item.count,
        },
        success: res => {
          console.log(res)
        },
      })
    }
  }
})