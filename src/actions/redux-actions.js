import { getDocumentsByModel as gdbm } from './firebaseActions'
import { auth, db } from './firebase-config'

export const getDocumentsByModel = model => async dispatch => {
  console.log(model)
  const payload = await gdbm(model)
  dispatch({ type: 'DOCUMENTS', payload })
}

export const resetDocuments = () => dispatch =>
  dispatch({ type: 'DOCUMENTS', payload: [] })

export const authState = () => async dispatch => {
  const currentUser = await auth.currentUser
  console.log(currentUser)
  auth.onAuthStateChanged(user => {
    if (user) {
      return db
        .ref(`admin/${user.uid}`)
        .once('value')
        .then(result => {
          const usuario = result.val()
          if (usuario) {
            dispatch({
              type: 'LOGIN',
              payload: {
                user: { correo: user.email, uid: user.uid },
                loading: false
              }
            })
          } else {
            return 404
          }
        })
    } else {
      dispatch({ type: 'LOGIN', payload: { auth: null, loading: false } })
    }
  })
}
