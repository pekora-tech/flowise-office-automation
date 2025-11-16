import client from './client'

const getAllRepositories = (params) => client.get('/repositories', { params })

const getRepositoryById = (id) => client.get(`/repositories/${id}`)

const createRepository = (body) => client.post(`/repositories`, body)

const updateRepository = (id, body) => client.put(`/repositories/${id}`, body)

const deleteRepository = (id) => client.delete(`/repositories/${id}`)

const syncRepository = (id) => client.post(`/repositories/${id}/sync`)

export default {
    getAllRepositories,
    getRepositoryById,
    createRepository,
    updateRepository,
    deleteRepository,
    syncRepository
}
