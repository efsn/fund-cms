import React, { FC, memo, useState } from 'react'
import Page from '@/components/page'
import { Table } from 'antd'
import storage, { get as getItem } from '@/utils/storages'
import './index.scss'

const Index: FC<any> = () => {
  const detail = getItem(storage.FUND_PLATE_DETAIL_INFO)
  const [data] = useState<any>(detail)

  const columns = [
    {
      title: '股票名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '排名',
      dataIndex: 'sort',
      key: 'sort',
    },
  ]
  return (
    <Page title={'板块详情'}>
      <Table pagination={false} columns={columns} dataSource={data.tickets} />
    </Page>
  )
}
export default memo(Index)
