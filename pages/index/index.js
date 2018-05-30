import wxService from '../../plugins/WxService'
import WxParse from '../../wxParse/wxParse.js'
const app = getApp()

Page({
  data: {
    imgUrls: [],
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

  fetchData() {
    this.wxService = new wxService
    this.wxService.getStorage({
      key: 'indexInfo'
    }).then(res => {
      this.setData({
        imgUrls: res.data.slid,
        video: app.globalData.Host + res.data.video,
        list: res.data.news
      })
      WxParse.wxParse('notice', 'html', decodeURIComponent(res.data.note), this)

      for (let i in this.list) {
        console.log(this.list[i].content)
        WxParse.wxParse('item' + (i + 1), 'html', decodeURIComponent(this.list[i].content), this)
        if (i === this.list.length - 1) {
          WxParse.wxParseTemArray("list", 'content', this.list.length, that)
        }
      }
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
  },
  goDetail(event) {
    let type = event.currentTarget.dataset.type
    let id = event.currentTarget.daraset.id
    if(type==='story'){
      wx.navigateTo({
        url: '../detail/detail'
      })
    }else{
      wx.navigateTo({
        url: '../detail/detail'
      })
    }
   
  }
})
