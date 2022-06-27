import { http } from '@/utils/http';

// register
export const registerUser = (data: Record<string, any>) => http.request({ url: '/register', method: 'post', data });
// login
export const loginUser = (data: Record<string, any>) => http.request({ url: '/login', method: 'post', data });
// logout
export const logoutUser = () => http.request({ url: '/logout', method: 'get' });
// 获取用户信息
export const get_user_info = () => http.request({ url: '/user_info', method: 'get' });
