import React from 'react'
import Icon from 'antd/lib/icon'
import Tooltip from 'antd/lib/tooltip'
import axios from 'axios'
import { FILE_PATH } from '../constants'
import Input from './Form/UploaderInput'

export default class Uploader extends React.Component {
  state = {
    name: 'picture',
    image: '',
    url: '',
    filepath: null,
    loading: false
  }

  componentDidMount() {
    this.setState({ url: this.props.url })
  }

  componentWillReceiveProps(newProps) {
    newProps.url !== this.props.url && this.setState({ url: newProps.url })
  }

  handleImage = async e => {
    const { error, folder, success } = this.props
    this.setState({ loading: true })
    const file = e.target.files[0]
    const form = new FormData()
    const filename = +new Date() + file.name.replace(/ /g, '')
    const filepath = `${FILE_PATH}/images/${folder}/${filename}`
    form.append('name', filename)
    form.append('folder', folder)
    form.append('image', file)
    axios
      .post(FILE_PATH + '/api/uploadImage.php', form, {
        headers: { 'Content-type': 'multipart/form-data' }
      })
      .then(r => {
        // success({ ...r, filepath })
        this.setState({ loading: false, filepath })
      })
      .catch(e => {
        error(e)
        this.setState({ loading: false })
      })
  }

  render() {
    const { loading, filepath } = this.state
    const { name, required, url } = this.props
    return (
      <div className="uploader col-12 pl-0">
        <input
          placeholder="image"
          type="file"
          name={name}
          accept="image/*"
          id={name}
          onChange={e => this.handleImage(e)}
          style={{ display: 'none' }}
        />
        {!loading ? (
          <label htmlFor={name}>
            <div className="img-container">
              <img
                src={filepath ? filepath : url}
                alt=""
                style={{ width: 50, height: 50, borderRadius: 5 }}
              />
              <span className="ml-2">Cambiar</span>
            </div>
          </label>
        ) : (
          <span className="uploader-label">
            <Tooltip title="Debes esperar a que se terminen de subir todas las imágenes para subir otra">
              <Icon type="loading" theme="outlined" style={{ fontSize: 42 }} />
            </Tooltip>
          </span>
        )}
        <Input
          type="hidden"
          name={name}
          value={filepath ? filepath : url}
          required={required}
        />
      </div>
    )
  }
}
