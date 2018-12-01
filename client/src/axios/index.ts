import axios from 'axios'
import { baseUrl } from '../constants'

export const loginAxios = axios.create({
  baseURL: `${baseUrl}/login`
})

export const userAxios = axios.create({
  baseURL: `${baseUrl}/users`
})
