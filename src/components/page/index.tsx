import React, { FC, memo, ReactNode, PropsWithChildren } from 'react'
import './index.scss'

export const PageHead: FC<{
  title?: string
  option?: () => ReactNode | ReactNode
}> = ({ title = 'Title', option }) => {
  return (
    <header className='pro-page_container_header'>
      <div>{title}</div>
      <div>{typeof option === 'function' ? option() : option}</div>
    </header>
  )
}

const Index: FC<PropsWithChildren<{
  head?: () => ReactNode | ReactNode
  title?: string
  padding?: number
  option?: () => ReactNode | ReactNode
}>> = ({ children, head, title, option, padding = 20 }) => {
  return (
    <section className='pro-page_container'>
      {head ? (
        typeof head === 'function' ? (
          head()
        ) : (
          head
        )
      ) : (
        <PageHead title={title} option={option} />
      )}
      <div style={{ padding: `${padding}px` }}>{children}</div>
    </section>
  )
}
export default memo(Index)
