import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AnimationWrapper from '../components/Wrappers/AnimationWrapper'

export default auth => ({ path, exact, component, ...rest }) => {
  return auth ? (
    <Redirect to="/" />
  ) : (
    <AnimationWrapper className="container">
      <Route
        path={path}
        exact
        component={component}
        {...rest}
        id="animation-wrapper"
        className="animation-wrapper"
      />
    </AnimationWrapper>
  )
}
