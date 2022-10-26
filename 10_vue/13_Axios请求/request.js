const request = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com',
    timeout: 6000 // 设置请求的超时时间
})
// 添加请求拦截器
request.interceptors.request.use(config => {
    // const token = localStorage.getItem('token')
    const token = 'abc'
    if(token) {
        // 如果token存在，让每个请求携带上自定义的 token ，需要根据实际开发情况修改 Auth
        config.headers['token'] = token
        // config.headers['Auth'] = token
    }

    return config
}, function(err) {
    // 对请求错误 做处理
    return Promise.reject(err)
})
// import request from request.js
request.interceptors.response.use(response => {
    // 对响应的数据处理
    if (response.status === 401) {
        location.href('/login')
    }
    return response
}, function(err) {
    // 对请求错误做处理
    return Promise.reject(err)
})
export default request