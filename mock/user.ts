import Mock from 'mockjs';
import { MockMethod, Recordable } from 'vite-plugin-mock';
import { failedResult, successResult } from './utils';

const Random = Mock.Random;

const token = Random.string('upper', 32, 32);

const adminInfo = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: Random.image(),
  desc: 'manager',
  password: Random.string('upper', 4, 16),
  token
};

export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    response: (opt: Record<string, any>) => {
      if (opt.body.username === 'admin') {
        return successResult(adminInfo);
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
  }
] as MockMethod[];
