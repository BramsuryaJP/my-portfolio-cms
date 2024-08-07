import api from '@/lib/axios'

export const getProjectsFn = async (page: number = 1, limit: number = 5) => {
	const response = await api.get(
		`/api/Projects/paged?page=${page}&limit=${limit}`
	)
	return response.data
}