import { axiosAuthenticatedInstance } from '../boot/axios'

const API = {
  get: (path, params) => axiosAuthenticatedInstance.get(path, params).then(({ data }) => data),
  post: (path, params) => axiosAuthenticatedInstance.post(path, params).then(({ data }) => data),
  put: (path, params) => axiosAuthenticatedInstance.put(path, params).then(({ data }) => data),
  delete: (path) => axiosAuthenticatedInstance.delete(path)
}

export default API
