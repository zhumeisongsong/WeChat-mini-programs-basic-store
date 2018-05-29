import wxService from '../../plugins/WxService'
const app = getApp()

Page({
  data: {
    imgUrls: [],
    notice: '',
    video: '',
    list: [],
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
    Host: app.globalData.Host
  },
  onLoad: function () {
    this.fetchData()
  },

  fetchData(){
    this.wxService = new wxService
    this.wxService.getStorage({
      key: 'indexInfo'
    }).then(res => {
      console.log(res)
      this.setData({
        imgUrls: res.data.slid,
        notice: res.data.note,
        video: app.globalData.Host + res.data.video,
        list: res.data.news
      })
    })

  },

  onIconTap(event) {
    let type = event.currentTarget.dataset.type
    if (type === 'shop') {
      wx.switchTab({
        url: '../shop/shop'
      })
    } else {
      wx.navigateTo({
        url: `../list/${type}/${type}`
      })
    }
  }
})
