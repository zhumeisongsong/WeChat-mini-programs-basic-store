const app = getApp()

Page({
  data: {
    list: [],
    pageindex: 1,
    callbackcount: 15
  },
  onLoad: function () {
    this.fetchData()
  },
  toDetail(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../detail/detail/?id=${id}`
    })
  },
  fetchData(){
    wx.request({
      url: app.globalData.APIHost,
      method: 'GET',
      data: {
        action: 'article_list',
        category: 56,
        pageSize: 10,
        pageIndex: 1
      },
      success: (res) => {
        console.log(res)
      }
    })
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

