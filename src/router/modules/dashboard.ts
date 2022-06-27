import { RouteRecordRaw } from 'vue-router';
import { Layout } from '../base';

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Layout,
    redirect: '/dashboard/console',
    meta: {
      title: 'Dashboard',
      icon: 'icon-dashboard'
    },
    children: [
      {
        path: 'console',
        name: 'dashboard_console',
        component: () => import('@/views/dashboard/console/console.vue'),
        meta: {
          title: '主控台'
        }
      },
      {
        path: 'workbench',
        name: 'dashboard_workbench',
        component: () => import('@/views/dashboard/workbench/workbench.vue'),
        meta: {
          title: '工作台'
        }
      }
    ]
  }
];

export default routes;
