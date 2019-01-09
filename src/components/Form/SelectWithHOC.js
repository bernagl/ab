// import React from 'react'
// import { Select } from '../../antd'
// import HOC from './InputHOC'
// const { Option } = Select

// export default class MyInput extends React.Component {
//   static defaultProps = {
//     defaultValue: null,
//     feedBack: true,
//     type: 'text'
//   }

//   state = { error: false, blurred: false }

//   changeValue = value => {
//     this.props.setValue(value)
//   }

//   onBlur = () => {
//     this.setState({ blurred: true })
//   }

//   render() {
//     // const errorMessage = this.props.getErrorMessage()
//     // const value = this.props.getValue() || ''
//     // const {
//     //   defaultValue,
//     //   feedBack,
//     //   label,
//     //   name,
//     //   placeholder,
//     //   type
//     // } = this.props
//     // const { blurred } = this.state
//     console.log(this.props)
//     return (
//       <HOC name="selectPrueba">
//         <Select
//           key="12"
//           defaultValue={this.props.defaultValue}
//           placeholder={this.props.placeholder}
//           id={this.props.name}
//           name="selectPrueba"
//           type={this.props.type}
//           onChange={this.props.changeValue}
//           onBlur={this.props.onBlur}
//         />
//       </HOC>

//       // return (
//       //   <HOC name="selectPrueba">
//       //     {args => {
//       //       console.log(args)
//       //       return (
//       //         <div>
//       //           <Select
//       //             defaultValue={args.defaultValue}
//       //             placeholder={args.placeholder}
//       //             id={args.name}
//       //             name="selectPrueba"
//       //             type={args.type}
//       //             onChange={args.changeValue}
//       //             onBlur={args.onBlur}
//       //           >
//       //             <Option value="1">Hola</Option>
//       //             <Option value="2">Hola</Option>
//       //             <Option value="3">Hola</Option>
//       //           </Select>
//       //         </div>
//       //       )
//       //     }}
//       //   </HOC>
//     )
//   }
// }
