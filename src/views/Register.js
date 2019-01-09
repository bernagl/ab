import React, { Component } from 'react'
import Form from '../components/Form/Form'
import Input from '../components/F/Input'
import { RadioButton, Option } from '../components/F/Radio'
import Notification from '../components/Notification'
import { register } from '../actions/firebaseAuth'
import AuthWrapper from '../components/Wrappers/AuthWrapper'

class Register extends Component {
  submit = async model => {
    const response = await register(model)
    Notification(response)
    return true
  }
  render() {
    return (
      <AuthWrapper bordered type="register" recover>
        <Form
          submitText="Registrarme"
          submit={this.submit}
          fullSubmitButton
          title="Registro"
          centeredTitle
        >
          <Input
            name="name"
            placeholder="Nombre completo"
            validations="minLength:3"
            validationError="Ingresa tu nombre completo"
            required
          />
          <Input
            name="email"
            placeholder="Correo electrónico"
            validations="isEmail"
            validationError="Ingresa un correo válido"
            required
          />
          <Input
            name="phone"
            placeholder="Teléfono"
            validations={{ minLength: 10, maxLength: 10, isNumeric: true }}
            validationError="Ingresa un teléfono válido"
            // type="number"
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
          <Input
            name="confirm"
            placeholder="Confirmar contraseña"
            validationError="Las contraseñas no coinciden"
            validations="equalsField:password"
            type="password"
            required
          />
          <RadioButton name="genre" label="Género" required>
            <Option value="hombre">Hombre</Option>
            <Option value="mujer">Mujer</Option>
          </RadioButton>
        </Form>
      </AuthWrapper>
    )
  }
}

export default Register
