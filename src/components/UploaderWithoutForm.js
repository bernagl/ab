import React from 'react'
import Icon from 'antd/lib/icon'
import Tooltip from 'antd/lib/tooltip'
import axios from 'axios'
import { FILE_PATH } from '../constants'

export default class Uploader extends React.Component {
  state = { name: 'picture', image: '', url: '', loading: false }

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
        success({ ...r, filepath })
        this.setState({ loading: false })
      })
      .catch(e => {
        error(e)
        this.setState({ loading: false })
      })
  }

  render() {
    const { name, loading } = this.state
    return (
      <div>
        <input
          placeholder="image"
          type="file"
          name={name}
          accept="image/*, video/*"
          id={name}
          onChange={e => this.handleImage(e)}
          style={{ display: 'none' }}
        />
        {!loading ? (
          <label htmlFor={name}>
            <span className="uploader-label">
              <Icon
                type="cloud-upload"
                theme="outlined"
                style={{ fontSize: 42 }}
              />
            </span>
          </label>
        ) : (
          <span className="uploader-label">
            <Tooltip title="Debes esperar a que se terminen de subir todas las imágenes para subir otra">
              <Icon type="loading" theme="outlined" style={{ fontSize: 42 }} />
            </Tooltip>
          </span>
        )}
      </div>
    )
  }
}
