import React, { DOMAttributes, FC, ReactNode } from 'react'
import './index.scss'
import cls from 'classnames'

const Index: FC<
  {
    title: string
    value?: string | number
    type?: any
    tips?: any | ReactNode
  } & DOMAttributes<any>
> = ({ title, value, type, tips, onClick }) => {
  return (
    <div
      onClick={(e) => onClick && onClick(e)}
      className={cls('page_overview-com-item', {
        ['page_overview-com-item-warn']: type === 'warn',
        ['page_overview-com-item-error']: type === 'error',
      })}
    >
      {tips && <p className='page_overview-com-item-tips'>{tips}</p>}
      <p>{title}：</p>
      <p>{value || '***'}</p>
    </div>
  )
}

export default Index
