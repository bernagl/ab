import React, { Fragment } from 'react'
import { Spin } from '../../antd'
import CenterWrapper from './CenterWrapper'

export default ({ children, loading }) => {
  return (
    <Fragment>
      {loading ? (
        <CenterWrapper>
          <Spin tip="Cargando" />
        </CenterWrapper>
      ) : (
        children
      )}
    </Fragment>
  )
}
