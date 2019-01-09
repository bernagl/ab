export default (state = [], { type, payload }) => {
  switch (type) {
    case 'DOCUMENTS':
      return [...payload]
    default:
      return []
  }
}
