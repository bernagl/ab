import React, { Component } from 'react'
import Form from '../components/Form/Form'
import Input from '../components/Form/Input'
import Notification from '../components/Notification'
import { login } from '../actions/firebaseAuth'
import AuthWrapper from '../components/Wrappers/AuthWrapper'

class Login extends Component {
  submit = async model => {
    const response = await login(model)
    Notification(response)
    return true
  }
  render() {
    return (
      <AuthWrapper bordered type="login" recover>
        <Form
          shouldUpdate
          submitText="Iniciar sesión"
          submit={this.submit}
          fullSubmitButton
          title="Iniciar sesión"
          // subtitle="Ingresa tu correo y contraseña"
          centeredTitle
        >
          <Input
            name="email"
            placeholder="Correo electrónico"
            validations="isEmail"
            validationError="Ingresa un correo válido"
            required
          />
          <Input
            name="password"
            placeholder="Contraseña"
            validationError="La contraseña es muy corta"
            validations="minLength:6"
            type="password"
            required
          />
        </Form>
      </AuthWrapper>
    )
  }
}

export default Login
