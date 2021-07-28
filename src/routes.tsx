import { HomeOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { IRoute } from '@/types/route'

const routes: IRoute = {
  path: '/',
  routes: [
    {
      path: '/home',
      name: 'DashBoard',
      icon: <HomeOutlined />,
      component: lazy(() => import('@/pages/home')),
    },
    {
      path: '/fund',
      name: '基金',
      icon: <HomeOutlined />,
      component: lazy(() => import('@/pages/fund/overview')),
      routes: [
        {
          path: '/fund/sort',
          name: '持仓排序',
          component: lazy(() => import('@/pages/fund/sort')),
        },
        {
          path: '/fund/plate',
          name: '板块列表',
          component: lazy(() => import('@/pages/fund/plate')),
        },
        {
          path: '/fund/option',
          name: '编辑',
          component: lazy(() => import('@/pages/fund/option')),
        },
      ],
    },
  ],
}
export default routes
