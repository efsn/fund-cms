import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import Page from '@/components/page'
import ReactECharts from 'echarts-for-react'
import useSearch from '@/hooks/useSearch'
import { get } from '@/utils/request'
import { Table, Pagination } from 'antd'
import { ITicket, IFund } from '../type'
import './index.scss'

const Index: FC<any> = () => {
  const [search, setSearch] = useSearch<{
    page: string
  }>()
  const { page = '1' } = search
  const [data, setData] = useState<ITicket[]>([])
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
      list: ITicket[]
      page: number
      pageSize: number
      pageTotal: number
      total: number
    }>('/ticket/fund/list', {
      page: parseInt(page) - 1,
    })
    const { page: current, list, total, pageSize } = result
    setPagination({
      current: parseInt(current) + 1,
      pageSize: parseInt(pageSize),
      total: parseInt(total),
    })
    setData(list)
    setLoading(false)
  }, [search])
  useEffect(() => {
    getList()
  }, [search])

  const columns = [
    {
      title: '基金名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ITicket) => {
        return (
          <p className='page_fund_sort-tabl-tb'>
            {text}({record.code})
          </p>
        )
      },
    },
    {
      title: '基金持仓',
      dataIndex: 'fund',
      key: 'fund',
      render: (fund: IFund[]) => {
        return (
          <p className='page_fund_sort-tabl-tb'>{fund[fund.length - 1].fund}</p>
        )
      },
    },
    {
      title: '基金变化',
      dataIndex: 'fund',
      key: 'fund',
      render: (fund: IFund[]) => {
        const option15 = {
          grid: {
            left: '1%',
            right: '2%',
            bottom: '0%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
          },
          color: ['red', '#CD3333'],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: fund.map((item) => new Date(item.date).getDate()),
          },
          yAxis: {
            type: 'value',
          },
        }
        return (
          <div className='page_fund_sort-table'>
            <ReactECharts
              style={{ height: '250px', width: '45%' }}
              option={{
                ...option15,
                series: [
                  {
                    type: 'line',
                    data: fund.slice(-24).map((item) => item.fund),
                  },
                ],
              }}
            />
            <ReactECharts
              style={{ height: '250px', width: '45%' }}
              option={{
                ...option15,
                series: [
                  {
                    type: 'line',
                    data: fund.slice(-24).map((item) => item.sort + 1),
                  },
                ],
              }}
            />
          </div>
        )
        // return <span>{fund[fund.length - 1].fund}</span>
      },
    },
  ]

  return (
    <Page title={'当日基金排名'}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
      <div className='right'>
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
    </Page>
  )
}
export default memo(Index)
