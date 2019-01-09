// import React from 'react'
// import { withFormsy } from 'formsy-react'
// import { Form, Radio } from '../../antd'
// const { Item } = Form
// const { Group } = Radio

// class MyInput extends React.Component {
//   static defaultProps = {
//     feedBack: true,
//     type: 'text'
//   }

//   state = { error: false, blurred: false }

//   changeValue = event => {
//     this.props.setValue(event.target.value)
//   }

//   onBlur = () => {
//     this.setState({ blurred: true })
//   }

//   render() {
//     const errorMessage = this.props.getErrorMessage()
//     const value = this.props.getValue() || ''
//     const { feedBack, label, name, placeholder, required, type } = this.props
//     const { blurred } = this.state
//     return (
//       <div>
//         <Item
//           layout="vertical"
//           label={`${required ? '*' : null} ${label}`}
//           validateStatus={errorMessage ? 'error' : value ? 'success' : null}
//           help={blurred ? (errorMessage ? errorMessage : null) : null}
//           hasFeedback={feedBack && blurred}
//         >
//           <Group
//             placeholder={placeholder}
//             id={name}
//             name={name}
//             type={type}
//             onChange={this.changeValue}
//             onBlur={this.onBlur}
//           >
//             <Radio value="1">Hola</Radio>
//             <Radio value="2">Hola</Radio>
//             <Radio value="3">Hola</Radio>
//           </Group>
//         </Item>
//       </div>
//     )
//   }
// }

// export default withFormsy(MyInput)
