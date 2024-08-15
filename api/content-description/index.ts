import api from '@/lib/axios'
import {
	CreateContentDescSchema,
	updateContentDescDescriptionSchema,
	updateContentDescNameSchema,
} from './types'

export const getContentsDescFn = async () => {
	const response = await api.get(`/api/ContentDescription`)
	return response.data
}

export const createContentDescFn = async (data: CreateContentDescSchema) => {
	const response = await api.post('/api/ContentDescription', data)
	return response.data
}

export const updateContentDescDescriptionFn = async (
	data: updateContentDescDescriptionSchema,
	id: number | null
) => {
	const response = await api.put(`/api/ContentDescription/${id}`, data)
	return response.data
}

export const updateContentDescNameFn = async (
	data: updateContentDescNameSchema,
	id: number | null
) => {
	const response = await api.put(`/api/ContentDescription/${id}`, data)
	return response.data
}

// export const deleteSingleProjectFn = async (id: number) => {
// 	const response = await api.delete(`/api/Projects/${id}`)
// 	return response.data
// }

export const deleteMultipleProjectsFn = async (ids: number[]) => {
	const response = await api.post('/api/Projects/delete-multiple', ids)
	return response.data
}
