import React, { Fragment } from 'react'
import Input from '../../components/Form/Input'
import ModelWrapper from '../ModelWrapper'
import Icon from 'antd/lib/icon'
import { Select, Option } from '../../components/Form/Select'
import { createUser, updateUser } from '../../actions/userActions'

const RenderRightSide = snap => <RightSideClass {...snap} />

const submit = uid => async model => {
  const response = uid
    ? await updateUser({
        ...model,
        uid,
        phoneNumber: '+52' + model.phoneNumber
      })
    : await createUser({
        ...model,
        phoneNumber: '+52' + model.phoneNumber
      })

  return response
}

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
      submit={submit(id)}
    >
      {({ name, email, phoneNumber = '', status }) => {
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
              name="phoneNumber"
              placeholder="Celular"
              label="Celular"
              validations={{ isNumeric: true, minLength: 10, maxLength: 10 }}
              validationError="Ingresa un número de celular válido"
              required
              defaultValue={phoneNumber.replace('+52', '')}
            />
            <Select
              name="status"
              label="Status"
              defaultValue={status ? +status : 1}
              // value={status}
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
