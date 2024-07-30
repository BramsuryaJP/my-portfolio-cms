'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useRef } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { makeStore, AppStore, RootState, AppDispatch } from '../lib/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from 'next-themes'
import { fetchUser } from '@/lib/features/UserSlices'
import { usePathname, useRouter } from 'next/navigation'
import { showToast } from '@/lib/helper/ReactToastifyHelper'

function UserInitializer() {
	const dispatch = useDispatch<AppDispatch>()
	const userStatus = useSelector((state: RootState) => state.user.status)
	const user = useSelector((state: RootState) => state.user.data)
	const router = useRouter()
	const pathname = usePathname()

	const checkedOnLoginPage = useRef(false)

	useEffect(() => {
		const checkUserStatus = async () => {
			if (userStatus === 'idle' && pathname !== '/login') {
				try {
					await dispatch(fetchUser()).unwrap()
				} catch (error) {
					if (error === 'SESSION_EXPIRED') {
						router.push('/login')
						const customId = 'session_expired_toast'
						showToast(
							'error',
							'Invalid session. Please login again.',
							{
								toastId: customId,
							}
						)
					}
				}
			} else if (
				pathname === '/login' &&
				!user &&
				!checkedOnLoginPage.current
			) {
				checkedOnLoginPage.current = true
				try {
					await dispatch(fetchUser()).unwrap()
				} catch (error) {
					// User is not authenticated, which is expected on the login page
					console.log('User not authenticated on login page')
				}
			}
		}

		checkUserStatus()
	}, [dispatch, userStatus, user, pathname])

	useEffect(() => {
		if (userStatus === 'succeeded' && user && pathname === '/login') {
			router.push('/') // or specify a default route like router.push('/dashboard')
		}
	}, [userStatus, user, pathname])

	// Reset the flag when navigating away from the login page
	useEffect(() => {
		if (pathname !== '/login') {
			checkedOnLoginPage.current = false
		}
	}, [pathname])

	return null
}

export default function Providers({ children }: { children: ReactNode }) {
	const MINUTE = 1000 * 60

	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						gcTime: 10 * MINUTE,
						staleTime: 5 * MINUTE,
					},
				},
			})
	)

	const storeRef = useRef<AppStore>()
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore()
	}

	return (
		<Provider store={storeRef.current}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider attribute='class'>
					<UserInitializer />
					{children}
					<ToastContainer />
				</ThemeProvider>
			</QueryClientProvider>
		</Provider>
	)
}
