// import React from 'react'
// import Parent from './InputHOC'
// import { Select as AntdSelect } from '../../antd'

// export const { Option } = AntdSelect

// export const Select = ({
//   children,
//   required,
//   validations,
//   validationError,
//   placeholder,
//   ...rest
// }) => {
//   return (
//     <Parent
//       required={required}
//       validations={validations}
//       validationError={validationError}
//       {...rest}
//     >
//       {({ onChange, onBlur, value }) => {
//         return (
//           <AntdSelect
//             defaultValue={rest.defaultValue}
//             id={rest.name}
//             name={rest.name}
//             onChange={value => onChange(value)}
//             onBlur={value => onBlur(value)}
//             placeholder={placeholder}
//             value={value}
//           >
//             {children}
//           </AntdSelect>
//         )
//       }}
//     </Parent>
//   )
// }
