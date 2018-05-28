App({
  onLaunch: function () {
    let that = this

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取登陆信息 获取openId 获取用户信息 注册登录
    wx.login({
      success: res => {
        let code = res.code
        if (res.code) {
          console.log(res)
          wx.request({
            url: that.globalData.APIHost,
            method: 'GET',
            data: {
              action: 'get_openid',
              code: res.code
            },
            success: function (res) {
              // let session_key =res.data.session_key
              that.globalData.unionid = res.openId
              that.globalData.openId = res.openId
              wx.setStorage({
                key: 'unionid',
                value: 'res.openId'
              })
              // if (res.data.unionid) {
              //   that.globalData.unionid = res.unionid
              // }
              // else {
              // 获取用户信息
              // 查看是否授权
              wx.getSetting({
                success: function (res) {
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                      success: function (res) {
                        console.log(res.userInfo)
                        that.callLogin()
                      }
                    })
                  } else {
                    wx.getUserInfo({
                      success: userData => {
                        console.log(userData)
                        wx.getStorage({
                          key: 'userId',
                          success: function (res) {
                            console.log('ininininin222222')
                            console.log(res.data)
                          },
                          fail: function () {
                            console.log('ininininineeeee')
                            wx.request({
                              url: that.globalData.APIHost,
                              method: 'GET',
                              data: {
                                action: 'register',
                                guid: that.globalData.unionid,
                                nick_name: userData.userInfo.nickName,
                                avatar: userData.userInfo.avatarUrl,
                              },
                              success: res => {
                                console.log(res)
                                wx.setStorage({
                                  key: '',
                                  data: ''
                                })
                              }
                            })
                          },
                          complete: function () {
                            console.log('ininininin')
                            that.callLogin()
                          }
                        })

                        // // 可以将 res 发送给后台解码出 unionId
                        // wx.request({
                        //   url: that.globalData.APIHost,
                        //   method: 'GET',
                        //   data: {
                        //     action: 'get_unionid',
                        //     encryptedDataStr: encodeURIComponent(userData.encryptedData),
                        //     iv: userData.iv,
                        //     key: session_key
                        //   },
                        //   success: res => {
                        //     console.log(res)
                        //   }
                        // })
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                          this.userInfoReadyCallback(res)
                        }
                      }
                    })
                  }
                }
              })
              // }
            }
          })
        } else {
          console.log('login error')
        }
      }
    })

  },

  getUserInfo: function () {

  },
  callLogin: function () {
    let that = this
    wx.request({
      url: that.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'login',
        guid: that.globalData.unionId
      },
      success: function (res) {
        that.globalData.indexInfo = res.data
        console.log(that.globalData.indexInfo)
      }
    })
  },
  globalData: {
    APIHost: 'https://creaformation.cn/tools/submit_ajax.ashx',
    userInfo: null,
    indexInfo: null
  }
})

//express_fee为全局变量
function expresschange(that, id) {//参数说明：this, 邮费ID
  if (id == '') {
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
}