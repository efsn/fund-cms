import { Route } from '@/types/route'

export const getPaths = (routes: Route[], path: string) => {
  if (!path) return []
  const breadcrumbs: Route[] = []
  let end = false

  function pick(routes: Route[]) {
    let index = 0
    if (end) return
    while (index < routes.length && !end) {
      const item = routes[index]
      breadcrumbs.push(item)
      if (path === item.path) end = true
      else {
        if (item.routes) pick(item.routes)
        if (!end) breadcrumbs.pop()
        index++
      }
    }
  }
  pick(routes)
  return breadcrumbs
}
