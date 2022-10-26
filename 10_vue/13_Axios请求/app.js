
import request from 'request.js'

new Vue({
    el: '#app',
    data() {
        return {
            id: 1,
            todoList: [],
            todo: {
                title: '',
                completed: false
            }
        }
    },
    mounted() {
        // request.get('/todos?id=' + this.id)
        request.get(`/todos?id=${this.id}`)
        .then(data => {
            this.todoList = data.data
        })
    },
    methods: {
        onSubmit() {
            // 发送post请求
            request.post('/todos', this.todo).then(res => {
                console.log('新创建的数据', res);
                this.todoList.unshift(res.data)
            })
        }
    }
})