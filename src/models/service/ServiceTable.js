import React, { Component } from 'react'
import Table from '../../components/Table'
import { Link } from 'react-router-dom'
import Icon from 'antd/lib/icon'
import Badge from 'antd/lib/badge'

export default class extends Component {
  state = { document: {} }

  render() {
    const { services, provider } = this.props
    return (
      <Table
        model={`service/${provider.id}`}
        // modelName="Servicios"
        data={services}
        columns={[
          { key: 'name', label: 'Nombre' },
          {
            key: 'status',
            label: 'Status',
            Render: ({ status }) => (
              <Badge
                status={status === 1 ? 'success' : 'default'}
                text={status === 1 ? 'Activo' : 'Inactivo'}
              />
            )
          },
          { key: 'id', label: 'ID' },
          {
            key: 'actions',
            label: 'Acciones',
            Render: snap => (
              <Link to={`/service/${provider.id}/${snap.id}`}>
                <Icon type="form" theme="outlined" /> {'  '} Editar
              </Link>
            )
          }
        ]}
      />
    )
  }
}
