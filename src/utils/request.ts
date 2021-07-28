import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10 * 60 * 1000,
})

instance.interceptors.response.use((result) => {
  const { data = {} } = result
  const { statusCode, data: rst } = data
  if (statusCode === 0) return rst
  return Promise.reject(data)
})

export const get = <T>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<T & any> => instance.get(url, { ...config, params })

export const post = <T>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<T & any> => instance.post(url, params, config)

export default instance
