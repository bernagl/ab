import React from 'react'

export default ({ children, ...rest }) => (
  <div id="animation-wrapper" {...rest}>
    {children}
  </div>
)
