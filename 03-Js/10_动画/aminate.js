function animate(elementObj, position) {
			clearInterval(elementObj.timer)
			elementObj.timer = setInterval(function() {
				// 获取当前位置的偏移量
				var current = elementObj.offsetLeft;
				// 自定义一个位移步长
				// (position - current) / 20
				// var step = current > position ? -20 : 20;
				var step = (position - current) / 20; // 10.233  -22.233
				step = step > 0 ? Math.ceil(step) : Math.floor(step)
				console.log('新的step', step)
				// if (current < position) {
				if (Math.abs(current - position) > step) { // 1  20
					// box.offsetLeft = current + step  XXXXXXXX 不可赋值
					elementObj.style.left = current + step + 'px' // 当前位移量加上位移步长就是新的位置(新的偏移量)
				} else {
					// 一步到位到终点
					elementObj.style.left = position + 'px'
					// 到达指定偏移量位置后清除定时器
					clearInterval(elementObj.timer)
				}
			}, 20)
		}