import axios from 'axios'
import { baseUrl } from '../constants'
import { getJwt } from '../libs/jwt'

const loginAxios = axios.create({
  baseURL: `${baseUrl}/login`
})

const userAxios = axios.create({
  baseURL: `${baseUrl}/users`
})

const projectAxios = axios.create({
  baseURL: `${baseUrl}/projects`
})

export const loginOrSignupAndGetJwt = async (type, userData) => {
  if (type === 'login') {
    return loginAxios.post('/', userData).then(({ data }) => data.jwt)
  } else if (type === 'signup') {
    return userAxios.post('/', userData).then(({ data }) => data.jwt)
  }
  return null
}

export const getEntitiesRequest = async userId =>
  userAxios
    .get(`/${userId}`, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)

export const getSingleUserRequest = async projectId =>
  projectAxios
    .get(`/${projectId}`, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)

export const API_createNewProject = data =>
  projectAxios
    .post('/', data, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)

export const API_updateStatus = (id, data) =>
  projectAxios
    .post(`/status/${id}`, data, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)
