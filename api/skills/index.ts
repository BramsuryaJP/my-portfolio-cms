import api from '@/lib/axios'

export const getSkillsFn = async () => {
	const response = await api.get('/api/Skills')
	return response.data
}
