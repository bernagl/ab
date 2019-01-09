import React from 'react'
import { Link } from 'react-router-dom'
import CenterWrapper from './CenterWrapper'
import logo from '../../assets/images/SKIPUM.png'

export default ({ children, type, recover }) => {
  return (
    <CenterWrapper bordered className="col-12 col-md-4 col-lg-3 bordered-box p-4">
      <div id="auth-wrapper" className="col-12 center-text">
        <img src={logo} alt="" className="logo" />
      </div>
      {children}
      {type === 'login' ? (
        <div>
          <Link to="/register">Registrarme</Link>
          <Link to="/recover">¿Olvidaste tu contraseña?</Link>
        </div>
      ) : type === 'register' || type === 'recover' ? (
        <div>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      ) : null}
      {recover && (
        <div>
          <Link to="/recover">¿Olvidaste tu contraseña?</Link>
        </div>
      )}
    </CenterWrapper>
  )
}
