import React, { Component, Fragment } from 'react'
import Input from '../../components/F/Input'
import TextArea from '../../components/F/Textarea'
import { Select, Option } from '../../components/F/Select'
import ModelWrapper from '../ModelWrapper'
import { updateDocument, addDocument } from '../../actions/firebaseActions'
import Notification from '../../components/Notification'
import axios from 'axios'
import moment from 'moment'

export default class extends Component {
  submit = async modelForm => {
    const { id } = this.props
    const response = id
      ? await updateDocument('notification')({
          ...modelForm,
          id,
          modified_at: moment().format()
        })
      : await addDocument('notification')({
          ...modelForm,
          created_at: moment().format()
        })
    response.status === 202 && this.sendNotification(modelForm)
    Notification(response)
    if (!id) this.props.history.push(`/notification/${response.params.id}`)
    return response
  }

  sendNotification = ({ body, name: title }) => {
    axios
      .post(
        'https://fcm.googleapis.com/fcm/send',
        { to: '/topics/Skipum', data: { body }, notification: { body, title } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'key=AIzaSyAk_ymcpu0xeC7Js0iQCn11YT0o56OJXxM'
          }
        }
      )
      .then(r => console.log(r))
      .catch(e => console.log(e))
  }

  render() {
    const { id } = this.props.match.params
    return (
      <ModelWrapper
        id={id}
        model="notification"
        modelName="notificación"
        modelLabel="Notificaciones"
        redirect="/notifications"
        submit={this.submit}
      >
        {({ name, body, status }) => {
          return (
            <Fragment>
              <Input
                name="name"
                placeholder="Título de la notificación"
                label="Título"
                validations="minLength:3"
                validationError="Ingresa un título válido"
                required
                defaultValue={name}
              />
              <TextArea
                placeholder="Cuerpo de la notificación"
                label="Cuerpo"
                name="body"
                autosize
                defaultValue={body}
                rows={4}
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
}
//     )
//   }
// } ({
//   match: {
//     params: { id }
//   }
// }) => {
//   return (
// }
