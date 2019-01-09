import React, { Component, Fragment } from 'react'
import ExportToCsv from './ExportToCsv'
import 'react-xtable/dist/styles.css'
import Divider from 'antd/lib/divider'
import Button from 'antd/lib/button'
import { Link } from 'react-router-dom'
import T from './T'

export default class Table extends Component {
  static defaultProps = {
    canAdd: true,
    canExport: true,
    header: true
  }

  state = { dataCallback: [] }

  callback = dataCallback => {
    this.setState({ dataCallback })
  }

  render() {
    const {
      canAdd,
      columns,
      canExport,
      header,
      headers,
      data,
      model,
      modelName
    } = this.props
    return (
      <Fragment>
        {header && (
          <div>
            {modelName && (
              <h2 className="m-0" style={{ display: 'inline' }}>
                {modelName}
              </h2>
            )}
            {canAdd && (
              <Link to={`/${model}`}>
                <Button type="primary" className="float-right">
                  Agregar
                </Button>
              </Link>
            )}
          </div>
        )}
        {canExport && (
          <div>
            <ExportToCsv
              data={this.state.dataCallback}
              headers={headers}
              model={model}
            />
          </div>
        )}
        <Divider />
        <T
          data={data}
          callback={this.callback}
          columns={columns}
          searchPlaceholder="Buscar"
          emptyText={() => 'Ningún registro para mostrar'}
        />
      </Fragment>
    )
  }
}
