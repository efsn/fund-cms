import React, { FC, useCallback, useEffect, useState, Fragment } from 'react'
import { get } from '@/utils/request'
import ReactECharts from 'echarts-for-react'
import { Row, Col } from 'antd'
interface Item {
  name: string
  type: string
  fund: number
  total: number
}

const Index: FC = () => {
  const [data, setData] = useState<Array<Item>>([])
  const getList = useCallback(async () => {
    const result = await get('ticket/fund/type/total')
    setData(result.sort((b: Item, a: Item) => a.fund - b.fund).slice(0, 6))
  }, [])

  useEffect(() => {
    getList()
  }, [])
  return (
    <Row>
      <Col span={18}>
        <ReactECharts
          style={{ height: '300px', width: '100%' }}
          option={{
            tooltip: {
              trigger: 'item',
              formatter: function (param: any) {
                const { seriesName, value, percent, data } = param
                const result = `${seriesName} <br/>
                  持仓数量：${value}<br/>
                  比例 : ${percent}%<br/>
                  龙头股票 : ${data.ticket}
                  `
                return result
              },
            },
            series: [
              {
                name: '持仓占比(总额)',
                type: 'pie',
                radius: '85%',
                roseType: 'angle',
                data: data.map((item: Item) => ({
                  value: item.fund,
                  name: item.type,
                  ticket: item.name,
                })),
              },
            ],
          }}
        />
      </Col>
      <Col span={6}>
        <ReactECharts
          style={{ height: '300px', width: '100%' }}
          option={{
            tooltip: {
              trigger: 'item',
              formatter: function (param: any) {
                const { seriesName, value, percent } = param
                const result = `${seriesName} <br/>
                  比例 : ${percent}%<br/>
                  持仓数量：${value}`
                return result
              },
            },
            series: [
              {
                name: '持仓比例(个数)',
                type: 'pie',
                radius: '95%',
                roseType: 'angle',
                label: {
                  show: true,
                  position: 'inside',
                },
                data: data.map((item: Item) => ({
                  value: item.total,
                  name: item.type,
                  ticket: item.name,
                })),
              },
            ],
          }}
        />
      </Col>
    </Row>
  )
}

export default Index
