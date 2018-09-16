import axios from 'axios'
import { baseUrl } from '../constants'

const loginAxios = axios.create({
  baseURL: `${baseUrl}/login`
})

const userAxios = axios.create({
  baseURL: `${baseUrl}/users`
})

export const loginAndGetJwt = async userData =>
  loginAxios.post('/', userData).then(({ data }) => data.jwt)
