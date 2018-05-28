page({
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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    video: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    list: []
  },
})