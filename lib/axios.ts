import { logoutFn } from '@/api/auth'
import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:5092',
	withCredentials: true, // This ensures cookies are sent with requests
})

// Response interceptor
api.interceptors.response.use(
	(response) => {
		return response
	},
	async (error) => {
		const originalRequest = error.config

		const isLoginRequest = originalRequest.url.endsWith('/login')

		// In your interceptor:
		if (
			error.response &&
			error.response.status === 401 &&
			!isLoginRequest
		) {
			try {
				await logoutFn()
				// Instead of redirecting, we'll throw a special error
				throw new Error('SESSION_EXPIRED')
			} catch (error) {
				return Promise.reject(error)
			}
		}
		return Promise.reject(error)
	}
)

export default api
