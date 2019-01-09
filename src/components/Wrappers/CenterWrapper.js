import React from 'react'

export default ({ adminLayout, bordered, className, children }) => (
  <div
    id="auth-wrapper"
    className={`row ${
      adminLayout ? 'vertical-center-admin-layout' : 'full-height'
    } justify-content-center align-items-center mx-2`}
  >
    {bordered ? (
      <div
        className={`${
          className ? className : 'col-12 col-md-5 bordered-box p-4'
        }`}
      >
        {children}
      </div>
    ) : (
      children
    )}
  </div>
)
