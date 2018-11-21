import axios from 'axios'
import { getJwt } from '../libs/jwt'
const baseUrl = 'http://localhost:4000'

const loginAxios = axios.create({
  baseURL: `${baseUrl}/login`
})

const userAxios = axios.create({
  baseURL: `${baseUrl}/users`
})

const projectAxios = axios.create({
  baseURL: `${baseUrl}/projects`
})

export const loginOrSignupAndGetJwt = async (
  type: 'login' | 'signup',
  userData: any
) => {
  if (type === 'login') {
    return loginAxios.post('/', userData).then(({ data }) => data.jwt)
  } else if (type === 'signup') {
    return userAxios.post('/', userData).then(({ data }) => data.jwt)
  }
  return null
}

// TODO: check type
export const API_getEntities = async (userId: string) => {
  // let url = `/${userId}`
  // if (type === FetchEntityType.dashBoard) {
  //   url += '/dashboard'
  // }

  return userAxios
    .get(`/${userId}`, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)
}

// TODO: check type
export const getSingleUserRequest = async (projectId: string) =>
  projectAxios
    .get(`/${projectId}`, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)

// TODO: check type
export const API_createNewProject = (data: any) =>
  projectAxios
    .post('/', data, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)

export const API_updateStatus = (id: string, data: any) =>
  projectAxios
    .put(`/${id}/status`, data, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)

export const API_updateProject = (id: string, data: any) =>
  projectAxios
    .put(`/${id}`, data, {
      headers: { Authorization: getJwt() }
    })
    .then(({ data }) => data)
