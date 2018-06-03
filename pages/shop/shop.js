import wxService from '../../plugins/WxService'
const app = getApp()

Page({
  data: {
    host: app.globalData.Host,
    category: [],
    cart: [],
    count: 0,
    amount: 0,
    modal: true,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
  },

  onLoad: function () {
    this.fetchList()
    // this.getCarts()
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
              ['tabList']: res.data.data
            })
          }
        })
      }
    })
  },

  addToCart(event) {
    let id = event.currentTarget.dataset.id
    this.setData({})
  },

  removeFromCart(event) {
    let id = event.currentTarget.dataset.id
    this.setData({})
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

  goConfirm() {
    this.addToCart()
    wx.navigateTo({
      url: '../confirm/confirm'
    })
  },

  clearCart() {
    this.setData({
      cart: [],
      count: 0,
      amount: 0
    })
  },
  closeModal() {
    this.setData({
      modal: false
    })
  }
})

// canIUse: wx.canIUse('button.open-type.getUserInfo')
// getCarts () {
//   this.wxService = new wxService
//   this.wxService.getStorage({
//     key: 'unionid'
//   }).then(res => {
//     wx.request({
//       url: app.globalData.APIHost,
//       method: 'GET',
//       data: {
//         action: 'cart_list',
//         guid: res
//       },
//       success: res => {
//         console.log('is cart')
//
//         let cartData = res.data.data
//         let newCartData = []
//         let j = 0
//
//         for (let i in cartData) {
//           if (newCartData.length > 0) {
//             for (let j in newCartData) {
//               if (newCartData[j].id === cartData[i].id) {
//                 newCartData[j].price = cartData[j].price + cartData[i].price
//                 newCartData[j].number = cartData[j].number + cartData[i].number
//               } else {
//                 console.log(cartData[i])
//                 newCartData.concat(cartData[i])
//               }
//             }
//           } else {
//             newCartData[j] = cartData[i]
//           }
//         }
//         console.log(newCartData)
//         this.setData({
//           cart: res.data.data,
//           amount: res.data.amount,
//           count: res.data.num
//         })
//       }
//     })
//   })
// // },

//
// wx.request({
//   url: app.globalData.APIHost,
//   method: 'GET',
//   data: {
//     action: 'cart_goods_update',
//     guid: res,
//     goodis: id,
//     quantity: 1,
//   },
//   success: res => {
//     console.log(res)
//     // this.setData({
//     //   amount: res.data.amount,
//     //   count: res.data.num
//     // })

// app.getUserOpenid((openid) => {
//   this.setData({
//     unionid: openid
//   })
//   console.log(this.unionid)
//   wx.request({
//     url: app.globalData.APIHost,
//     method: 'GET',
//     data: {
//       action: 'cart_add',
//       guid: this.unionid,
//       good_id: id,
//       num: 1,
//     },
//     success: res => {
//       console.log(res)
//       this.setData({
//         amount: res.data.amount,
//         count: res.data.num
//       })
//     }
//   })
// })