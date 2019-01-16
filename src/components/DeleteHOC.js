import React from 'react'
import { deleteDocument } from '../actions/firebaseActions'
import Popconfirm from 'antd/lib/popconfirm'
import message from 'antd/lib/message'
import Icon from 'antd/lib/icon'

const confirm = async ({ collection, id, update }) => {
  message.loading('Eliminando registro')
  const response = await deleteDocument(collection, id)
  message.destroy()
  const text = 'Registro eliminado'
  if (response === 202) {
    message.success(text)
    update()
  } else message.info('Ocurrió un error, por favor vuelve a intentarlo')
}

export default props => (
  <Popconfirm
    title="¿Desear eliminar este registro?"
    onConfirm={() => confirm(props)}
    okText="Si, eliminar"
    cancelText="No"
  >
    <Icon type="delete" style={{ color: 'red', textAlign: 'center' }} />
  </Popconfirm>
)
