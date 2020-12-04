import request from '@/utils/request'

export const login = data => {
    return request({
        method: 'POST',
        url: "/mp/v1_0/authorizations",
        data
    })
}
//获取用户资料
export const getUserProfile = () => {
   
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile',
        // headers: {
        //      Authorization:`Bearer ${user.token}` 
        //  } 
    })
}