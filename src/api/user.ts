import { http } from '@/utils/http';

// register
export const registerUser = (data: Record<string, any>) => http.request({ url: '/register', method: 'post', data });
// login
export const loginUser = (data: Record<string, any>) => http.request({ url: '/login', method: 'post', data });
// logout
export const logoutUser = (data: Record<string, any>) => http.request({ url: '/logout', method: 'get', data });

// menuList 纯后端返回路由表方案使用
export const getMenus = () => http.request({ url: '/menus', method: 'get' });
