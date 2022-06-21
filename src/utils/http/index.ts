import Http from './http';
import _ from 'lodash';
import { checkStatus } from './checkStatusts';
import type { AxiosError, AxiosResponse } from 'axios';
import type { CreateAxiosConfig, Result, Transform } from './types';
import axios from 'axios';

const transform: Transform = {
  // 请求拦截
  requestInterceptor(config) {
    const token = ''; // store 中获取 token
    if (token) {
      if (config.headers) {
        config.headers['Authorization'] = token;
      }
    }
    return config;
  },
  // 响应拦截
  responseInterceptor(res: AxiosResponse<Result, any>) {
    // 假设后端返回的 error 信息，都有一个 error 字段
    if (res.data.status) {
      console.log(res.data.msg);
    }
    return res;
  },
  // 响应错误拦截
  responseCatchInterceptor(error: AxiosError) {
    const err: string = error.toString();
    try {
      if (error.code === 'ECONNABORTED') {
        console.log('接口请求超时，请刷新页面重试。');
        return Promise.reject(error.message);
      }
      if (err && err.includes('Network Error')) {
        console.log('网络异常，检查网络是否可用。');
        return Promise.reject(err);
      }
    } catch (e) {
      throw new Error(e as any);
    }
    const isCancel = axios.isCancel(error);
    if (!isCancel) {
      // http code 的错误拦截
      const status = error && error.response && error.request.status ? error.request.status : 'unknown';
      checkStatus(status, error.message);
    } else {
      console.warn(error.message, '请求被取消！');
    }

    return Promise.reject(error);
  }
};

function createHttp(opt?: Partial<CreateAxiosConfig>) {
  return new Http(
    _.merge(
      {
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 1000 * 10,
        headers: {},
        options: {
          // 默认拦截请求
          repeatCancel: true
        },
        transform
      },
      opt || {}
    )
  );
}

export const http = createHttp();
