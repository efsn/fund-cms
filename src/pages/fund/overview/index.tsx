import React, {
  FC,
  memo,
  // useCallback,
  useEffect,
  // useState,
  // Fragment,
} from 'react'
import Page from '@/components/page'
import Title from '@/components/title'
import moment from 'moment'
import { Row, Col } from 'antd'

import './index.scss'

const Index: FC<any> = () => {
  useEffect(() => {}, [])
  const today = moment(new Date()).format('YYYY-MM-DD')

  return (
    <Page title={`信息概览(${today})`}>
      <Row gutter={20}>
        <Col span={12}>
          <Title title={''}>sdf</Title>
        </Col>
        <Col span={12}>1</Col>
      </Row>
    </Page>
  )
}
export default memo(Index)
