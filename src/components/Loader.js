import React from 'react'

export default ({ auth, children, loading }) => {
  return (
    <div
      className={`${loading ? 'loading-indicator' : ''} ${
        auth ? 'container' : 'container'
      }`}
    >
      {children}
    </div>
  )
}
