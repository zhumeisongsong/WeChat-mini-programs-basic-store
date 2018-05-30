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
    Host: app.globalData.Host,
    canIUse: false
  },
  onLoad: function () {
    this.setData({
      canIUse: app.globalData.canIUse
    })
    this.fetchData()
  },

  fetchData() {
    this.wxService = new wxService
    this.wxService.getStorage({
      key: 'indexInfo'
    }).then(res => {
      console.log(decodeURIComponent(res.data.note))
      // for (let item of res.data.news) {
      //   console.log(decodeURIComponent(item.content))
      //   item.content =  escape2Html(item.content)
      // }
      this.setData({
        imgUrls: res.data.slid,
        video: app.globalData.Host + res.data.video,
        list: res.data.news
      })
      WxParse.wxParse('notice', 'html', decodeURIComponent(res.data.note), this)
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
    let id = event.currentTarget.dataset.id
    // if(type==='story'){
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
    // }else{
    //   wx.navigateTo({
    //     url: '../detail/detail'
    //   })
    // }

  }
})

function escape2Html(str) {
  var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}
