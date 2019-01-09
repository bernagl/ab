import React, { Component, Fragment } from 'react'
import { getDocument } from '../../actions/firebaseActions'
import Tabs from 'antd/lib/tabs'
import ProviderForm from '../provider/ProviderForm'
import ProviderGallery from './ProviderGallery'
import ProviderDeleteForm from './ProviderDeleteForm'
import Service from '../service/ServiceTable'
import Review from '../review/ReviewTable'
import Icon from 'antd/lib/icon'
import Divider from 'antd/lib/divider'

const { TabPane } = Tabs

const TabsTitle = [
  'Servicios',
  'Reseñas',
  'Información General',
  'Galería',
  'Ajustes'
]

export default class Provider extends Component {
  state = { currentTab: 0, provider: {}, services: [], reviews: [] }

  async componentDidMount() {
    const { id } = this.props.match.params
    if (!id) return

    const provider = await getDocument('provider')(id)
    const services = await this.getDocumentByModel(
      provider['services'],
      'service'
    )
    const reviews = await this.getDocumentByModel(provider['reviews'], 'review')
    this.setState({ provider, reviews, services })
  }

  getDocumentByModel = async (snaps, model) => {
    const _getDocument = getDocument(model)
    if (!snaps) return []

    const snapsPromise = Object.keys(snaps).map(service =>
      _getDocument(service)
    )
    const snapshots = await Promise.all(snapsPromise)
    return snapshots
  }

  render() {
    const { currentTab, reviews, services, provider } = this.state
    const { id } = this.props.match.params
    return (
      <div className="row">
        <div className="col-3">
          <h2>
            {id ? provider.name : 'Agregar proveedor'}
            {provider.verified && (
              <Fragment>
                {' '}
                <Icon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#1890ff"
                />
              </Fragment>
            )}
          </h2>
          <Divider />
          <h3>{TabsTitle[currentTab]}</h3>
        </div>
        {id && (
          <div className="col-9">
            <a href={`mailto:${provider.email}`}>
              <Icon type="mail" theme="outlined" /> Enviar correo
            </a>
            <br />
            <a href={`tel:+${provider.phone}`}>
              <Icon type="phone" theme="outlined" /> Llamar
            </a>
            <br />
            <a target="_blank" href={`${provider.webpage}`}>
              <Icon type="global" theme="outlined" /> Página web
            </a>
            <br />
            <a
              target="_blank"
              href={`https://facebook.com/${provider.facebook}`}
            >
              <Icon type="facebook" theme="outlined" /> Facebook
            </a>
            <br />
            <a
              target="_blank"
              href={`https://instagram.com/${provider.instagram}`}
            >
              <Icon type="instagram" theme="outlined" /> Instagram
            </a>
          </div>
        )}
        <Divider />
        <div className="col-12">
          <Tabs
            defaultActiveKey={id ? '0' : '2'}
            onChange={currentTab => this.setState({ currentTab })}
          >
            <TabPane tab="Servicios" disabled={id ? false : true} key="0">
              <Service services={services} provider={provider} />
            </TabPane>
            <TabPane tab="Reseñas" disabled={id ? false : true} key="1">
              <Review reviews={reviews} provider={provider} />
            </TabPane>
            <TabPane tab="General" key="2">
              <ProviderForm provider={provider} />
            </TabPane>
            <TabPane tab="Galería" disabled={id ? false : true} key="3">
              <ProviderGallery provider={provider} />
            </TabPane>
            <TabPane tab="Ajustes" disabled={id ? false : true} key="4">
              <ProviderDeleteForm provider={provider} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
