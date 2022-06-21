import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Transform<T = AxiosRequestConfig, V = AxiosResponse> {
  requestInterceptor?: (value: T) => T | Promise<T>;
  requestCatchInterceptor?: (error: any) => any;
  responseInterceptor?: (value: V) => V | Promise<V>;
  responseCatchInterceptor?: (error: any) => any;
}

export interface ohterConfig {
  // 是否开启取消重复请求
  repeatCancel: boolean;
}

export interface CreateAxiosConfig extends AxiosRequestConfig {
  transform?: Transform;
  options?: ohterConfig;
}

export interface Result<T = any> {
  msg: string;
  code: number;
  data?: T;
  status?: number;
  [key: string]: any;
}
