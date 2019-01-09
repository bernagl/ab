import { message } from '../antd'

message.config({
  duration: 2,
  maxCount: 4
})

export default ({ status, message: text }) => {
  if (status === 202) {
    message.success(text)
  } else if (status === 204) {
    message.info(text)
  } else {
    message.error(text)
  }
}

// export default ({ status, message, description }) => {
//   if (status === 202) {
//     notification.success({ message, description })
//   } else if (status === 204) {
//     notification.info({ message, description })
//   } else {
//     notification.error({ message, description })
//   }
// }
