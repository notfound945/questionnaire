import axios from 'axios'
import qs from 'qs'
import { Notify } from 'quasar'

axios.interceptors.request.use(config => {
  return config
}, err => {
  Notify.create({
    position: 'top',
    color: 'red-6',
    textColor: 'white',
    message: 'Request Timeout'
  })
  return Promise.resolve(err)
})

axios.interceptors.response.use(res => {
  return res
}, err => {
  console.log(err.response)
  Notify.create({
    position: 'top',
    color: 'red-6',
    textColor: 'white',
    icon: 'cancel',
    message: 'Error : ' + err.response.status + ' ' + err.response.statusText
  })
  return Promise.resolve(err)
})

const base = ''
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: qs.stringify(params)
  })
}

export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getRequest = (url, responseType = 'json') => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    responseType: `${responseType}`
  })
}

export default { getRequest, postRequest }
