import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import Page from '@/components/page'
import useSearch from '@/hooks/useSearch'
import { get, post } from '@/utils/request'
import { Table, Button, Drawer, Form, Input } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import storage, { set } from '@/utils/storages'
import './index.scss'
import ReactECharts from 'echarts-for-react'
import { useHistory } from 'react-router'

const Index: FC<any> = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const [search, setSearch] = useSearch<{
    page: string
  }>()
  const { page = '1' } = search
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [option, setOption] = useState<boolean | string>(false)
  const [targetGroup, setTargetGroup] = useState<{
    id: number
    name: string
  } | null>(null)

  const getList = useCallback(async () => {
    setLoading(true)
    const result = await get<{
      list: any[]
      page: number
      pageSize: number
      pageTotal: number
      total: number
    }>('/ticket/fund/group', {
      page: parseInt(page) - 1,
    })
    const { list } = result
    setData(list)
    setLoading(false)
  }, [search])
  const savePlate = useCallback(
    async (data) => {
      const result = await post('/ticket/fund/group', {
        ...data,
        id: option === 'edit' ? targetGroup?.id : '',
      })
      if (result) {
        if (page === '1' || option === 'edit') await getList()
        else setSearch({ page: 1 })
        setOption(false)
      }
    },
    [option]
  )
  useEffect(() => {
    getList()
  }, [search])

  const columns = [
    {
      title: '板块名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, item: any) => {
        return (
          <p
            onClick={() => {
              set(storage.FUND_PLATE_DETAIL_INFO, item)
              history.push('/fund/plate/detail')
            }}
            className='page_fund_sort-tabl-tb cms-pointer'
          >
            {text}({item.tickets.length})
          </p>
        )
      },
    },
    {
      title: '基金持仓',
      dataIndex: 'funds',
      key: 'funds',
      render: (funds: any) => {
        const data = Object.values(funds).map((item: any[]) => {
          item = item.slice(0, 20)
          return item.reduce((a, b) => a + parseInt(b.fund), 0)
        })
        const option15 = {
          grid: {
            left: '1%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params: any) {
              return `${params[0].value}(${funds[params[0].name].length})`
            },
          },
          color: ['red', '#CD3333'],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Object.keys(funds),
          },
          yAxis: {
            type: 'value',
            min: Math.min(...data),
            max: Math.max(...data),
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
                    data,
                  },
                ],
              }}
            />
          </div>
        )
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: { id: number; name: string }) => {
        return (
          <Button
            onClick={() => {
              setTargetGroup(record)
              form.setFieldsValue({
                name: record.name,
              })
              setOption('edit')
            }}
          >
            <EditOutlined />
            修改{text}
          </Button>
        )
      },
    },
  ]
  return (
    <Page
      title={'板块列表'}
      option={() => (
        <div>
          <Button
            onClick={() => {
              form.setFieldsValue({
                name: '',
              })
              setOption('add')
            }}
          >
            <PlusOutlined />
            添加板块
          </Button>
        </div>
      )}
    >
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
      <Drawer
        title={option === 'edit' ? '修改板块' : '添加板块'}
        placement='right'
        contentWrapperStyle={{ width: '350px' }}
        onClose={() => setOption(false)}
        closable={false}
        visible={!!option}
      >
        <Form
          form={form}
          name='control-hooks'
          onFinish={async (data) => {
            await savePlate(data)
          }}
        >
          <Form.Item name='name' label='板块名称' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item className='cms-mt_20'>
            <Button type='primary' htmlType='submit'>
              {option === 'edit' ? '修改板块' : '添加板块'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Page>
  )
}
export default memo(Index)
