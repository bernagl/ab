import React, { Component, Fragment } from 'react'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import message from 'antd/lib/message'
import Alert from 'antd/lib/alert'
import Form from '../../components/Form/Form'
import Input from '../../components/Form/Input'
import { db } from '../../actions/firebase-config'

class ProviderDeleteForm extends Component {
  state = {
    showInput: false
  }

  toggle = () => this.setState(({ showInput }) => ({ showInput: !showInput }))

  submit = ({ confirm }) => {
    const { provider } = this.props
    if (confirm !== provider.name) {
      message.info('Ingresa el nombre correcto del proveedor')
      return
    }
    return db
      .ref('provider')
      .child(provider.id)
      .remove()
      .then(r => {
        message.success('El proveedor se ha eliminado')
        return { redirect: '/providers' }
      })
      .catch(r => {
        message.error('Ocurrió un error, por favor vuelve a intentarlo')
        return false
      })
    // return { redirect: '/providers' }
  }

  render() {
    const { showInput } = this.state
    const { provider } = this.props
    return (
      <div className="row">
        <div className="col-12 col-md-6">
          <Alert
            message="Advertencia"
            description="Si elimina el proveedor toda su información será borrada de nuestra base de datos"
            type="warning"
            showIcon
          />
          <Button
            type="danger"
            className="my-3"
            onClick={this.toggle}
            disabled={showInput}
          >
            {`Eliminar proveedor ${provider.name}`}
          </Button>
        </div>
        {showInput && (
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <Divider />
                <Form submit={this.submit} submitText="Eliminar" shouldUpdate>
                  <Input
                    label="Ingresa el nombre del proveedor para eliminarlo"
                    name="confirm"
                    placeholder={provider.name}
                    validations="minLength:1"
                    validationError="Ingresa un nombre válido"
                    required
                  />
                </Form>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ProviderDeleteForm
