App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取登陆信息 获取openId 获取用户信息 注册登录
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: this.globalData.APIHost,
            method: 'GET',
            data: {
              action: 'get_openid',
              code: res.code
            },
            success: res => {
              console.log(res)
              // let session_key =res.data.session_key
              console.log(res.data.openid)
              this.globalData.unionid = res.data.openid
              this.globalData.openid = res.data.openid
              wx.setStorage({
                key: 'unionid',
                value: res.data.openid
              }, {
                key: 'openid',
                value: res.data.openid
              })

              // if (res.data.unionid) {
              //   that.globalData.unionid = res.unionid
              // }
              // else {

              // 获取用户信息
              // 查看是否授权
              wx.getSetting({
                success: res => {
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                      success: userData => {
                        console.log(res.userInfo)
                        wx.request({
                          url: this.globalData.APIHost,
                          method: 'GET',
                          data: {
                            action: 'register',
                            guid: this.globalData.unionid,
                            nick_name: userData.userInfo.nickName,
                            avatar: userData.userInfo.avatarUrl,
                          },
                          success: res => {
                            console.log(res)
                            this.callLogin()
                            wx.setStorage({
                              key: '',
                              data: ''
                            })
                          }
                        })
                        // this.callLogin()
                      }
                    })
                  } else {
                    wx.getUserInfo({
                      success: userData => {
                        console.log(userData)
                        wx.getStorage({
                          key: 'userId',
                          success: (res) => {
                            console.log(res.data)
                          },
                          fail: () => {
                            console.log('ininininineeeee')
                            wx.request({
                              url: this.globalData.APIHost,
                              method: 'GET',
                              data: {
                                action: 'register',
                                guid: this.globalData.unionid,
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
                          complete: () => {
                            console.log('ininininin')
                            this.callLogin()
                          }
                        })

                        // // 可以将 res 发送给后台解码出 unionId
                        // wx.request({
                        //   url: this.globalData.APIHost,
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

  getUserInfo() {

  },
  callLogin () {
    wx.request({
      url: this.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'login',
        guid: this.globalData.unionid
      },
      success: (res) => {
        wx.setStorage({
          key: 'indexInfo',
          data: res.data.data[0]
        })
      }
    })
  },
  globalData: {
    Host: 'https://creaformation.cn/',
    APIHost: 'https://creaformation.cn/tools/submit_ajax.ashx',
    PAYHost: 'https://creaformation.cn/api/payment/WxPayAPI/pay.ashx',
    userInfo: null,
    unionid: null,
    openid: null,
    hasAuthButton: false
  }
})
