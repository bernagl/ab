import React, { Component, Fragment } from 'react'
import Input from '../../components/Form/Input'
import TextArea from '../../components/Form/Textarea'
import Checkbox from '../../components/Form/Checkbox'
import U from '../../components/UploaderWithPHP'
// import U from '../../components/UploaderWithPHP'
import ModelWrapper from '../ModelWrapper'
import { withRouter } from 'react-router-dom'
import Icon from 'antd/lib/icon'
import Tooltip from 'antd/lib/tooltip'
import Divider from 'antd/lib/divider'
import TreeSelect from 'antd/lib/tree-select'
import {
  getDocument,
  getDocumentsByModel,
  updateDocument,
  addDocument
} from '../../actions/firebaseActions'
import { Item } from 'antd/lib/form'
import moment from 'moment'
import Notification from '../../components/Notification'
import { Select, Option } from '../../components/Form/Select'

// const { TextArea } = I

const RenderRightSide = provider => <RightSideClass {...provider} />

const ProviderForm = props => <ProviderFormClass {...props} />

export class ProviderFormClass extends Component {
  state = {
    categories: [],
    data: [],
    subcategories: []
  }

  componentDidMount() {
    this.handleCategories(this.props)
  }

  componentDidUpdate(prevProps) {
    if (this.props.provider === prevProps.provider) return
    this.handleCategories(this.props)
  }

  handleCategories = async ({ provider }) => {
    const { subcategories } = provider
    const categories = await getDocumentsByModel('category')

    const categoriesPromise = categories.map(
      async ({ subcategories, ...rest }) => {
        if (typeof subcategories !== 'object') return
        const subcategorieTreePromise = Object.keys(subcategories).map(
          async subcategorie => {
            const sb = await getDocument('subcategory')(subcategorie)
            return { title: sb.name, value: sb.id, key: sb.id }
          }
        )

        const subcategorieTreeResolve = await Promise.all(
          subcategorieTreePromise
        )

        return {
          title: rest.name,
          value: rest.id,
          key: rest.id,
          children: subcategorieTreeResolve,
          selectable: false
        }
      }
    )

    const categoriesResolve = await Promise.all(categoriesPromise)
    const d = categoriesResolve.filter(e => e)
    const subcategoriesArray = subcategories
      ? Object.keys(subcategories).filter(s => subcategories[s])
      : []
    this.setState({
      categories,
      data: d,
      subcategories: subcategoriesArray
    })
  }

  submit = async model => {
    const { id, subcategories: providerSub } = this.props.provider
    const { subcategories } = this.state

    let providerSubcategories = id ? { ...providerSub } : {}
    id &&
      Object.keys(providerSubcategories).map(s => {
        providerSubcategories[s] = subcategories.includes(s)
      })

    subcategories.map(s => {
      providerSubcategories[s] = true
    })

    const subPromise = Object.keys(providerSubcategories).map(
      async subcategory => {
        let { providers } = await getDocument('subcategory')(subcategory)
        providers =
          typeof providers === 'undefined'
            ? { [id]: providerSubcategories[subcategory] }
            : { ...providers, [id]: providerSubcategories[subcategory] }

        await updateDocument('subcategory')({
          id: subcategory,
          providers
        })
      }
    )

    await Promise.all(subPromise)

    const response = (await id)
      ? await updateDocument('provider')({
          ...model,
          subcategories: providerSubcategories,
          id,
          modified_at: moment().format()
        })
      : await addDocument('provider')({
          ...model,
          rate: 5,
          rateSum: 0,
          subcategories: providerSubcategories,
          created_at: moment().format()
        })

    Notification(response)
    if (!id) this.props.history.push(`/provider/${response.params.id}`)
    return response
  }

  // onChange = e => {
  //   this.setState({ subcategories: [...e] })
  // }

