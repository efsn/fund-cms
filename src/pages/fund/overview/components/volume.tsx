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

interface IData {
  change: number
  value: number
  volume: number
}
interface IValue {
  value?: string | number
  type?: 'error' | 'warn'
}

const Index: FC = () => {
  const [target, setTarget] = useState<IData | null>(null)
  const volume = useMemo<IValue>((): IValue => {
    if (target && target.volume > 4)
      return { value: target?.volume + '亿成交量 (放量警告)', type: 'error' }
    if (target && target.volume > 3.65)
      return { value: target?.volume + '亿成交量 (放量提醒)', type: 'warn' }

    return {
      value: target?.volume,
    }
  }, [target])
  const change = useMemo<IValue>((): IValue => {
    if (target && target.change > 1)
      return { value: target?.change + '换手率 (放量警告)', type: 'error' }
    if (target && target.change > 0.925)
      return { value: target?.change + '换手率 (放量提醒)', type: 'warn' }
    return {
      value: target?.change,
    }
  }, [target])
  const val = useMemo<IValue>((): IValue => {
    if (target) {
      const text = target.value <= 0.3 ? '【下跌预警】' : '【涨涨涨】'
      if (target.change > 1 || target.volume > 4)
        return { value: `${target?.value} (放量警告${text})`, type: 'error' }
      if (target.change > 0.925 || target.volume > 3.65)
        return { value: `${target?.value} (放量提醒${text})`, type: 'warn' }
    }
    return {
      value: target?.value,
    }
  }, [target])
  const getData = useCallback(async () => {
    const data = await get<IData>('ticket/analysis/volume')
    setTarget(data)
  }, [])
  useEffect(() => {
    getData()
  }, [])
  return (
    <Fragment>
      <Item type={volume.type} title='成交量' value={volume.value} />
      <Item type={change.type} title='换手率' value={change.value} />
      <Item type={val.type} title='涨跌幅' value={val.value} />
    </Fragment>
  )
}

export default Index
