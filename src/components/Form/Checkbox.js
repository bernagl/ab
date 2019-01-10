import React from 'react'
import Parent from './Wrapper'
import Checkbox from 'antd/lib/checkbox'
import PropTypes from 'prop-types'

export const Field = props => {
  return (
    <Parent {...props}>
      {({ onChange, onBlur, value }) => {
        return (
          <Checkbox
            name={props.name}
            checked={value}
            id={props.name}
            onChange={({ target: { value } }) => onChange(value)}
          />
        )
      }}
    </Parent>
  )
}

export default Field

Field.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text'
}

Field.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string
}
