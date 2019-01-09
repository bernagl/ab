// import React from 'react'
// import { withFormsy } from 'formsy-react'
// import { Form } from '../../antd'
// const { Item } = Form

// class MyInput extends React.Component {
//   static defaultProps = {
//     defaultValue: null,
//     defaultValueNumber: 1,
//     feedBack: true,
//     label: '',
//     max: 100,
//     min: 0,
//     type: 'text',
//     validationError: 'El campo no es válido'
//   }

//   state = { error: false, blurred: false, value: null }

//   changeValue = value => {
//     this.setState({ value }, () => this.props.setValue(value))
//   }

//   onBlur = () => {
//     this.setState({ blurred: true })
//   }

//   componentDidMount() {
//     const { defaultValue, setValue } = this.props
//     this.setState(
//       ({ blurred }) =>
//         defaultValue ? { value: defaultValue, blurred: !blurred } : { blurred },
//       () => defaultValue && setValue(defaultValue)
//     )
//   }

//   setRenderProps = () => ({
//     onChange: this.changeValue,
//     onBlur: this.onBlur,
//     value: this.state.value
//   })

//   render() {
//     const {
//       children,
//       feedBack,
//       getErrorMessage,
//       isValid: validate,
//       label
//     } = this.props
//     const { blurred } = this.state
//     const errorMessage = getErrorMessage()
//     const isValid = validate()
//     return (
//       <Item
//         layout="vertical"
//         label={label}
//         validateStatus={isValid ? 'success' : !isValid ? 'error' : null}
//         help={blurred ? (!isValid ? errorMessage : null) : null}
//         hasFeedback={feedBack && blurred}
//       >
//         {children({ ...this.setRenderProps() })}
//       </Item>
//     )
//   }
// }

// export default withFormsy(MyInput)
