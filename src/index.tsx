import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { ConfigProvider, Empty } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import routes from '@/routes'
import Layout from '@/components/layout'
import App from '@/App'
import '@/styles/index.less'

import './index.scss'

const antdConfig = {
  autoInsertSpaceInButton: false,
  locale: zh_CN,
  renderEmpty: () => (
    <Empty description='暂无相关信息' image={Empty.PRESENTED_IMAGE_SIMPLE} />
  ),
}

ReactDOM.render(
  <ConfigProvider {...antdConfig}>
    <BrowserRouter basename={'/'}>
      <Layout route={routes}>
        <App />
      </Layout>
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById('root')
)
