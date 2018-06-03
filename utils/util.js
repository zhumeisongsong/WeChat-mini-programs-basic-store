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

export const native2ascii = (nativecode) => {
  nativecode = nativecode.split("");
  var ascii = "";
  for (var i = 0; i < nativecode.length; i++) {
    var code = Number(nativecode[i].charCodeAt(0));
    if (code > 127) {
      var charAscii = code.toString(16);
      charAscii = new String("0000").substring(charAscii.length, 4) + charAscii;
      ascii += "\\u" + charAscii;
    } else {
      ascii += nativecode[i];
    }
  }
  return ascii;
}

export const ascii2native = (asciicode) => {
  asciicode = asciicode.split("\\u");
  var nativeValue = asciicode[0];
  for (var i = 1; i < asciicode.length; i++) {
    var code = asciicode[i];
    nativeValue += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
    if (code.length > 4) {
      nativeValue += code.substring(4, code.length);
    }
  }
  return nativeValue;
}