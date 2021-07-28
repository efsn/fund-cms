import React, { FC, memo } from 'react'
import { Breadcrumb } from 'antd'
import { Route } from '@/types/route'
import { useHistory } from 'react-router'

const Index: FC<{
  paths: Route[]
}> = ({ paths }) => {
  const history = useHistory()
  return (
    <header className='pro-layout_content_header'>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span className='cms-pointer' onClick={() => history.push('/home')}>
              home
            </span>
          </Breadcrumb.Item>
          {paths.map((item: Route) => {
            const { path, component, name } = item
            return (
              <Breadcrumb.Item key={path + name}>
                {!!component ? (
                  <span
                    className='cms-pointer'
                    onClick={() => history.push(path)}
                  >
                    {name}
                  </span>
                ) : (
                  name
                )}
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      </div>
    </header>
  )
}
export default memo(Index)
