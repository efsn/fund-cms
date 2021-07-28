import React, { FC, ReactNode, Fragment, useState } from 'react'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { IRoute } from '@/types/route'
import cls from 'classnames'
import { useHistory } from 'react-router'
import MenuItem from './conponents/Item'
import Head from './conponents/head'
import { getPaths } from './utils'
import './index.scss'

const Layout: FC<{
  title?: (showMenu: boolean) => ReactNode | ReactNode
  bottom?: (showMenu: boolean) => ReactNode | ReactNode
  route: IRoute
}> = ({
  children,
  title = (
    <Fragment>
      <img src={require('@/assets/images/logo.png')} alt='' />
      <p className='pro-layout_menu_title'>聚宝盆</p>
    </Fragment>
  ),
  bottom = (
    <Fragment>
      <AppstoreAddOutlined size={32} />
      <p className='pro-layout_menu_title'>聚宝盆</p>
    </Fragment>
  ),
  route,
}) => {
  const { routes } = route
  const history = useHistory()
  const { location } = history
  const { pathname } = location
  const paths = getPaths(routes, pathname)
  const [showMenu, setShowMenu] = useState<boolean>(true)

  return (
    <div className='pro-layout_container'>
      <aside
        className={cls('pro-layout_menu', {
          ['pro-layout_menu_hide']: !showMenu,
        })}
      >
        <div className='pro-layout_slide_children'>
          <div className='pro-layout_slide_top'>
            {typeof title === 'function' ? title(showMenu) : title}
          </div>
          <div className='pro-layout_slide_menu'>
            <MenuItem routes={routes} />
          </div>
          <div
            onClick={() => setShowMenu(!showMenu)}
            className='pro-layout_slide_bottom'
          >
            {typeof bottom === 'function' ? bottom(showMenu) : bottom}
          </div>
        </div>
      </aside>
      <section className='pro-layout_content'>
        <Head paths={paths} />
        <section className='pro-layout_content_section'>{children}</section>
        <footer className='pro-layout_content_footer'></footer>
      </section>
    </div>
  )
}

export default Layout
