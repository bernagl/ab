import React from 'react'
import Table from '../../components/Table'
import moment from 'moment'
import ModelHOC from '../../components/ModelHOC'
import Icon from 'antd/lib/icon'
import Badge from 'antd/lib/badge'
import { Link } from 'react-router-dom'
import Popover from 'antd/lib/popover'

export default () => (
  <ModelHOC model="notification">
    {documents => (
      <Table
        model="notification"
        modelName="Notificaciones"
        data={documents}
        columns={[
          { key: 'name', label: 'Título' },
          {
            key: 'body',
            label: 'Mensaje',
            Render: ({ body, name }) => (
              <Popover content={body} title={name}>
                {body}
              </Popover>
            )
          },
          {
            key: 'created_at',
            label: 'Fecha',
            Render: snap => <span>{moment(snap.created_at).format('LL')}</span>
          },
          {
            key: 'created_at',
            label: 'Hora',
            Render: snap => <span>{moment(snap.created_at).format('LT')}</span>
          },
          {
            label: 'Status',
            Render: ({ status }) =>
              status === 1 ? (
                <Badge status="success" text="Activa" />
              ) : (
                <Badge status="default" text="Inactiva" />
              )
          },
          {
            key: 'actions',
            label: 'Acciones',
            Render: snap => (
              <Link to={`/notification/${snap.id}`}>
                <Icon type="form" theme="outlined" /> {'  '} Editar
              </Link>
            )
          }
        ]}
      />
    )}
  </ModelHOC>
)
