// 文章相关请求模块

import request from "@/utils/request"

export const getArticles = params => {
   return request({
       method: 'GET',
       url: '/mp/v1_0/articles',
       params
       
    })
}
// 获取文章频道

export const getArticlesChannels = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels',    
     })
}

