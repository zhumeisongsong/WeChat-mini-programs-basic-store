const app = getApp()

Page({
  data: {
    host: app.globalData.Host,
    data: [],
    count: null,
    pageindex: 1,
    callbackcount: 20
  },
  onLoad: function () {

  },
  onShow: function () {
    this.fetchData()
  },
  fetchData() {
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'user_order_list',
        guid: app.globalData.unionid,
        pageSize: 20,
        pageIndex: 1
      },
      success: (res) => {
        console.log(res)
        this.setData({
          data: res.data.data,
          count: res.data.count
        })
      }
    })
  },
  goPay() {
    console.log('in')
    wx.request({
      url: app.globalData.PAYHost,
      method: 'GET',
      data: {
        openid: app.globalData.unionid,
        total_fee: 76,
        out_order_no: 'B18060323052489'
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
                success: function(res) {
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
