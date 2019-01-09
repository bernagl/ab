import React from 'react'
import Table from '../../components/Table'
import { Link } from 'react-router-dom'
import Icon from 'antd/lib/icon'
import Badge from 'antd/lib/badge'
import ModelHOC from '../../components/ModelHOC'

export default () => (
  <ModelHOC model="category">
    {documents => {
      return (
        <Table
          model="category"
          modelName="Categorías"
          data={documents}
          columns={[
            { key: 'name', label: 'Nombre' },
            {
              label: 'Subcategorías',
              Render: ({ subcategories }) =>
                typeof subcategories === 'object'
                  ? Object.keys(subcategories).length
                  : 0
            },
            {
              label: 'Color',
              Render: ({ color }) => (
                <div
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 2,
                    backgroundColor: color
                  }}
                />
              )
            },
            {
              label: 'Icono',
              Render: ({ name, picture }) =>
                picture ? (
                  <div>
                    <img
                      src={picture}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 5
                      }}
                      alt={`Foto de categoría ${name}`}
                    />
                  </div>
                ) : (
                  ''
                )
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
                <Link to={`/category/${snap.id}`}>
                  <Icon type="form" theme="outlined" /> {'  '} Editar
                </Link>
              )
            }
          ]}
        />
      )
    }}
  </ModelHOC>
)
