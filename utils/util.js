const app = getApp()

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


export const pathJoinHost = (string) => {
  let result = string.split('/up')
  for (let i in result) {
    if (result[i].slice(0, 4) === 'load') {
      result[i] = app.globalData.Host + 'up' + result[i]
    }
  }
  return result.join('')
}

export const findIndex = (l, o) => {
  return l.reduce((index, ele, i) => {
    if (ele.id === o.id) {
      return i
    } else {
      return index
    }
  }, -1)
}