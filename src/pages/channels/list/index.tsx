import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import Page from '@/components/page'

import { get } from '@/utils/request'
import { Table, Button } from 'antd'
import './index.scss'
import { useHistory } from 'react-router'

const Index: FC<any> = () => {
  const history = useHistory()
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const getList = useCallback(async () => {
    const result = await get<{
      channels: Array<{ code: string; name: string }>
    }>('/ticket/analysis/channels')
    const { channels } = result
    setData(channels)
    setLoading(false)
  }, [])
  useEffect(() => {
    getList()
  }, [])

  const columns = [
    {
      title: '板块名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: 'code',
      key: 'code',
      render: (code: string, recode: { name: string }) => {
        return (
          <Button
            onClick={() => {
              history.push(`/channel/detail/${code}?name=${recode.name}`)
            }}
          >
            查看
          </Button>
        )
      },
    },
  ]
  return (
    <Page title={'股票板块'}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </Page>
  )
}
export default memo(Index)
