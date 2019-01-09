import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CenterWrapper from '../components/Wrappers/CenterWrapper'
import AnimationWrapper from '../components/Wrappers/AnimationWrapper'

class E404 extends Component {
  render() {
    return (
      <AnimationWrapper>
        <CenterWrapper adminLayout>
          <div className="row center-text">
            <div className="col-12">
              <h2>Error 404: Ruta no encontrada</h2>
            </div>
            <div className="col-12">
              <Link to="/">Volver</Link>
            </div>
          </div>
        </CenterWrapper>
      </AnimationWrapper>
    )
  }
}

export default E404
