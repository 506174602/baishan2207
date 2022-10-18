//   3.数量
function num(params) {
    $('.todo-count strong').text($("#todoList li").length)
}
$('#addTodo').keyup(function(e) {
    // 添加
    // 判断键盘按下回车
    if (e.keyCode === 13) {
        // 获取输入框的内容
       let vals = $(this).val()
        if(vals!==''){
            $('#todoList').append(`
            <li>
            <div class="view">
              <label>${vals}</label>
              <button class="destroy"></button>
            </div>
          </li>
            `)
            $(this).val('')
            // 加入动画
            $('#todoList li').last().slideDown(function(params) {
                num()
            })
         
       
        }
    }
})
// 删除
$('#todoList').on('click','.destroy',function(){
//    找到li
let _li = $(this).parent().parent()
  _li.slideUp(function(){
    $(this).remove()
    num()
  })



})