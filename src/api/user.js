import request from '@/utils/request'

export const onLogin = data => {
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
//修改用户资料
export const updateUserProfile = data => {
   
    return request({
        method: 'PATCH',
        url: '/mp/v1_0/user/profile',
        data
    })
}
//修改用户头像
export const updateUserPhoto = data => {
   
    return request({
        method: 'PATCH',
        url: '/mp/v1_0/user/photo',
        data
    })
}
