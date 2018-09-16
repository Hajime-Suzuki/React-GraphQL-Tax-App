import axios from 'axios'
import { baseUrl } from '../constants'

const loginAxios = axios.create({
  baseURL: `${baseUrl}/login`
})

const userAxios = axios.create({
  baseURL: `${baseUrl}/users`
})

export const loginOrSignupAndGetJwt = async (type, userData) => {
  if (type === 'login') {
    return loginAxios.post('/', userData).then(({ data }) => data.jwt)
  } else if (type === 'signup') {
    return userAxios.post('/', userData).then(({ data }) => data.jwt)
  }
  return null
}
