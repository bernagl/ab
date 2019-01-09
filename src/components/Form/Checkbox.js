import React from 'react'
import { withFormsy } from 'formsy-react'
import { Form, Checkbox } from '../../antd'
const { Item } = Form

class MyInput extends React.Component {
  static defaultProps = {
    feedBack: true
  }

  state = { error: false, blurred: false, checked: false }

  componentDidUpdate(lastProps) {
    if (lastProps.value === this.props.value) return
    this.setState({ checked: this.props.value }, () =>
      this.props.setValue(this.props.value)
    )
  }

  changeValue = ({ target: { checked } }) => {
    this.setState({ checked }, () => this.props.setValue(checked))
  }

  onBlur = () => {
    this.setState({ blurred: true })
  }

  render() {
    const { label, name, placeholder } = this.props
    const { checked } = this.state
    return (
      <Item label={label}>
        <Checkbox
          placeholder={placeholder}
          id={name}
          name={name}
          onChange={this.changeValue}
          checked={checked}
        >
          {checked ? 'Sí' : 'No'}
        </Checkbox>
      </Item>
    )
  }
}

export default withFormsy(MyInput)
