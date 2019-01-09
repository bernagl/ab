export default (state = { user: null, loading: true }, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return payload
    case 'LOGOUT':
      return state
    default:
      return state
  }
}
