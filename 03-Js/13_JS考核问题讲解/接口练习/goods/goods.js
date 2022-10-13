var contentBox = document.querySelector('.content-box')
var listHead = document.querySelector('.list-head')
var host = 'http://8.142.68.47:8080/'
var token = '0140bb627c198a2306a388005d58999c'
var searchKey = ''
var currentPage = 1
var totalPage = 1
function getGoodsList(pageNum) {
	currentPage = pageNum
	var xhr = new XMLHttpRequest()
	xhr.open('get', host +'api/ledger/goods/list?page=' + pageNum + '&search=' + searchKey)
	xhr.setRequestHeader('token', token)
	xhr.send()
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) { // 请求的状态
			var jsonData = JSON.parse(xhr.responseText)
			if (jsonData.code === 0) { // 业务的状态码
				totalPage = jsonData.data.totalPage
				// 处理列表数据
				contentBox.innerHTML = '' // 情况列表内容 准备渲染新数据
				var list = jsonData.data.list // 列表数据
				for (var i = 0; i < list.length; i++) {
					var newLi = listHead.cloneNode(true)
					newLi.className = 'list-item list-content'
					var spanArr = newLi.children
					spanArr[0].innerHTML = list[i].goodsSn
					spanArr[1].innerHTML = list[i].name
					spanArr[2].innerHTML = list[i].category
					spanArr[3].innerHTML = list[i].unit
					spanArr[4].innerHTML = list[i].agentPrice
					spanArr[5].innerHTML = list[i].storePrice
					// spanArr[6] = list[i].goodsSn // 状态 要加勾选框
					spanArr[6].innerHTML = ''
					var newCheckbox = document.createElement('input')
					newCheckbox.type = 'checkbox'
					newCheckbox.checked = list[i].status === 1
					spanArr[6].appendChild(newCheckbox)

					spanArr[7].innerHTML = '编辑'	// 操作列 - 编辑按钮 -先保存商品id
					spanArr[7].goodsId = list[i].id
					spanArr[7].onclick = function() {
						location.href = 'goods-info.html?id=' + this.goodsId
					}
					// 拼接完数据, 插入到页面
					contentBox.appendChild(newLi)
				}

				// 处理分页数据
				var currentPage = jsonData.data.currPage
				var paginationNums = document.querySelector('.pagination-nums')
				paginationNums.innerHTML = ''
				for (var j = 1; j <= jsonData.data.totalPage; j++) {
					var newSpan = document.createElement('span')
					newSpan.innerHTML = j
					newSpan.onclick = function() {
						this.className = 'active'
						getGoodsList(this.innerText)
					}

					if (j == pageNum) {
						var oldActive = document.querySelector('.active')
						if (oldActive) { // 初始化页面的时候 还没有高亮的页码
							oldActive.className = ''
						}
						newSpan.className = 'active'
					}
					paginationNums.appendChild(newSpan)
				}

			}
		}
	}
}
function getGoodsInfoById(id) {
	var xhr = new XMLHttpRequest()
	xhr.open('get', host + '/api/ledger/goods/' + id + '/info')
	xhr.setRequestHeader('token', token)
	xhr.send()
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var jsonData = JSON.parse(xhr.responseText)
			if (jsonData.code === 0) {
				var goodsInfo = jsonData.data
				var goodsInfoArr = document.querySelectorAll('.list input')
				goodsInfoArr[0].value = goodsInfo.goodsSn
				goodsInfoArr[1].value = goodsInfo.name
				goodsInfoArr[2].value = goodsInfo.category
				goodsInfoArr[3].value = goodsInfo.unit
				goodsInfoArr[4].value = goodsInfo.agentPrice
				goodsInfoArr[5].value = goodsInfo.storePrice
			}
		}
	}
}
function previousPage() {
	currentPage = currentPage - 1 < 1 ? 1 : currentPage -1
	getGoodsList(currentPage)
}

function nextPage() {
	currentPage = currentPage + 1 > totalPage ? totalPage : currentPage + 1
	getGoodsList(currentPage)
}

function  updateGoodsInfo(id) {
	var goodsInfoArr = document.querySelectorAll('.list input')
	var params = {
	  "agentPrice": 0,
	  "category": "",
	  "goodsSn": goodsInfoArr[0].value,
	  "name": "",
	  "storePrice": 0,
	  "unit": ""
	}
	var xhr = new XMLHttpRequest()
	xhr.open('post', host + '/api/ledger/goods/' + id + '/update')
	xhr.setRequestHeader('token', token)
	xhr.setRequestHeader('Content-type', 'application/json')
	xhr.send(JSON.stringify(params))
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var jsonData = JSON.parse(xhr.responseText)
			if (jsonData.code === 0) {
				alert('更新成功')
				location.href('goods-list.html')
			}
		}
	}
}

function searchGoodsList() {
	var searchInput = document.querySelector('.search input')
	// var searchValue = searchInput.value
	searchKey =  searchInput.value
	getGoodsList(1)
}