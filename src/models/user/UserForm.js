import React, { Fragment } from 'react'
import Input from '../../components/F/Input'
import ModelWrapper from '../ModelWrapper'
import Icon from 'antd/lib/icon'
import { Select, Option } from '../../components/F/Select'

const RenderRightSide = snap => <RightSideClass {...snap} />

export default ({
  match: {
    params: { id }
  }
}) => {
  return (
    <ModelWrapper
      id={id}
      model="user"
      modelName="usuario"
      modelLabel="Usuarios"
      redirect="/users"
      RenderRightSide={RenderRightSide}
    >
      {({ name, email, phone, status }) => {
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
            <Input
              name="phone"
              placeholder="Celular"
              label="Celular"
              validations={{ isNumeric: true, minLength: 10, maxLength: 10 }}
              validationError="Ingresa un número de celular válido"
              required
              defaultValue={phone}
            />
            <Select
              name="status"
              label="Status"
              defaultValue={status ? status : 2}
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

const RightSideClass = ({ email, phone }) => {
  return (
    <Fragment>
      <div className="col-12 col-md-6 col-lg-8">
        <a href={`mailto:${email}`}>
          <Icon type="mail" theme="outlined" /> Enviar correo
        </a>
        <br />
        <a href={`tel:+${phone}`}>
          <Icon type="phone" theme="outlined" /> Llamar
        </a>
      </div>
    </Fragment>
  )
}
