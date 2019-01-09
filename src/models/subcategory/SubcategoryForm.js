import React, { Component } from 'react'
import {
  addDocument,
  getDocument,
  updateDocument
} from '../../actions/firebaseActions'
import Form from '../../components/Form/Form'
import Notification from '../../components/Notification'
import moment from 'moment'
import Input from '../../components/F/Input'
import { Option, Select } from '../../components/F/Select'
import { Link } from 'react-router-dom'
import Icon from 'antd/lib/icon'

export default class SubcategoryForm extends Component {
  state = { subcategory: {}, category: {}, loadingData: true }

  async componentDidMount() {
    const { subcategory_id, category_id } = this.props.match.params
    const subcategory = subcategory_id
      ? await getDocument('subcategory')(subcategory_id)
      : {}
    const category = await getDocument('category')(category_id)
    this.setState({ subcategory, category, loadingData: false })
  }

  submit = async model => {
    const { subcategory_id, category_id } = this.props.match.params
    const { category } = this.state
    const response = (await subcategory_id)
      ? await updateDocument('subcategory')({
          ...model,
          id: subcategory_id,
          modified_at: moment().format()
        })
      : await addDocument('subcategory')({
          ...model,
          created_at: moment().format()
        })

    if (!subcategory_id) {
      await updateDocument('category')({
        ...category,
        id: category_id,
        subcategories: {
          ...category['subcategories'],
          [response.params.id]: true
        }
      })
    }

    Notification(response)

    return true
  }

  render() {
    const { subcategory_id } = this.props.match.params
    const {
      loadingData,
      category: { id, name },
      subcategory: { color, name: scatName, status }
    } = this.state

    return (
      <div className="col-12 col-md-6 col-lg-4">
        <Link to={`/category/${id}`}>
          <Icon type="left" theme="outlined" /> Regresar
        </Link>
        <Form
          submitText="Guardar"
          submit={this.submit}
          fullSubmitButton
          loadingData={loadingData}
          title={`${
            subcategory_id ? 'Actualizar subcategoría' : 'Agregar subcategoría'
          } de ${name}`}
          shouldUpdate
        >
          <Input
            name="name"
            placeholder="Nombre"
            label="Nombre"
            validations="minLength:3"
            validationError="Ingresa un nombre válido"
            required
            defaultValue={scatName}
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
        </Form>
      </div>
    )
  }
}
