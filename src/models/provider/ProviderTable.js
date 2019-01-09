import React, { Fragment } from 'react'
import Table from '../../components/Table'
import { Link } from 'react-router-dom'
import Icon from 'antd/lib/icon'
import Badge from 'antd/lib/badge'
import ModelHOC from '../../components/ModelHOC'

export default () => (
  <ModelHOC model="provider">
    {documents => (
      <Table
        model="provider"
        modelName="Proveedores"
        data={documents}
        columns={[
          { key: 'name', label: 'Nombre', width: 300 },
          {
            key: 'email',
            label: 'Email',
            Render: ({ email }) => (
              <Fragment>
                <a href={`mailto:${email}`}>
                  <Icon type="mail" theme="outlined" />
                  {'     '}
                </a>
                <span>{email}</span>
              </Fragment>
            ),
            width: 350
          },
          {
            key: 'phone',
            label: 'Celular',
            width: 120,
            Render: ({ phone }) => (
              <Fragment>
                <a href={`tel+:${phone}`}>
                  <Icon type="phone" theme="outlined" />
                </a>
                {'     '}
                <span>{phone}</span>
              </Fragment>
            )
          },
          {
            key: 'verified',
            label: 'Verificada',
            width: 80,
            Render: ({ verified }) =>
              verified ? (
                <Icon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#1890ff"
                />
              ) : (
                ''
              )
          },
          {
            label: 'Status',
            width: 90,
            Render: ({ status }) =>
              status === 1 ? (
                <Badge status="success" text="Activo" />
              ) : (
                <Badge status="default" text="Inactivo" />
              )
          },
          {
            key: 'actions',
            label: 'Acciones',
            Render: ({ id, email, phone }) => (
              <Fragment>
                <Link to={`/provider/${id}`}>
                  <Icon type="form" theme="outlined" />
                  {'  '}
                  Editar
                </Link>
              </Fragment>
            )
          }
        ]}
      />
    )}
  </ModelHOC>
)
