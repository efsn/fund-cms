export const get = (name: string) => {
  const value = localStorage.getItem(name)
  if (value) return JSON.parse(value)
  return null
}

export const remove = (name: string) => localStorage.removeItem(name)

export const set = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value))
}

export default {
  FUND_PLATE_DETAIL_INFO: 'FUND_PLATE_DETAIL_INFO',
}
