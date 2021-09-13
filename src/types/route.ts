import React, { LazyExoticComponent } from 'react'
export interface Route {
  path: string
  name: string
  access?: string
  exact?: boolean
  hide?: boolean
  routes?: Route[]
  icon?: React.ReactNode | ''
  component: LazyExoticComponent<any>
}
export interface IRoute {
  path: string
  routes: Route[]
}
