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
    response: () => {
      return successResult(adminInfo);
    }
  },
  {
    url: '/api/logout',
    method: 'post',
    timeout: 1000,
    response(opt: Recordable) {
      if (opt.handers.Authorization) {
        return successResult();
      }
      return failedResult();
    }
  }
] as MockMethod[];
