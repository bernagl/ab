const isProduction = true

// export { default as Logo } from '../assets/images/logo.png'

export const API_ENDPOINT = 'https://us-central1-encuesta-f13f6.cloudfunctions.net'

export const FILE_PATH = isProduction
  ? 'https://skipum.mobkii.net'
  : 'http://localhost:8888/skipum'
