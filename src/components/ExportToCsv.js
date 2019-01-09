import React from 'react'
import { CSVLink } from 'react-csv'
import Icon from 'antd/lib/icon'

export default ({ data, headers, model }) => {
  return (
    <CSVLink data={data} headers={headers} filename={`skipum-${model}.csv`}>
      <Icon type="file-excel" theme="outlined" /> Exportar CSV
    </CSVLink>
  )
}
