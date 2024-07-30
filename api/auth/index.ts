import api from '@/lib/axios'
import { LoginSchema } from './types'

export const loginFn = async (data: LoginSchema) => {
	const response = await api.post('/api/Auth/login', data)
	return response.data
}

export const meFn = async () => {
	const response = await api.get('/api/Auth/me')
	return response.data
}

export const logoutFn = async () => {
	const response = await api.post('/api/Auth/logout')
	return response.data
}
