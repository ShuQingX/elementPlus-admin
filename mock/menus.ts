import { MockMethod } from 'vite-plugin-mock';
import { successResult } from './utils';

const menusList = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'LAYOUT',
    redirect: '/dashboard/console',
    meta: {
      icon: 'DashboardOutlined',
      title: 'Dashboard'
    },
    children: [
      {
        path: 'console',
        name: 'dashboard_console', // name 必须唯一
        component: '/dashboard/console', // 相对路径 对标 本地 views 中的相对路径
        meta: {
          title: '主控台',
          permissions: ['delete', 'edit'] // btn 权限管理 格式 name + auth
        }
      },
      {
        path: 'workplace',
        name: 'dashboard_workplace',
        component: '/dashboard/workplace',
        meta: {
          // hidden: true,  // 菜单权限管理
          title: '工作台'
        }
      }
    ]
  },
  {
    path: '/comp',
    name: 'comp',
    component: 'LAYOUT',
    redirect: '/comp/table',
    meta: {
      title: '组件示例',
      icon: 'WalletOutlined'
      // hidden: true
    },
    children: [
      {
        path: 'table',
        name: `comp_table`,
        redirect: '/comp/table/basic',
        meta: {
          title: '表格'
        },
        children: [
          {
            path: 'basic',
            name: `comp_table_basic`,
            meta: {
              title: '基础表格'
            },
            component: '/comp/table/basic'
          },
          {
            path: 'editCell',
            name: `comp_table_editCell`,
            meta: {
              title: '单元格编辑'
            },
            component: '/comp/table/editCell'
          }
        ]
      }
    ]
  }
];

export default {
  url: '/api/menus',
  method: 'get',
  response: () => {
    return successResult(menusList);
  }
} as MockMethod;
