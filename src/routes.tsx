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
          routes: [
            {
              path: '/fund/plate/detail',
              name: '板块详情',
              hide: true,
              component: lazy(() => import('@/pages/fund/plate/detail')),
            },
          ],
        },
      ],
    },
    {
      path: '/channel',
      name: '板块与股票业绩',
      icon: <HomeOutlined />,
      component: lazy(() => import('@/pages/channels/list')),
      routes: [
        {
          path: '/channel/detail/:code',
          name: '股票业绩',
          hide: true,
          component: lazy(() => import('@/pages/channels/detail')),
        },
      ],
    },
    {
      path: '/concept',
      name: '概念与股票业绩',
      icon: <HomeOutlined />,
      component: lazy(() => import('@/pages/concept/list')),
      routes: [
        {
          path: '/concept/detail/:code',
          name: '股票业绩',
          hide: true,
          component: lazy(() => import('@/pages/channels/detail')),
        },
      ],
    },
  ],
}
export default routes
