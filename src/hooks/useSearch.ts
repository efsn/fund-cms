import { useState } from 'react'
import { parse, stringify } from 'query-string'
import { useHistory } from 'react-router'

const useSearch = <T = any>(): [T, (_: { [key: string]: any }) => void] => {
  const history = useHistory()
  const [search, setSearch] = useState<T>(() => parse(window.location.search))
  const change = (params: { [key: string]: string }) => {
    const { pathname, search } = window.location
    const serialized = stringify({ ...parse(search), ...params })
    setSearch({ ...parse(search), ...params })
    const path = `${pathname}${!!serialized ? `?${serialized}` : ''}`
    history.push(path)
  }

  return [search, change]
}

export default useSearch
