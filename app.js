App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getSetting()
  },
  getSetting () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // wx.showToast({
          //   icon: 'success',
          //   title: '已经授权',
          // })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: userData => {
              this.globalData.userInfo = userData
              this.login()
            }
          })
        } else {
          this.globalData.canIUse = true
          this.login()
        }
      }
    })
  },
  getUnionid(){
    wx.getUserInfo({
      success: userData => {
        console.log(userData)
        this.login()
        // 可以将 res 发送给后台解码出 unionId
        wx.request({
          url: this.globalData.APIHost,
          method: 'GET',
          data: {
            action: 'get_unionid',
            encryptedDataStr: encodeURIComponent(userData.encryptedData),
            iv: userData.iv,
            key: session_key
          },
          success: res => {
            console.log(res)
          }
        })
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  login(){
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
              let session_key = res.data.session_key
              this.globalData.unionid = res.data.openid
              this.globalData.openid = res.data.openid

              // wx.showToast({
              //   icon: 'success',
              //   title: '已取到openid',
              // })
              this.needRegister()
              // if (res.data.unionid) {
              //   this.globalData.unionid = res.unionid
              //   localStorage.setStorage({
              //     key: 'unionid',
              //     value: res.data.unionid
              //   })
              //   this.needRegister()
              // }
              // else {
              // }
            }
          })
        } else {
          console.log('login error')
        }
      }
    })
  },
  needRegister () {
    wx.getStorage({
      key: 'userToken',
      success: (res) => {
        // wx.showToast({
        //   icon: 'success',
        //   title: '需要登录',
        // })
        console.log(res)
        this.callLogin()
      },
      fail: () => {
        // wx.showToast({
        //   icon: 'success',
        //   title: '需要注册',
        // })
        this.callRegister()
      }
    })
  },
  callRegister () {
    wx.request({
      url: this.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'register',
        guid: this.globalData.unionid,
        nick_name: this.globalData.userInfo.nickName,
        avatar: this.globalData.userInfo.avatarUrl,
      },
      success: res => {
        console.log(res)
        if (res.status === 0) {
        } else {
          wx.setStorage({
            key: 'userToken',
            data: 22
          })
        }
        this.callLogin()
      }
    })
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
        console.log(res)
        // wx.showToast({
        //   icon: 'success',
        //   title: '登录成功',
        // })
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
    hasAuthButton: false,
    canIUse: true
  }
})
