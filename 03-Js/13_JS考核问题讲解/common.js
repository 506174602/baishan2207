



function str2Obj(url) { //  www.baidu.com/team/update.html
	urlArr = url.split('?') //['www.baidu.com/team/update.html', 'id=190&name=zhangsan&age=13']
	var obj = {}
	if (urlArr.length === 2) {
		paramsStr = urlArr[1] // id=190&name=zhangsan&age=13
		paramsArr = paramsStr.split('&')
		for (var i = 0; i < paramsArr.length; i++) {
			// paramsArr[i]  id=190
			var keyValue = paramsArr[i].split('=') // ['id', 190]
			obj[keyValue[0]] = keyValue[1]
		}
	}
	

	return obj
}
// obj.teamnumber obj.teamname