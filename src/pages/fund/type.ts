export interface IFund {
  date: string
  fund: number
  sort: number
  id: number
}
export interface ITicket {
  id: number
  name: string
  code: string
  isBan: boolean
  level: number
  fund: IFund[]
}
