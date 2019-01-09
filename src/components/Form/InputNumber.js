// import React from 'react'
// import Parent from './InputHOC'
// import { InputNumber } from '../../antd'
// import PropTypes from 'prop-types'

// export const Field = ({ required, validationError, ...rest }) => {
//   return (
//     <Parent
//       required={required}
//       validations={{ isNumeric: true }}
//       validationError={validationError}
//       {...rest}
//     >
//       {({ onChange, onBlur, value }) => {
//         return (
//           <InputNumber
//             name={rest.name}
//             value={value}
//             min={rest.min}
//             max={rest.max}
//             step={rest.step ? rest.step : 1}
//             formatter={rest.formatter}
//             defaultValue={rest.defaultValue}
//             id={rest.name}
//             onChange={value => onChange(value)}
//             onBlur={({ target: { value } }) => {
//               onChange(value ? value : rest.min)
//               onBlur()
//             }}
//             // required
//           />
//         )
//       }}
//     </Parent>
//   )
// }

// export default Field

// Field.defaultProps = {
//   label: '',
//   placeholder: '',
//   min: 1,
//   max: 100,
//   step: 1,
//   value: 1
// }

// Field.propTypes = {
//   max: PropTypes.number,
//   min: PropTypes.number,
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
//   step: PropTypes.number
// }
