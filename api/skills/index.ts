import api from '@/lib/axios'
import { CreateSkillSchema } from './types'

export const getSkillsFn = async () => {
	const response = await api.get('/api/Skills')
	return response.data
}

export const createSkillFn = async (data: CreateSkillSchema) => {
	const response = await api.post('/api/Skills', data)
	return response.data
}
