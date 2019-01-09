import { Component } from 'react'
import { connect } from 'react-redux'
import { getDocumentsByModel, resetDocuments } from '../actions/redux-actions'

class Model extends Component {
  componentDidMount() {
    const { model } = this.props
    this.props.getDocumentsByModel(model)
  }

  componentWillUnmount() {
    this.props.resetDocuments()
  }

  render() {
    return this.props.children(this.props.documents)
  }
}

const mapPropsToState = ({ documents }) => ({ documents })

export default connect(
  mapPropsToState,
  { getDocumentsByModel, resetDocuments }
)(Model)
