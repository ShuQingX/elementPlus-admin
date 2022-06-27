import { RouteRecordRaw } from 'vue-router';
import { NotFound, Layout } from '../base';

const routes: RouteRecordRaw[] = [
  {
    path: '/error',
    name: 'ExceptionsPage',
    component: Layout,
    redirect: '/error/index',
    meta: {
      title: 'ErrorPage',
      icon: 'icon-warning-circle'
    },
    children: [
      {
        path: 'index',
        name: '404Page',
        component: NotFound,
        meta: {
          title: '404'
        }
      }
    ]
  }
];

export default routes;
