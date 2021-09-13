import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import Page from '@/components/page'

import { get } from '@/utils/request'
import { Table } from 'antd'
import './index.scss'
import { useParams } from 'react-router'
import useSearch from '@/hooks/useSearch'
interface Item {
  yearOnYearScale: number
  totalScale: number
  previousScale: number
  value: number
  name: string
}

const Index: FC<any> = () => {
  const { code } = useParams()
  const [search] = useSearch()
  const { name } = search
  const [data, setData] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const getList = useCallback(async () => {
    const result = await get('/ticket/analysis/channels/detail', {
      code,
    })
    const { list } = result
    setData(
      list
        .filter((item: Item) => item.yearOnYearScale > 0 && item.totalScale > 0)
        .sort((a: Item, b: Item) => b.totalScale - a.totalScale)
    )
    setLoading(false)
  }, [])
  useEffect(() => {
    getList()
  }, [])

  const columns = [
    {
      title: '股票名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, recod: Item) => {
        return (
          <p>
            {name}({recod.value.toFixed(2)})
          </p>
        )
      },
    },
    {
      title: '季度同步',
      dataIndex: 'yearOnYearScale',
      key: 'yearOnYearScale',
    },
    {
      title: '业绩增长',
      dataIndex: 'totalScale',
      key: 'totalScale',
    },
    {
      title: '环比增长',
      dataIndex: 'previousScale',
      key: 'previousScale',
    },
  ]
  return (
    <Page title={`${name}板块`}>
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
