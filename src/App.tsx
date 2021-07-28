import React, { memo, Suspense, FC, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import routes from './routes'

const RouteList: FC<any> = ({ path, exact, component, routes }) => {
  return (
    <Fragment>
      {path && component && (
        <Route key={path} path={path} exact={!exact} component={component} />
      )}
      {routes &&
        routes.map((item: any) => {
          return <RouteList key={item.path + item.name} {...item} />
        })}
    </Fragment>
  )
}

function App() {
  return (
    <Suspense fallback={<></>}>
      <Switch>
        <Route path={'/'} exact render={() => <Redirect to={'/home'} />} />
        <RouteList {...routes} />
        {/*<Redirect to={ROUTES_PATH.NOT_FOUND} />*/}
      </Switch>
    </Suspense>
  )
}

export default memo(App)
