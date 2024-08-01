import api from '@/lib/axios'
import { CreateSkillSchema } from './types'

export const getSkillsFn = async (page: number = 1, limit: number = 5) => {
	const response = await api.get(
		`/api/skills/paged?page=${page}&limit=${limit}`
	)
	return response.data
}

export const createSkillFn = async (data: CreateSkillSchema) => {
	const response = await api.post('/api/Skills', data)
	return response.data
}

export const updateSkillFn = async (
	data: CreateSkillSchema,
	id: number | null
) => {
	const response = await api.put(`/api/Skills/${id}`, data)
	return response.data
}

export const deleteSingleSkillFn = async (id: number) => {
	const response = await api.delete(`/api/Skills/${id}`)
	return response.data
}

export const deleteMultipleSkillsFn = async (ids: number[]) => {
	const response = await api.post('/api/Skills/delete-multiple', ids)
	return response.data
}
