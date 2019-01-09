// import React from 'react'
// import { withFormsy } from 'formsy-react'
// import { Form, Select } from '../../antd'
// const { Item } = Form
// const { Option } = Select

// class MyInput extends React.Component {
//   static defaultProps = {
//     defaultValue: null,
//     feedBack: true,
//     type: 'text'
//   }

//   state = { error: false, blurred: false }

//   componentDidMount() {
//     const { defaultValue, setValue } = this.props
//     this.setState(
//       ({ blurred }) => (defaultValue ? { blurred: !blurred } : { blurred }),
//       () => defaultValue && setValue(defaultValue)
//     )
//   }

//   changeValue = value => {
//     this.props.setValue(value)
//   }

//   onBlur = () => {
//     this.setState({ blurred: true })
//   }

//   render() {
//     const errorMessage = this.props.getErrorMessage()
//     const value = this.props.getValue() || ''
//     const {
//       defaultValue,
//       feedBack,
//       label,
//       name,
//       placeholder,
//       required,
//       type
//     } = this.props
//     const { blurred } = this.state
//     return (
//       <div>
//         <Item
//           layout="vertical"
//           label={`${required ? '*' : ''} ${label}`}
//           validateStatus={errorMessage ? 'error' : value ? 'success' : null}
//           help={blurred ? (errorMessage ? errorMessage : null) : null}
//           hasFeedback={feedBack && blurred}
//         >
//           <Select
//             defaultValue={defaultValue}
//             placeholder={placeholder}
//             id={name}
//             name={name}
//             type={type}
//             onChange={this.changeValue}
//             onBlur={this.onBlur}
//           >
//             <Option value="1">Hola 1</Option>
//             <Option value="2">Hola 2</Option>
//             <Option value="3">Hola 3</Option>
//           </Select>
//         </Item>
//       </div>
//     )
//   }
// }

// export default withFormsy(MyInput)
