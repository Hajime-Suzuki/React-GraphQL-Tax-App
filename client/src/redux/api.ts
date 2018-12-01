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

export const APIGetEntities = async userId => {
  // let url = `/${userId}`
  // if (type === FetchEntityType.dashBoard) {
  //   url += '/dashboard'
  // }

  return userAxios
    .get(`/${userId}`, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)
}

export const getSingleUserRequest = async projectId =>
  projectAxios
    .get(`/${projectId}`, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)

export const APICreateNewProject = body =>
  projectAxios
    .post('/', body, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)

export const APIUpdateStatus = (id, body) =>
  projectAxios
    .put(`/${id}/status`, body, { headers: { Authorization: getJwt() } })
    .then(({ data }) => data)

export const APIUpdateProject = (id, body) =>
  projectAxios
    .put(`/${id}`, body, {
      headers: { Authorization: getJwt() }
    })
    .then(({ data }) => data)
