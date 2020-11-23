import axios from 'axios'
import JSONbig from 'json-bigint'

const request =axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',

    //定制后端返回的原始数据处理
    //data就是原始数据 json格式字符串
    transformResponse: [function (data) {
        // Do whatever you want to transform the data
        // try catch 来捕获异常，防止后端传来的不是json格式字符串
        try {
            return JSONbig.parse(data);
        } catch(error) {
            return data
        }
       
      }],
})
//设置请求拦截器
request.interceptors.request.use(
    function (config) {
        const user = JSON.parse(window.localStorage.getItem('user'));
        if (user) {
            config.headers.Authorization = `Bearer ${user.token}`
        }
       return config
    },
    function (error) {
        return Promise.reject(error) 
    }
)
export default request