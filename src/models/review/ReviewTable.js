import React, { Component } from 'react'
import Table from '../../components/Table'
import Rate from 'antd/lib/rate'

export default class extends Component {
  render() {
    const { reviews } = this.props
    return (
      <Table
        canAdd={false}
        model="Reseñas"
        data={reviews}
        columns={[
          { key: 'review', label: 'Reseña' },
          {
            key: 'rate',
            label: 'Calificación',
            Render: ({ rate }) => <Rate disabled defaultValue={rate} />
          }
        ]}
      />
    )
  }
}
