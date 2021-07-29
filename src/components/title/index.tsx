import React, { FC, memo, PropsWithChildren } from 'react'
import './index.scss'

const Index: FC<PropsWithChildren<{
  title: string
}>> = ({ children, title }) => {
  return (
    <section className='pro-title_container'>
      <div className='pro-title_title'>{title}</div>
      <div>{children}</div>
    </section>
  )
}
export default memo(Index)
