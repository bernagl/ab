import React, { Component, Fragment } from 'react'
import Input from '../../components/F/Input'
import ModelWrapper from '../ModelWrapper'
import Divider from 'antd/lib/divider'
import Icon from 'antd/lib/icon'
import Badge from 'antd/lib/badge'
import Table from '../../components/Table'
import Uploader from '../../components/UploaderWithPHP'
import { getDocument } from '../../actions/firebaseActions'
import { Link } from 'react-router-dom'
import { Select, Option } from '../../components/F/Select'

const RenderRightSide = props => <RightSideClass {...props} />

export default ({
  match: {
    params: { id }
  }
}) => {
  return (
    <ModelWrapper
      id={id}
      model="category"
      modelName="categoría"
      modelLabel="Categorías"
      redirect="/categories"
      RenderRightSide={RenderRightSide}
    >
      {({ color, name, status, picture }) => {
        return (
          <Fragment>
            <Uploader
              model="category"
              name="picture"
              url={picture}
              folder="category_gallery"
              required
            />
            <Input
              defaultValue={name}
              name="name"
              placeholder="Nombre"
              label="Nombre"
              validations="minLength:3"
              validationError="Ingresa un nombre válido"
              required
            />
            <Input
              name="color"
              placeholder="Color"
              label="Color"
              validations="minLength:3"
              required
              type="color"
              defaultValue={color}
            />
            <Select
              name="status"
              label="Status"
              defaultValue={status ? status : 2}
              value={status}
            >
              <Option value={1}>Activo</Option>
              <Option value={2}>Inactivo</Option>
            </Select>
          </Fragment>
        )
      }}
    </ModelWrapper>
  )
}

class RightSideClass extends Component {
  state = { snapshots: [] }

  async componentDidUpdate(prevProps) {
    const { id, subcategories } = this.props
    if (id === prevProps.id) return

    if (typeof subcategories === 'undefined') return

    const snapsPromise = Object.keys(subcategories).map(subcategory =>
      getDocument('subcategory')(subcategory)
    )
    const snapshots = await Promise.all(snapsPromise)

    this.setState({ snapshots })
  }

  render() {
    const { snapshots } = this.state
    const { id } = this.props
    return (
      <div className="col-12">
        <Divider />
        <Table
          model={`subcategory/${id}`}
          data={snapshots}
          modelName="Subcategorías"
          columns={[
            { key: 'name', label: 'Nombre' },
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
                <Link to={`/subcategory/${id}/${snap.id}`}>
                  <Icon type="form" theme="outlined" /> {'  '} Editar
                </Link>
              )
            }
          ]}
        />
      </div>
    )
  }
}
