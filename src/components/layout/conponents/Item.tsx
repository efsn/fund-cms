import React, { FC, useState } from 'react'
import { Route } from '@/types/route'
import { DownOutlined } from '@ant-design/icons'
import cls from 'classnames'
import { useHistory } from 'react-router'

const ItemLi: FC<
  Route & {
    son?: boolean
    left?: number
  }
> = ({ path, name, routes, icon, component, son, left = 16 }) => {
  if (routes) routes = routes.filter((item) => !item.hide)
  const history = useHistory()
  const { pathname = '' } = history.location
  const [showSon, setShowSun] = useState<boolean>(pathname.indexOf(path) !== -1)
  return (
    <li key={path} className={'pro-layout_slide_menu_li'}>
      <div
        onClick={() => {
          if (!!component) history.push(path)
          setShowSun(!showSon)
        }}
        className={cls('pro-layout_slide_menu_li_item', {
          ['pro-layout_slide_menu_li_item_action']: showSon,
        })}
      >
        <div
          className={cls('pro-layout_slide_menu_li_title')}
          style={{ paddingLeft: `${left}px` }}
        >
          {!son && icon}
          <p>{name}</p>
        </div>
        {routes && routes[0] && (
          <i
            onClick={(event) => {
              event.preventDefault()
              event.cancelable = true
              event.stopPropagation()
              setShowSun(!showSon)
            }}
          >
            <DownOutlined />
          </i>
        )}
      </div>
      {routes && routes[0] && showSon && (
        <Item routes={routes} left={left + 10} son={true} />
      )}
    </li>
  )
}

const Item: FC<{
  routes: Route[]
  son?: boolean
  left?: number
}> = ({ routes, son, left = 16 }) => {
  return (
    <ul className={'pro-layout_slide_menu_ul'}>
      {routes.map((item) => {
        return <ItemLi key={item.path} son={son} left={left} {...item} />
      })}
    </ul>
  )
}

export default Item
