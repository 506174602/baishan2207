function urlParams2Obj(url) {
  var params = url.split('?').length > 1 ? url.split('?')[1] : ''
  var paramsArr = params.split('&')
  var obj = {}
  if (paramsArr.length > 0) {
    for (var i = 0; i < paramsArr.length; i++) {
      var keyValue = paramsArr[i].split('=')
      obj[keyValue[0]] = keyValue[1]
    }
  }
  return obj
}
