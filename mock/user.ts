import Mock from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
import { failedResult, successResult } from './utils';

const Random = Mock.Random;

const token = Random.string('upper', 32, 32);

const userInfo = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: Random.image(),
  desc: 'manager',
  password: Random.string('upper', 4, 16),
  token
};

const adminInfo = {
  ...userInfo,
  permisstions: [
    {
      label: '主控台',
      value: 'dashboard_console'
    },
    {
      label: '监控页',
      value: 'dashboard_monitor'
    },
    {
      label: '工作台',
      value: 'dashboard_workplace'
    },
    {
      label: '基础列表',
      value: 'basic_list'
    },
    {
      label: '基础列表删除',
      value: 'basic_list_delete'
    }
  ]
};

export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    response: (opt: Record<string, any>) => {
      if (opt.body.username === 'admin') {
        return successResult(userInfo);
      }
      return failedResult();
    }
  },
  {
    url: '/api/logout',
    method: 'get',
    timeout: 1000,
    response(opt: Record<string, any>) {
      if (opt.handers.Authorization) {
        return successResult();
      }
      return failedResult();
    }
  },
  {
    url: '/api/register',
    method: 'post',
    timeout: 1000,
    response: () => {
      return successResult();
    }
  },
  {
    url: '/api/user_info',
    method: 'get',
    timeout: 1000,
    response: (opt: Record<string, any>) => {
      if (opt.handers.Authorization) {
        return successResult(adminInfo);
      }
      return failedResult();
    }
  }
] as MockMethod[];
