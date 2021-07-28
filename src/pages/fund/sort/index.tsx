import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
  Fragment,
} from 'react'
import Page from '@/components/page'
import ReactECharts from 'echarts-for-react'
import useSearch from '@/hooks/useSearch'
import { get, post } from '@/utils/request'
import { Table, Pagination, Select } from 'antd'

import { getDifferentOne } from '@/utils/common'
import { ITicket, IFund, ITicketGroup } from '../type'
import './index.scss'

const Index: FC<any> = () => {
  const [search, setSearch] = useSearch<{
    page: string
  }>()
  const { page = '1' } = search
  const [data, setData] = useState<ITicket[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [groups, setGroups] = useState<ITicketGroup[]>([])
  const getGroups = useCallback(async () => {
    const result = await get<{ list: ITicketGroup[] }>('/ticket/fund/group')
    setGroups(result.list)
  }, [])
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
    getGroups()
  }, [])
  useEffect(() => {
    getList()
  }, [search])
  const columns = [
    {
      title: '基金名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ITicket) => {
        const fund = record.fund
        return (
          <Fragment>
            <p className='cms-table_tb_100'>
              {text}({record.code})
            </p>
            <p className='cms-table_tb_100'>{fund[fund.length - 1].fund}</p>
          </Fragment>
        )
      },
    },
    {
      title: '板块',
      dataIndex: 'ticketGroups',
      key: 'ticketGroups',
      render: (
        ticketGroups: ITicketGroup[],
        _record: ITicket,
        index: number
      ) => {
        const ticketGroupsId = ticketGroups.map((item) => item.id)
        return (
          <div className='cms-table_tb_250'>
            <Select
              bordered={false}
              mode='multiple'
              placeholder='Inserted are removed'
              value={ticketGroupsId}
              onChange={async (ids) => {
                setLoading(true)
                const id = getDifferentOne([...ids], [...ticketGroupsId])
                await post('/ticket/fund/save', {
                  groupId: id,
                  ticketId: _record.id,
                  type: ticketGroupsId.length < ids.length ? 1 : 0,
                })
                data[index].ticketGroups = groups.filter(
                  (item) => ids.indexOf(item.id) !== -1
                )
                setData([...data])
                setLoading(false)
              }}
              style={{ width: '100%' }}
            >
              {groups.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
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
    </Page>
  )
}
export default memo(Index)
