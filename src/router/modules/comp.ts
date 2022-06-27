import { RouteRecordRaw } from 'vue-router';
import { ParentLayout, Layout } from '../base';

const routes: RouteRecordRaw[] = [
  {
    path: '/comp',
    name: 'comp',
    component: Layout,
    redirect: '/comp/list',
    meta: {
      title: '组件示例',
      icon: 'icon-component'
    },
    children: [
      {
        path: 'list',
        name: 'comp_list',
        component: ParentLayout,
        redirect: '/comp/list/base',
        meta: {
          title: '列表组件'
        },
        children: [
          {
            path: 'base',
            name: 'comp_list_base',
            component: () => import('@/views/comp/list/baseList.vue'),
            meta: {
              title: '基本列表'
            }
          },
          {
            path: 'edit',
            name: 'comp_list_edit',
            component: () => import('@/views/comp/list/editList.vue'),
            meta: {
              title: '编辑列表'
            }
          }
        ]
      },
      {
        path: 'table',
        name: 'comp_table',
        component: ParentLayout,
        meta: {
          title: '表格组件'
        },
        children: [
          {
            path: 'base',
            name: 'comp_table_base',
            component: () => import('@/views/comp/table/baseTable.vue'),
            meta: {
              title: '基本表格'
            }
          },
          {
            path: 'edit',
            name: 'comp_table_edit',
            component: () => import('@/views/comp/table/editTable.vue'),
            meta: {
              title: '编辑表格'
            }
          }
        ]
      }
    ]
  }
];

export default routes;
