import React, { Component } from 'react'
import message from 'antd/lib/message'
import U from '../../components/UploaderWithoutForm'
import { getDocumentsByModel } from '../../actions/firebaseActions'
import { db } from '../../actions/firebase-config'
import Button from 'antd/lib/button'
import Popconfirm from 'antd/lib/popconfirm'

export default class extends Component {
  state = { gallery: [] }
  componentDidMount() {
    this.setPropsToState()
  }

  async setPropsToState() {
    db.ref('banner')
      .once('value')
      .then(snap => {
        const galeria = snap.val()
        const gallery = this.galleryObjToArray(galeria)
        this.setState({ gallery, galleryObj: galeria })
      })
  }

  galleryObjToArray = obj =>
    typeof obj !== 'undefined'
      ? Object.keys(obj).map(pid => ({ pid, picture: obj[pid] }))
      : []

  updateGallery = async gallery => {
    return db
      .ref('banner')
      .set(gallery)
      .then(r => {
        return 202
      })
      .catch(() =>
        message.error('Ocurrió un error, por favor vuelve a intentarlo')
      )
  }

  uploadSuccess = async ({ data: { status, name: imageName }, filepath }) => {
    if (status === 202) {
      const { gallery: userGallery, galleryObj } = this.state
      const timestamp = +new Date()
      let gallery =
        typeof galleryObj === 'undefined'
          ? { [timestamp]: filepath }
          : { ...galleryObj, [timestamp]: filepath }

      const responseSatus = await this.updateGallery(gallery)
      if (responseSatus === 202) {
        this.setState(
          {
            gallery: [...userGallery, { picture: filepath, pid: timestamp }],
            galleryObj: gallery
          },
          message.success('Galería actualizada')
        )
      }
    } else
      message.error(
        'Ocurrió un error al subir la imágen al servidor, por favor vuelve a intentarlo'
      )
  }

  uploadError = response => console.log(response)

  deletePicture = async pid => {
    const { galleryObj } = this.state
    const newGalleryObj = { ...galleryObj }
    delete newGalleryObj[pid]
    const responseSatus = await this.updateGallery(newGalleryObj)
    if (responseSatus === 202) {
      const gallery = this.galleryObjToArray(newGalleryObj)
      this.setState(
        { gallery, galleryObj: newGalleryObj },
        message.success('Galería actualizada')
      )
    }
  }

  render() {
    const { gallery } = this.state

    return (
      <div className="gallery">
        {gallery.map(({ picture, pid }, i) => (
          <div className="gallery-image" key={i}>
            <img
              src={picture}
              alt=""
              onClick={() => window.open(picture, '_blank')}
            />
            <Popconfirm
              placement="left"
              title="¿Desea eliminar esta imágen de la galería?"
              onConfirm={() => this.deletePicture(pid)}
              cancelText="No"
              okText="Si, eliminar"
            >
              <Button
                className="gallery-image-delete-button"
                shape="circle"
                icon="close"
                size="small"
              />
            </Popconfirm>
          </div>
        ))}
        <div className="gallery-uploader">
          <U
            success={this.uploadSuccess}
            error={this.uploadError}
            folder="banner_gallery"
          />
        </div>
      </div>
    )
  }
}
