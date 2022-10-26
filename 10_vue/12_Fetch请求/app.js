new Vue({
    el: '#app',
    data() {
        return {
            todoList: [],
            todo: {
                title: '',
                completed: false
            }
        }
    },
    mounted() {
        // 会自动执行函数，在页面没有渲染之前就会执行
         // 默认是get请求 不需要写
        fetch('http://jsonplaceholder.typicode.com/todos')
        .then(res => {
            // console.log('结果---', res.json());
            return res.json()
        }).then(data => {
            this.todoList = data
        })
    },
    methods: {
        onSubmit() {
            // 发送post请求
            fetch('http://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify(this.todo),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(res => {
                // 将 fetch 返回的promise对象的结果中的
                // body(readablestream) 解析
                return res.json() 
            }).then(data => {
                console.log('新创建的数据', data);
                this.todoList.unshift(data)
            })
        }
    }
})