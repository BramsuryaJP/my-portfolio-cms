import api from '@/lib/axios'
import { LoginSchema } from './types'
import axios from 'axios'

export const loginFn = async (data: LoginSchema) => {
	try {
		const response = await api.post('/api/Auth/login', data)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			// Instead of throwing an error, return an object indicating login failure
			return {
				success: false,
				message: error.response.data.message,
			}
		}
		// For other errors, rethrow
		throw error
	}
}

export const meFn = async () => {
	const response = await api.get('/api/Auth/me')
	return response.data
}

export const logoutFn = async () => {
	const response = await api.post('/api/Auth/logout')
	return response.data
}
