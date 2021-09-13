import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import './index.scss'
import Item from '@/pages/fund/overview/components/item'
import { get } from '@/utils/request'
import { Row, Col } from 'antd'

interface IData {
  today: { date: string; value: number; url: string }
  tips: boolean
  recent: IValue
}
interface IValue {
  [key: string]: number
}

const Index: FC = () => {
  const [target, setTarget] = useState<IData | null>(null)
  const [other, setOther] = useState<any>(null)
  const recent = useMemo(() => {
    if (target) {
      return Object.keys(target.recent).map((item) => {
        const value = target.recent[item]
        return {
          date: item,
          value,
          type: value + target.today.value !== 0 ? 'error' : undefined,
        }
      })
    }
    return []
  }, [target])
  const hasChange = useMemo(() => {
    if (target && recent[0]) {
      const { today } = target
      if (recent[0].value + today.value !== 0) return 'error'
    }
    return 'warn'
  }, [target, recent])
  const otherTips = useMemo(() => {
    if (other) {
      const { state, value, url } = other
      if (state == 0) return undefined
      if (state == 1)
        return (
          <a target='_blank' href={url}>
            国库现金:{Math.abs(parseInt(value))}
          </a>
        )
      if (state == 2)
        return (
          <a target='_blank' href={url}>
            国库现金信息
          </a>
        )
    }
    return undefined
  }, [other])
  const getData = useCallback(async (type = 0) => {
    const data = await get<IData>('ticket/analysis/mlf', {
      refresh: type,
    })
    setTarget(data)
  }, [])
  const getDataOther = useCallback(async (type = 0) => {
    const data = await get<IData>('ticket/analysis/mlf/other', {
      refresh: type,
    })
    setOther(data)
  }, [])
  useEffect(() => {
    getData()
    getDataOther()
  }, [])
  return (
    <Fragment>
      <Row>
        <Col span={12} style={{ cursor: 'pointer' }}>
          <a href='javascript:void 0' title='刷新当前信息'>
            <Item
              onClick={() => getData(1)}
              tips={
                target?.tips ? (
                  <a href={target.today.url} target='_blank'>
                    主要消息：储备金变化
                  </a>
                ) : (
                  ''
                )
              }
              type={hasChange}
              title={(target && target.today.date) || ''}
              value={(target && target.today.value) || ''}
            />
          </a>
        </Col>
        <Col span={12}>
          <Item
            tips={otherTips}
            type={recent[0] && recent[0].type}
            title={(recent[0] && recent[0].date) || ''}
            value={(recent[0] && recent[0].value) || ''}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Item
            type={recent[1] && recent[1].type}
            title={(recent[1] && recent[1].date) || ''}
            value={(recent[1] && recent[1].value) || ''}
          />
        </Col>
        <Col span={12}>
          <Item
            type={recent[2] && recent[2].type}
            title={(recent[2] && recent[2].date) || ''}
            value={(recent[2] && recent[2].value) || ''}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Item
            type={recent[3] && recent[3].type}
            title={(recent[3] && recent[3].date) || ''}
            value={(recent[3] && recent[3].value) || ''}
          />
        </Col>
        <Col span={12}>
          <Item
            type={recent[4] && recent[4].type}
            title={(recent[4] && recent[4].date) || ''}
            value={(recent[4] && recent[4].value) || ''}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Index
