const app = getApp()

Page({
  data: {
    category: [],
    tabList: [],
    cart: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    const that = this
    console.log(app.globalData.APIHost)
    // that.setData({
    //   windowH:sysInfo.windowHeight-44,
    //   windoww:sysInfo.windowWidth
    // });
  },
  handleChooseImage: function (event) {
    var _this = this
    if (event.currentTarget.dataset.type === 'camera') {
      chooseImage(_this)
    }
  },
  handlePlayAgain: function () {
    this.setData({
      item: 'camera',
      imageAddSrc: '../../image/camera.svg',
      isShowCamera: true,
      isShowCanvas: false,
      isShowText: true,
      isShowAgainButton: false,
    })
  },
  getCategory: function () {

  }
})

function uploadImage(page, path) {
  var uploadTask = wx.uploadFile({
    url: app.globalData.APIHost + app.globalData.uploadFilePath,
    filePath: path,
    name: 'image',
    success: function (res) {
      console.log('success')
      var base64 = 'data:image/jpeg;base64,' + res.data.substring(1, res.data.length - 1)
      page.setData({
        imageAddSrc: base64,
        isProgress: false,
        isShowCamera: true,
        isShowAgainButton: true
      })
    },
    fail: function (res) {
      consloe.log(res)
      wx.showModal({
        title: 'colorit',
        content: '上传失败,请稍后重试',
        showCancel: false
      })
    }
  })
  uploadTask.onProgressUpdate((res) => {
    page.setData({
      progressPercent: 100
    })
  })
}
