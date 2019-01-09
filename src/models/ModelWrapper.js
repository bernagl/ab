import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Form from '../components/Form/Form'
import {
  addDocument,
  getDocument,
  updateDocument
} from '../actions/firebaseActions'
import Notification from '../components/Notification'
import Icon from 'antd/lib/icon'
import moment from 'moment'

class ModelWrapper extends Component {
  state = { snap: {}, loadingData: true }

  async componentDidMount() {
    const { id, model } = this.props
    const snap = id ? await getDocument(model)(id) : {}
    this.setState({ loadingData: false, snap })
  }

  submit = async modelForm => {
    const { id, model } = this.props
    const response = (await id)
      ? await updateDocument(model)({
          ...modelForm,
          id,
          modified_at: moment().format()
        })
      : await addDocument(model)({
          ...modelForm,
          created_at: moment().format()
        })

    Notification(response)
    if (!id) this.props.history.push(`/${model}/${response.params.id}`)
    return response
  }

  render() {
    const {
      className,
      id,
      modelName,
      modelLabel,
      redirect,
      RenderRightSide,
      submit
    } = this.props
    const { loadingData, snap } = this.state
    return (
      <div className="row">
        <div className={className ? className : 'col-12 col-md-6 col-lg-4'}>
          {redirect && (
            <Link to={redirect}>
              <Icon type="left" theme="outlined" />
              {modelLabel}
            </Link>
          )}
          <Form
            submitText="Guardar"
            submit={submit ? submit : this.submit}
            fullSubmitButton
            title={
              modelName
                ? `${id ? 'Actualizar' : 'Agregar'} ${modelName}`
                : false
            }
            loadingData={loadingData}
            shouldUpdate={id ? true : false}
          >
            {this.props.children(snap)}
          </Form>
        </div>
        {RenderRightSide && id
          ? RenderRightSide(snap)
          : id && (
              <div className="col-12 col-md-6 col-lg-8">
                <div>Creado: {moment(snap.created_at).format('LLL')}</div>
                <div>
                  Última modificación: {moment(snap.modified_at).format('LLL')}
                </div>
              </div>
            )}
      </div>
    )
  }
}

export default withRouter(ModelWrapper)
