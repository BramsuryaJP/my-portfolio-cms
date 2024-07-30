import { logoutFn } from '@/api/auth'
import axios from 'axios'
import { showToast } from './helper/ReactToastifyHelper'
import { redirect } from 'next/navigation'

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
				window.location.href = '/login?sessionExpired=true'
			} catch (error) {
				return Promise.reject(error)
			}
		}
		return Promise.reject(error)
	}
)

export default api
