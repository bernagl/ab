import React, { Component } from 'react'
import Form from '../components/Form/Form'
import Input from '../components/F/Input'
import AuthWrapper from '../components/Wrappers/AuthWrapper'
import { recover } from '../actions/firebaseAuth'
import Notification from '../components/Notification'

class Recover extends Component {
  submit = async model => {
    const response = await recover(model)
    Notification(response)
    return true
  }

  render() {
    return (
      <AuthWrapper type="recover">
        <Form
          submit={this.submit}
          title="Recuperar contraseña"
          centeredTitle
          fullSubmitButton
          submitText="Recuperar contraseña"
        >
          <Input
            name="email"
            placeholder="Ingresa tu correo electrónico"
            label="Correo"
            validations="isEmail"
            validationError="Ingresa un correo válido"
            required
          />
        </Form>
      </AuthWrapper>
    )
  }
}

export default Recover
