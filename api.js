const app = getApp()

export const APIHost = 'https://creaformation.cn/tools/submit_ajax.ashx'

export const login = (url, params) => {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: APIHost,
      data: params,
      method: 'GET',
      success:  (res)=> {
        app.netWorkData.result = res.data
        resolve();
      }
    })
  });
  return promise
}