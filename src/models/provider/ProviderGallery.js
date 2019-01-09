import React, { Component } from 'react'
import message from 'antd/lib/message'
import U from '../../components/UploaderWithoutForm'
// import { FILE_PATH } from '../../constants'
import { updateDocument } from '../../actions/firebaseActions'
import Button from 'antd/lib/button'
import Popconfirm from 'antd/lib/popconfirm'

export default class extends Component {
  state = { gallery: [] }
  componentDidMount() {
    this.setPropsToState()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.provider === this.props.provider) return
    this.setPropsToState()
  }

  setPropsToState() {
    const {
      provider,
      provider: { gallery: userGallery }
    } = this.props
    const gallery = this.galleryObjToArray(userGallery)
    this.setState({ gallery, galleryObj: userGallery, provider })
  }

  galleryObjToArray = obj =>
    typeof obj !== 'undefined'
      ? Object.keys(obj).map(pid => ({ pid, picture: obj[pid] }))
      : []

  updateGallery = async (id, gallery) => {
    const { status: responseSatus } = await updateDocument('provider')({
      id,
      gallery
    })
    if (responseSatus === 202) {
      return 202
    } else message.error('Ocurrió un error, por favor vuelve a intentarlo')
  }

  uploadSuccess = async ({ data: { status, name: imageName }, filepath }) => {
    if (status === 202) {
      const { id } = this.state.provider
      const { gallery: userGallery, galleryObj } = this.state
      const timestamp = +new Date()
      // const name = `${FILE_PATH}/providerGallery/${imageName}`
      let gallery =
        typeof galleryObj === 'undefined'
          ? { [timestamp]: filepath }
          : { ...galleryObj, [timestamp]: filepath }

      const responseSatus = await this.updateGallery(id, gallery)
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
    const { id } = this.state.provider
    const { galleryObj } = this.state
    const newGalleryObj = { ...galleryObj }
    delete newGalleryObj[pid]
    const responseSatus = await this.updateGallery(id, newGalleryObj)
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
          <U success={this.uploadSuccess} error={this.uploadError} folder="provider_gallery"/>
        </div>
      </div>
      //   <div className="row">
      //     <div className="img-container col-4 col-md-2 col-lg-2">
      //       <div className="img">imagen</div>
      //       <div className="actions">actions</div>
      //     </div>
      //     <div className="img-container col-4 col-md-2 col-lg-2">
      //       <div className="img">imagen</div>
      //       <div className="actions">actions</div>
      //     </div>
      //     <div className="img-container col-4 col-md-2 col-lg-2">
      //       <div className="img">imagen</div>
      //       <div className="actions">actions</div>
      //     </div>
      //     <div className="img-container col-4 col-md-2 col-lg-2">
      //       <div className="img">imagen</div>
      //       <div className="actions">actions</div>
      //     </div>
      //     <div className="img-container col-4 col-md-2 col-lg-2">
      //       <div className="img">imagen</div>
      //       <div className="actions">actions</div>
      //     </div>
      //     <div className="img-container col-4 col-md-2 col-lg-2">
      //       <div className="img">imagen</div>
      //       <div className="actions">actions</div>
      //     </div>
      //     <div className="add-button col-4 col-md-2 col-lg-2">Add</div>
      //   </div>
    )
  }
}
// export default class PicturesWall extends Component {
//   state = {
//     previewVisible: false,
//     previewImage: '',
//     fileList: [
//       {
//         uid: '-1',
//         name: 'xxx.png,
//         status: 'done',
//         url:
//           'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png
//       }
//     ]
//   }

//   handleCancel = () => this.setState({ previewVisible: false })

//   handlePreview = file => {
//     this.setState({
//       previewImage: file.url || file.thumbUrl,
//       previewVisible: true
//     })
//   }

//   handleChange = ({ fileList }) => this.setState({ fileList })

//   render() {
//     const { previewVisible, previewImage, fileList } = this.state
//     const uploadButton = (
//       <div>
//         <Icon type="plus" />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     )
//     return (
//       <div className="clearfix">
//         <Upload
//           action="http://localhost:8888/skipum/api/uploadImage.php"
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           {fileList.length >= 3 ? null : uploadButton}
//         </Upload>
//         <Modal
//           visible={previewVisible}
//           footer={null}
//           onCancel={this.handleCancel}
//         >
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </div>
//     )
//   }
// }
