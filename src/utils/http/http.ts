import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isFunction } from 'lodash';
import { CreateAxiosConfig, Result, Transform } from './types';
import { AxiosCanceler } from './axiosCancel';

class Http {
  private instance: AxiosInstance;
  private options: CreateAxiosConfig;

  constructor(options: CreateAxiosConfig) {
    this.options = options;
    this.instance = axios.create(this.options);
    this.setupInterceptor();
  }

  /**
   * @description 请求方法
   */
  request<T = Result>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result, any>) => {
          resolve(res.data as unknown as Promise<T>);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  /**
   * @description 拦截配置
   */
  private setupInterceptor() {
    const { transform, options } = this.options;
    const { requestInterceptor, requestCatchInterceptor, responseInterceptor, responseCatchInterceptor } =
      transform as Transform;

    const axiosCanceler = new AxiosCanceler();

    // 请求拦截
    requestInterceptor &&
      isFunction(requestInterceptor) &&
      this.instance.interceptors.request.use(config => {
        if (options!.repeatCancel) {
          axiosCanceler.addPending(config);
        }
        return requestInterceptor(config);
      }, undefined);

    // 请求错误拦截
    requestCatchInterceptor &&
      isFunction(requestCatchInterceptor) &&
      this.instance.interceptors.request.use(undefined, requestCatchInterceptor);

    // 响应拦截
    responseInterceptor &&
      isFunction(responseInterceptor) &&
      this.instance.interceptors.response.use(res => {
        if (options!.repeatCancel) {
          axiosCanceler.removePending(res.config);
        }
        return responseInterceptor(res);
      }, undefined);

    // 响应错误拦截
    responseCatchInterceptor &&
      isFunction(responseCatchInterceptor) &&
      this.instance.interceptors.response.use(undefined, responseCatchInterceptor);
  }
}

export default Http;
