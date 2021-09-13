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
import Total from './components/total'
import Percent from './components/percent'
import Volume from './components/volume'
import Mlf from './components/mlf'
import moment from 'moment'
import { Row, Col } from 'antd'

import './index.scss'

const Index: FC<any> = () => {
  useEffect(() => {}, [])
  const today = moment(new Date()).format('YYYY-MM-DD')

  return (
    <Page title={`信息概览(${today})`}>
      <div className='page_overview-title'>
        <h5>基础信息</h5>
        <Row gutter={20}>
          <Col span={6}>
            <Volume />
          </Col>
          <Col span={6}>
            <Mlf />
          </Col>
          <Col span={6}>3</Col>
          <Col span={6}>3</Col>
        </Row>
      </div>
      <Row gutter={20}>
        <Col span={12}>
          <Title title={'前150总额'}>
            <Total />
          </Title>
        </Col>
        <Col span={12}>
          <Title title={'前200板块比例(总额/个数)'}>
            <Percent />
          </Title>
        </Col>
      </Row>
    </Page>
  )
}
export default memo(Index)
