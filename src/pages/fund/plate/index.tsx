import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import Page from '@/components/page'
import useSearch from '@/hooks/useSearch'
import { get, post } from '@/utils/request'
import { Table, Pagination, Button, Drawer, Form, Input } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'

import './index.scss'

const Index: FC<any> = () => {
  const [form] = Form.useForm()
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
      list: any[]
      page: number
      pageSize: number
      pageTotal: number
      total: number
    }>('/ticket/fund/group', {
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
      render: (text: string) => {
        return <p className='page_fund_sort-tabl-tb'>{text}</p>
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
          <Form.Item>
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
