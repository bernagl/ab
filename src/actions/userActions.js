import axios from 'axios'
import $ from 'jquery'
import { API_ENDPOINT } from '../constants'

export const createUser = user =>
  axios
    .post(`${API_ENDPOINT}/createUser`, $.param(user))
    .then(response => response)
    .catch(e => e)

export const updateUser = user =>
  axios
    .post(`${API_ENDPOINT}/updateUser`, $.param(user))
    .then(response => response)
    .catch(e => e)
