import React, { Fragment } from 'react'
import Table from '../../components/Table'
import { Link } from 'react-router-dom'
import Icon from 'antd/lib/icon'
import Badge from 'antd/lib/badge'
import ModelHOC from '../../components/ModelHOC'

const headers = ['name', 'email']
export default () => (
  <ModelHOC model="user">
    {documents => (
      <Table
        model="user"
        modelName="Usuarios"
        data={documents}
        headers={headers}
        columns={[
          { key: 'name', label: 'Nombre' },
          {
            key: 'email',
            label: 'Email',
            Render: ({ email }) => (
              <Fragment>
                <a href={`mailto:${email}`}>
                  <Icon type="mail" theme="outlined" />
                </a>
                {'     '}
                <span>{email}</span>
              </Fragment>
            )
          },
          {
            key: 'phone',
            label: 'Teléfono',
            Render: ({ phoneNumber }) => (
              <Fragment>
                <a href={`tel+:${phoneNumber}`}>
                  <Icon type="phone" theme="outlined" />
                </a>
                {'     '}
                <span>{phoneNumber}</span>
              </Fragment>
            )
          },
          {
            label: 'Status',
            Render: ({ status }) =>
              status == 1 ? (
                <Badge status="success" text="Activo" />
              ) : (
                <Badge status="default" text="Inactivo" />
              )
          },
          {
            key: 'actions',
            label: 'Acciones',
            Render: ({ id, email, phone }) => (
              <Link to={`/user/${id}`}>
                <Icon type="form" theme="outlined" /> {'  '}
                Editar
              </Link>
            )
          }
        ]}
      />
    )}
  </ModelHOC>
)
