import axios from 'axios'
const baseUrl = 'http://localhost:4000'

export const loginAxios = axios.create({
  baseURL: `${baseUrl}/login`
})

export const userAxios = axios.create({
  baseURL: `${baseUrl}/users`
})
