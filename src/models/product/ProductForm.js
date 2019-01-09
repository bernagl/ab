import React, { Fragment } from 'react'
import Input from '../../components/F/Input'
import ModelWrapper from '../ModelWrapper'

export default ({
  match: {
    params: { id_provider }
  }
}) => {
  return (
    <ModelWrapper
      id={id_provider}
      model="product"
      modelName="producto"
      modelLabel="Productos"
      redirect={`/products/${id_provider}`}
    >
      {({ name, email }) => {
        return (
          <Fragment>
            <Input
              name="name"
              placeholder="Nombre completo"
              label="Nombre"
              validations="minLength:3"
              validationError="Ingresa un nombre válido"
              required
              defaultValue={name}
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
          </Fragment>
        )
      }}
    </ModelWrapper>
  )
}
