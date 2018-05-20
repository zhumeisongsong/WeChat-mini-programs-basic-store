const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    icons: [
      {
        type: 'shop',
        src: '/images/icon-product.png',
        text: '熊熊产品'
      },
      {
        type: 'food',
        src: '/images/icon-food.png',
        text: '美食详情'
      },
      {
        type: 'story',
        src: '/images/icon-cartoon.png',
        text: '漫画故事'
      },
      {
        type: 'video',
        src: '/images/icon-video.png',
        text: '试吃视频'
      }
    ],
    iconNotice: '/images/icon-notice.png',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onIconTap: function (event) {
    let type = event.currentTarget.dataset.type
    if (type === 'video') {
      console.log(type)
      wx.navigateTo({
        url: `../${type}/${type}`
      })
    } else if (type === 'shop') {
      console.log(type)
      wx.switchTab({
        url: '../shop/shop'
      })
    } else {
      wx.navigateTo({
        url: `../list/list?type=${type}`
      })
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
