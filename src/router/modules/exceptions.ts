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
        path: '404',
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
