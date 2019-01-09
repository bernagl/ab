import React, { Component } from 'react'
import Router from './router'
import './App.css'
import Admin from './views/Admin'
// import { authState } from './actions/firebaseAuth'
import { authState } from './actions/redux-actions'
// import Loading from './components/Loader'
import LoadingWrapper from './components/Wrappers/LoadingWrapper'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class App extends Component {
  componentDidMount() {
    this.props.authState()
  }

  render() {
    const { user, loading } = this.props.auth
    return (
      <LoadingWrapper loading={loading}>
        {user ? (
          <Admin>
            <Router auth={user} />
          </Admin>
        ) : (
          <Router auth={user} />
        )}
      </LoadingWrapper>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default withRouter(
  connect(
    mapStateToProps,
    { authState }
  )(App)
)
