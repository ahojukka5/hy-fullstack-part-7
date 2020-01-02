import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = 'Bearer ' + newToken
}

const getToken = () => token

const getConfig = () => ({ headers: { Authorization: getToken() } })

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async data => {
  const response = await axios.post(baseUrl, data, getConfig())
  return response.data
}

const update = async (blog, data) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, data, getConfig())
  return response.data
}

const delete_ = async blog => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, getConfig())
  return response.data
}

const createComment = async (blog, comment) => {
  const data = { content: comment }
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, data)
  return response.data
}

export default {
  getAll,
  create,
  update,
  delete: delete_,
  setToken,
  createComment
}
