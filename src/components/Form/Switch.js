// import React from 'react'
// import { withFormsy } from 'formsy-react'
// import { Form, Switch } from '../../antd'
// const { Item } = Form

// class MyInput extends React.Component {
//   static defaultProps = {
//     checkedText: '',
//     uncheckedText: '',
//     feedBack: true
//   }

//   state = { error: false, blurred: false, checked: undefined }

//   changeValue = () => {
//     this.setState(({ checked }) => {
//       let check = typeof checked === 'undefined' ? true : undefined
//       this.props.setValue(check)
//       return { checked: check }
//     })
//   }

//   onBlur = () => {
//     this.setState({ blurred: true })
//   }

//   render() {
//     const { checkedText, uncheckedText, label, name, placeholder, required } = this.props
//     return (
//       <div>
//         <Item
//           layout="vertical"
//           label={`${required ? '*' : ''} ${label}`}
//           style={{ paddingBottom: 0 }}
//         >
//           <Switch
//             placeholder={placeholder}
//             id={name}
//             name={name}
//             onChange={this.changeValue}
//             checkedChildren={checkedText}
//             unCheckedChildren={uncheckedText}
//           />
//         </Item>
//       </div>
//     )
//   }
// }

// export default withFormsy(MyInput)
