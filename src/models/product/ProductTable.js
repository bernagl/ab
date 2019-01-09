import React, { Component } from 'react'
import Table from '../../components/Table'
import { Link } from 'react-router-dom'
import Icon from 'antd/lib/icon'

export default class extends Component {
  state = { document: {} }

  // async componentDidMount() {
  //   const { id } = this.props.state.user
  //   console.log(this.props)
  //   const document = await getDocument('provider')(id)
  //   console.log(document)
  //   this.setState({ document })
  // }

  render() {
    const { services, provider } = this.props
    return (
      <Table
        // canExport={true}
        // header={t}
        model={`product/${provider.id}`}
        modelName="Servicios"
        // modelName={`${provider.name}`}
        data={services}
        columns={[
          { key: 'name', label: 'Nombre' },
          { key: 'email', label: 'Email' },
          {
            key: 'actions',
            label: 'Acciones',
            Render: snap => (
              <Link to={`/user/${snap.id}`}>
                                <Icon type="form" theme="outlined" />                 {'  '}                 Editar
              </Link>
            )
          }
        ]}
      />
    )
  }
}
