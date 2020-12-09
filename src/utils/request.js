import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'
import {Message} from 'element-ui'

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

//响应拦截器
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
        const status = error.response.status
        if (error.response && status === 401) {
            window.localStorage.removeItem('user');
            router.push('/login')
            Message.error('登录状态无效，请重新登录')

        } else if (status === 400) {
            Message.error('请求参数错误，请检查请求参数')
        } else if (status === 403) {
            Message({
                type: 'warning',
                message:'没有操作权限'
            })
        } else if (status >=500 ) {
            Message.error('服务器内部异常，请稍后再试')
        }
    return Promise.reject(error);
  });
export default request