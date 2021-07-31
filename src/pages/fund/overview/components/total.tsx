import React, { FC, useCallback, useEffect, useState, Fragment } from 'react'
import { get } from '@/utils/request'
import ReactECharts from 'echarts-for-react'
interface Item {
  date: string
  fund: number
}

const Index: FC = () => {
  const [data, setData] = useState<Array<Item>>([])
  const list = data.map((item: Item) => item.fund)
  const getList = useCallback(async () => {
    const result = await get('ticket/fund/total')
    setData(result)
  }, [])
  const option15 = {
    grid: {
      left: '2%',
      right: '4%',
      bottom: '2%',
      top: '2%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
    },
    color: ['red', '#CD3333'],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map((item) => item.date),
    },
    yAxis: {
      type: 'value',
    },
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <Fragment>
      <ReactECharts
        style={{ height: '300px', width: '100%' }}
        option={{
          ...option15,
          yAxis: {
            type: 'value',
            min: Math.min(...list),
            max: Math.max(...list),
          },
          series: [
            {
              type: 'line',
              data: list,
            },
          ],
        }}
      />
    </Fragment>
  )
}

export default Index
