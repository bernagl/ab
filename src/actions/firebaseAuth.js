import { auth, db } from './firebase-config'

export const login = async ({ email, password }) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password)
    return db
      .ref(`admin/${user.uid}`)
      .once('value')
      .then(result => {
        const usuario = result.val()
        return usuario
          ? returnObject(202, 'Bienvenido')
          : returnObject(404, 'Error al iniciar sesión')
      })
  } catch ({ code }) {
    let message = ''
    if (code === 'auth/user-not-found')
      message = 'El correo no existe en nuestra base de datos'
    else message = 'Usuario y/o contraseña incorrectos'
    return returnObject(404, message)
  }
}

export const register = async ({ email, password, name, phone }) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    return db
      .ref(`admin/${user.uid}`)
      .set({ email, name, phone, admin: true })
      .then(() => returnObject(202, 'Gracias por registrarte'))
  } catch ({ code }) {
    let message = ''
    if (code === 'auth/account-exists-with-different-credential') {
      message =
        'El correo ya se encuentra registrado por otro método de inicio de sesión'
    } else {
      message =
        'El correo ya se encuentra registrado por otro método de inicio de sesión'
    }
    return returnObject(404, message)
  }
}

export const authState = async context => {
  auth.onAuthStateChanged(user => {
    if (user) {
      return db
        .ref(`admin/${user.uid}`)
        .once('value')
        .then(result => {
          const usuario = result.val()
          if (usuario) {
            context.setState({
              auth: { correo: user.email, uid: user.uid },
              loading: false
            })
          } else {
            logout()
            return 404
          }
        })
    } else {
      context.setState({ auth: null, loading: false })
    }
  })
}

export const logout = () => {
  auth
    .signOut()
    .then(() => console.log('logout'))
    .catch(e => console.log(e))
}

export const recover = ({ email }) => {
  return auth
    .sendPasswordResetEmail(email)
    .then(r =>
      returnObject(202, 'Se han enviado instrucciones a tu correo electrónico')
    )
    .catch(({ code }) => {
      let message = ''
      switch (code) {
        case 'auth/invalid-email':
          message = 'El correo no es válido'
          break
        case 'auth/user-not-found':
          message = 'El correo no esta asociado a ninguna cuenta'
          break
        default:
          message = 'Ocurrió un error, por favor vuelve a intentarlo'
          break
      }
      return returnObject(404, message)
    })
}

function returnObject(status, message, descripcion) {
  return { status, message, descripcion }
}
