import api from '@/lib/axios'

export const getProjectsFn = async (page: number = 1, limit: number = 5) => {
	const response = await api.get(
		`/api/Projects/paged?page=${page}&limit=${limit}`
	)
	return response.data
}

export const createProjectFn = async (data: FormData) => {
	const response = await api.post('/api/Projects', data)
	return response.data
}

export const updateProjectsFn = async (data: FormData, id: number | null) => {
	const response = await api.put(`/api/Projects/${id}`, data)
	return response.data
}

export const deleteSingleProjectFn = async (id: number) => {
	const response = await api.delete(`/api/Projects/${id}`)
	return response.data
}

export const deleteMultipleProjectsFn = async (ids: number[]) => {
	const response = await api.post('/api/Projects/delete-multiple', ids)
	return response.data
}