  render() {
    const { categories } = this.state
    const { id } = this.props.match.params
    return (
      <ModelWrapper
        id={id}
        model="provider"
        modelLabel="Proveedores"
        submit={this.submit}
        RenderRightSide={snap => RenderRightSide(snap)}
      >
        {({
          address,
          picture,
          category,
          name,
          email,
          facebook,
          instagram,
          phone,
          lat,
          lng,
          localPhone,
          webpage,
          description,
          tags,
          range,
          status,
          homeService,
          verified,
          payments,
          mondayFridayO,
          mondayFridayC,
          saturdayO,
          saturdayC,
          sundayO,
          sundayC
        }) => {
          return (
            <Fragment>
              <U
                model="provider"
                name="picture"
                url={picture}
                folder="provider_gallery"
                // required
              />
              <Divider />
              <Input
                name="name"
                placeholder="Nombre completo"
                label="Nombre"
                validations="minLength:3"
                validationError="Ingresa un nombre válido"
                required
                defaultValue={name}
              />
              <Checkbox
                name="verified"
                placeholder="Cuenta verificada"
                label="Cuenta Verificada"
                value={verified}
              />
              <Input
                name="email"
                placeholder="Email"
                label="Email"
                validations="isEmail"
                validationError="Ingresa un email válido"
                required
                defaultValue={email}
              />
              <Input
                name="phone"
                placeholder="Celular"
                label="Celular"
                validations={{ isNumeric: true, minLength: 10, maxLength: 10 }}
                validationError="Ingresa un número de celular válido"
                required
                defaultValue={phone}
              />
              <Input
                name="localPhone"
                placeholder="Teléfono (local)"
                label="Teléfono (local)"
                validations={{ isNumeric: true, minLength: 8, maxLength: 10 }}
                validationError="Ingresa un número de teléfono válido"
                defaultValue={localPhone}
              />
              <Select
                name="payments"
                label="Métodos de pago"
                defaultValue={payments}
                value={payments}
                mode="multiple"
              >
                <Option value="Efectivo">Efectivo</Option>
                <Option value="Tarjeta">Tarjeta</Option>
                <Option value="Otros">Otros</Option>
                {/* <Option value="Efectivo">Efectivo</Option> */}
              </Select>
              <Divider />
              <div className="row">
                <div className="col-12">
                  <h2>Horarios</h2>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="mb-0">Lunes a Viernes</h3>
                    </div>
                    <div className="col-6">
                      <Input
                        name="mondayFridayO"
                        placeholder="09:00"
                        label="Abre"
                        validations={{ minLength: 5, maxLength: 5 }}
                        validationError="Ingresa una hora válida"
                        defaultValue={mondayFridayO}
                      />
                    </div>
                    <div className="col-6">
                      <Input
                        name="mondayFridayC"
                        placeholder="18:00"
                        label="Cierra"
                        validations={{ minLength: 5, maxLength: 5 }}
                        validationError="Ingresa una hora válida"
                        defaultValue={mondayFridayC}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="mb-0">Sábados</h3>
                    </div>
                    <div className="col-6">
                      <Input
                        name="saturdayO"
                        placeholder="09:00"
                        label="Abre"
                        validations={{ minLength: 5, maxLength: 5 }}
                        validationError="Ingresa una hora válida"
                        defaultValue={saturdayO}
                      />
                    </div>
                    <div className="col-6">
                      <Input
                        name="saturdayC"
                        placeholder="18:00"
                        label="Cierra"
                        validations={{ minLength: 5, maxLength: 5 }}
                        validationError="Ingresa una hora válida"
                        defaultValue={saturdayC}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <h3>Domingos</h3>
                    </div>
                    <div className="col-6">
                      <Input
                        name="sundayO"
                        placeholder="09:00"
                        label="Abre"
                        validations={{ minLength: 5, maxLength: 5 }}
                        validationError="Ingresa una hora válida"
                        defaultValue={sundayO}
                      />
                    </div>
                    <div className="col-6">
                      <Input
                        name="sundayC"
                        placeholder="18:00"
                        label="Cierra"
                        validations={{ minLength: 5, maxLength: 5 }}
                        validationError="Ingresa una hora válida"
                        defaultValue={sundayC}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
              <Select
                name="category"
                label="Categoría principal"
                value={category}
                defaultValue={category}
              >
                {categories.map(({ id, name }) => (
                  <Option value={name} key={id}>
                    {name}
                  </Option>
                ))}
              </Select>
              {/* <Item layout="vertical" label="Categorías">
                <TreeSelect
                  style={{ width: 300 }}
                  value={this.state.subcategories}
                  treeData={this.state.data}
                  placeholder="Selecciona las categorías del proveedor"
                  treeDefaultExpandAll
                  onChange={this.onChange}
                  multiple
                />
              </Item> */}
              <Checkbox
                name="homeService"
                placeholder="Servicio a domicilio"
                label="Servicio a domicilio"
                value={homeService}
              />
              <Input
                name="range"
                placeholder="Rango de distancia (En KM)"
                label="Kilometros a la redonda"
                validations={{ isNumeric: true, minLength: 1, maxLength: 10 }}
                validationError="Ingresa un rango válido"
                required
                defaultValue={range}
              />
              <TextArea
                placeholder="Dirección"
                label="Dirección"
                name="address"
                autosize
                defaultValue={address}
                className="mt-3"
                rows={4}
              />
              <Input
                name="lat"
                placeholder="Latitud"
                label={
                  <span>
                    Latitud{' '}
                    <a
                      href="https://www.google.com/maps/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon type="environment" theme="outlined" />
                      Ver mapa
                    </a>
                  </span>
                }
                // validations={{ isNumeric: true, minLength: 10, maxLength: 10 }}
                validationError="Ingresa una latitud válida"
                defaultValue={lat}
                required
              />
              <Input
                name="lng"
                placeholder="Longitud"
                label="Longitud"
                // validations={{ isNumeric: true, minLength: 10, maxLength: 10 }}
                validationError="Ingresa una longitud válida"
                defaultValue={lng}
                required
              />
              <Input
                name="webpage"
                placeholder="Url de la página"
                label={
                  <Tooltip title="https://ejemplo.com" placement="right">
                    Página web (?)
                  </Tooltip>
                }
                inputFeedback
                validations="isUrl"
                validationError="Ingresa una url válida"
                defaultValue={webpage}
              />
              <Input
                name="facebook"
                placeholder="Usuario de Facebook"
                label={
                  <Tooltip title="Url de Facebook" placement="right">
                    Facebook (?)
                  </Tooltip>
                }
                inputFeedback
                validations="minLength:1"
                validationError="Ingresa un usuario válido"
                defaultValue={facebook}
                className="mt-3"
              />
              <Input
                name="instagram"
                placeholder="Usuario de Instagram"
                label={
                  <Tooltip title="Url de Instagram" placement="right">
                    Instagram (?)
                  </Tooltip>
                }
                inputFeedback
                validations="minLength:1"
                validationError="Ingresa un usuario válido"
                className="mt-3"
                defaultValue={instagram}
              />
              <TextArea
                placeholder="Descripción"
                label="Descripción"
                name="description"
                autosize
                defaultValue={description}
                className="mt-3"
                rows={4}
              />
              <TextArea
                placeholder="Tags"
                label={
                  <Tooltip
                    title="Separa las etiquetas con un espacio para mejor resultado en la búsqueda"
                    placement="right"
                  >
                    Etiquetas (?)
                  </Tooltip>
                }
                name="tags"
                autosize
                defaultValue={tags}
                rows={4}
              />
              <Select
                name="status"
                label="Status"
                defaultValue={status === 1 || !status ? 1 : 2}
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
}

export default withRouter(ProviderForm)

class RightSideClass extends Component {
  render() {
    // const { email, facebook, instagram, phone, webpage } = this.props
    return (
      <Fragment>
        {/* <div className="col-12 col-md-6 col-lg-8">
          <a href={`mailto:${email}`}>
            <Icon type="mail" theme="outlined" /> Enviar correo
          </a>
          <br />
          <a href={`tel:+${phone}`}>
            <Icon type="phone" theme="outlined" /> Llamar
          </a>
          <br />
          <a target="_blank" href={`${webpage}`}>
            <Icon type="global" theme="outlined" /> Página web
          </a>
          <br />
          <a target="_blank" href={`https://facebook.com/${facebook}`}>
            <Icon type="facebook" theme="outlined" /> Facebook
          </a>
          <br />
          <a target="_blank" href={`https://instagram.com/${instagram}`}>
            <Icon type="instagram" theme="outlined" /> Instagram
          </a>
        </div> */}
      </Fragment>
    )
  }
}
