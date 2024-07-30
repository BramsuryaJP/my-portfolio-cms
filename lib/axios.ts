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

		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest.url.includes('/login')
		) {
			// Token has expired or is invalid
			await logoutFn()

			// Redirect to login page
			window.location.href = '/login'
			return Promise.reject(error)
		}
		return Promise.reject(error)
	}
)

export default api
