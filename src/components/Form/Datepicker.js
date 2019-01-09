// import React from 'react'
// import { withFormsy } from 'formsy-react'
// import { Form, DatePicker } from '../../antd'
// import moment from 'moment'
// import locale from 'antd/lib/date-picker/locale/es_ES'
// const { Item } = Form

// class MyInput extends React.Component {
//   static defaultProps = {
//     defaultValue: null,
//     feedBack: true,
//     format: 'LL',
//     datePickerFormat: 'DD-MM-YYYY'
//   }

//   state = { error: false, blurred: false }

//   componentDidMount() {
//     const { defaultValue } = this.props
//     const isValidDate = defaultValue ? moment(defaultValue) : null
//     this.setState(
//       ({ blurred }) => (defaultValue ? { blurred: !blurred } : { blurred }),
//       () => isValidDate && this.props.setValue(isValidDate)
//     )
//   }

//   changeValue = value => {
//     const date = value ? moment(value).format(this.props.format) : undefined
//     this.props.setValue(date)
//   }

//   onBlur = () => {
//     this.setState({ blurred: true })
//   }

//   render() {
//     const errorMessage = this.props.getErrorMessage()
//     const value = this.props.getValue()
//     const val = value ? moment(value) : null
//     const {
//       datePickerFormat,
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
//           <DatePicker
//             value={val}
//             locale={locale}
//             placeholder={placeholder}
//             id={name}
//             format={datePickerFormat}
//             name={name}
//             type={type}
//             onChange={this.changeValue}
//             onBlur={this.onBlur}
//           />
//         </Item>
//       </div>
//     )
//   }
// }

// export default withFormsy(MyInput)
