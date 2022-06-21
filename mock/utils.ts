import mockjs from 'mockjs';

export function successResult(data?: Record<string, any>) {
  return mockjs.mock({
    msg: '请求成功！',
    code: 200,
    data
  });
}

export function failedResult(data?: Record<string, any>) {
  return mockjs.mock({
    msg: '未知错误',
    code: 500,
    data
  });
}
