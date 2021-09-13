import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import Page from '@/components/page'

import { get, post } from '@/utils/request'
import { Table, Button, Pagination, Space, Switch } from 'antd'
import './index.scss'
import { useHistory } from 'react-router'
import useSearch from '@/hooks/useSearch'

interface IConcept {
  name: string
  code: string
  isShow: number
}

const Index: FC<any> = () => {
  const history = useHistory()
  const [search, setSearch] = useSearch<{
    page: string
  }>()
  const { page = '1' } = search
  const [data, setData] = useState<IConcept[]>([])
  const [showAll, setShowAll] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)

  const [pagination, setPagination] = useState<{
    current: number
    pageSize: number
    total: number
  }>({
    current: parseInt(page) - 1,
    pageSize: 0,
    total: 0,
  })

  const getList = useCallback(async () => {
    setLoading(true)
    const result = await get<{
      list: IConcept[]
      page: number
      pageSize: number
      pageTotal: number
      total: number
    }>('/ticket/analysis/concept', {
      page: parseInt(page) - 1,
      isShow: showAll,
    })
    const { page: current, list, total, pageSize } = result
    setPagination({
      current: parseInt(current) + 1,
      pageSize: parseInt(pageSize),
      total: parseInt(total),
    })
    setData(list)
    setLoading(false)
  }, [search, showAll])

  const options = useCallback(async (code, isShow) => {
    await post('/ticket/analysis/concept/option', {
      code,
      isShow,
    })
    getList()
  }, [])

  const refresh = useCallback(async () => {
    await get('/ticket/analysis/concept/refresh')
    getList()
  }, [])

  useEffect(() => {
    getList()
  }, [search, showAll])

  const columns = [
    {
      title: '概念名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: 'code',
      key: 'code',
      render: (code: string, recode: IConcept) => {
        return (
          <Space>
            <Button
              onClick={() => {
                history.push(`/concept/detail/${code}?name=${recode.name}`)
                // history.push(`/concept/detail/${code}?name=${recode.name}`)
              }}
            >
              查看
            </Button>
            <Button
              onClick={() => options(recode.code, !!recode.isShow ? 0 : 1)}
            >
              {!!recode.isShow ? '隐藏' : '展示'}
            </Button>
          </Space>
        )
      },
    },
  ]
  return (
    <Page
      title={'概念板块'}
      option={() => (
        <Space>
          <Button onClick={() => refresh()}>刷新({pagination.total})</Button>
          <Switch
            checkedChildren='热点'
            unCheckedChildren='全部'
            checked={!!showAll}
            onChange={(result) => {
              setShowAll(result ? 1 : 0)
            }}
          />
        </Space>
      )}
      footer={() => (
        <div className='pagination-right'>
          <Pagination
            defaultCurrent={1}
            showSizeChanger={false}
            defaultPageSize={30}
            onChange={(page) => {
              setSearch({
                page,
              })
            }}
            {...pagination}
          />
        </div>
      )}
    >
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
