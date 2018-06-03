import wxService from '../../plugins/WxService'
const app = getApp()

Page({
  data: {
    list: [],
    pageindex: 1,
    callbackcount: 15
  },

  onLoad: function () {
    this.setData({
      amount: 300,
      orderNum: 3333
    })
  },

  getCarts () {
    this.wxService = new wxService
    this.wxService.getStorage({
      key: 'unionid'
    }).then(res => {
      console.log(res)
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

  orderSubmit () {
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'order_add',
        guid: app.globalData.unionid,
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
        let orderNo = res.data.order_no
        let orderAmount = res.data.order_amout
      }
    })
  },

  geSignature (){
    this.wxService = new wxService
    this.wxService.getStorage({
      key: 'openId'
    }).then(res => {
      wx.request({
        url: app.globalData.APIHost,
        method: 'GET',
        data: {
          openid: res,
          total_fee: this.amount,
          out_order_no: this.orderNum
        },
        success: res => {

        }
      })
    })
  },

  selectAddress(){
    wx.navigateTo({
      url: '../profile/address/address'
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

  goPay() {
    console.log('in')
    wx.request({
      url: app.globalData.PAYHost,
      method: 'GET',
      data: {
        openid: app.globalData.unionid,
        total_fee: 0.1,
        out_order_no: 'B18060402275247'
      },
      success: (res) => {
        console.log(res)
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
          },
          'complete': (res) => {
            if (res.errMsg === 'requestPayment:ok') {
              wx.request({
                url: app.globalData.serverUrl + '/tools/submit_ajax.ashx?action=wx_pay_result&order_no=' + res.data.order_no,
                success: function (res) {
                  if (res.data.status === '1') {
                    wx.showToast({
                      icon: 'success',
                      title: '支付成功',
                    })
                  } else {
                    wx.showModal({
                      title: '错误提示',
                      content: res.data.msg,
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

