import wxService from '../../plugins/WxService'
const app = getApp()

Page({
  data: {
    cart: [],
    address: {},
    deliverAmount: 0
  },

  onLoad: function () {
    this.getCarts()
  },

  getCarts () {
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'cart_list',
        guid: app.globalData.unionid
      },
      success: res => {
        this.setData({
          cart: res.data.data,
          totalAmount: res.data.amount
        })
      }
    })
  },

  clearCart(){
    for (let item of this.data.cart) {
      wx.request({
        url: app.globalData.APIHost,
        method: 'GET',
        data: {
          action: 'cart_goods_update',
          guid: app.globalData.unionid,
          goodis: item.id,
          clear: 1
        },
        success: (res) => {
          console.log(res)
        }
      })
    }
  },

  orderSubmit () {
    if (JSON.stringify(this.data.address) === '{}') {
      wx.showToast({
        icon: 'none',
        title: '请选择收货地址',
      })
      return
    }
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'order_add',
        guid: app.globalData.unionid,
        express_id: 1,
        accept_name: this.data.address.userName,
        province: this.data.address.provinceName,
        city: this.data.address.cityName,
        contry: this.data.address.countyName,
        address: this.data.address.detailInfo,
        mobile: this.data.address.telNumber,
        post_code: this.data.address.nationalCode,
        express_fee: 6
      },
      success: res => {
        this.payConfirm(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  selectAddress(){
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          address: res
        })
      }
    })
  },

  //express_fee为全局变量
  expressChange(that, id) {//参数说明：this, 邮费ID
    if (id === '') {
      that.setData({
        express_fee: '6'
      })
    } else {
      var province = that.data.province.split('-')[0];
      if (id === '1') {
        var p1 = "青海省,宁夏回族自治区,甘肃省";
        var p2 = "西藏自治区,新疆维吾尔自治区,新疆维吾尔自治区,内蒙古自治区";
        var p3 = "四川省";
        var firstheavy = 6; //首重
        var continuedheavy = 2; //续重
        if (p1.indexOf(province) > -1) {
          firstheavy = 8;
          continuedheavy = 4;
        } else if (p2.indexOf(province) > -1) {
          firstheavy = 12;
          continuedheavy = 12;
        } else if (p3.indexOf(province) > -1) {
          firstheavy = 6;
          continuedheavy = 1;
        } else {
          firstheavy = 6;
          continuedheavy = 3;
        }
        var continuedcount = Math.ceil(parseInt(that.data.weight) / 1000 - 1);
        if (continuedcount > 0) {
          continuedheavy = parseFloat(firstheavy) + parseFloat(continuedheavy) * parseFloat(continuedcount);
          that.setData({
            express_fee: continuedheavy.toString()
          })
        } else {
          that.setData({
            express_fee: firstheavy.toString()
          })
        }
      } else {
        that.setData({
          express_fee: '0'
        })
      }
    }
  },

  payConfirm(res){
    let data = res
    wx.showModal({
      title: '订单结果',
      content: res.data.msg,
      confirmText: '去支付',
      cancelText: '稍后支付',
      success: (res) => {
        if (res.confirm) {
          this.goPay(data)
        } else {
          wx.redirectTo({
            url: '../list/order/order'
          })
        }

      }
    })
  },

  goPay(res) {
    wx.request({
      url: app.globalData.PAYHost,
      method: 'GET',
      data: {
        openid: app.globalData.unionid,
        total_fee: res.data.order_amout,
        out_order_no: res.data.order_no
      },
      success: (res) => {
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': () => {
            wx.showToast({
              icon: 'success',
              title: '支付成功',
            })
          },
          'fail': (res) => {
            wx.showModal({
              title: '支付结果',
              content: '支付失败！',
            })
            // wx.redirectTo({
            //   url: '../list/order/order'
            // })
          },
          'complete': (res) => {
            if (res.errMsg === 'requestPayment:ok') {
              wx.request({
                url: app.globalData.APIHost,
                method: 'GET',
                data: {
                  action: 'pay_result',
                  order_no: res.data.order_no
                },
                success: function (res) {
                  if (res.data.status === '1') {
                    wx.showToast({
                      icon: 'success',
                      title: '支付成功',
                    })
                  } else {
                    wx.showModal({
                      title: '错误提示',
                      content: res.data.msg
                    })
                  }
                }
              })
            }
          }
        })

      }
    })
  }
})

