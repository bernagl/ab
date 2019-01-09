import React, { Component } from 'react'
import { getDocument, updateDocument } from '../../actions/firebaseActions'
import Notification from '../../components/Notification'
import moment from 'moment'
import Uploader from '../../components/UploaderWithoutForm'
import Gallery from './bannerGallery'

export default class extends Component {

  state = { picture: null }
  
  async componentDidMount() {
    const { picture } = await getDocument('banner')('active')
    picture && this.setState({ picture })
  }

  submit = async ({ filepath }) => {
    const response = await updateDocument('banner')({
      picture: filepath,
      id: 'active',
      modified_at: moment().format()
    })
    this.setState({ picture: filepath })
    Notification(response)
    return response
  }

  error = e => console.log(e)

  render() {
    const { picture } = this.state
    return (
      <div>
        <Gallery />
        {/* <Uploader success={this.submit} error={this.error} folder="banner" />
        {picture && (
          <img src={picture} alt="" style={{ width: 80, height: 80 }} />
        )} */}
      </div>
    )
  }
}
