'use client'

import { ReactNode, useState } from 'react'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())

	const storeRef = useRef<AppStore>()
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore()
	}

	return (
		<Provider store={storeRef.current}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider attribute='class'>
					{children}
					<ToastContainer />
				</ThemeProvider>
			</QueryClientProvider>
		</Provider>
	)
}
