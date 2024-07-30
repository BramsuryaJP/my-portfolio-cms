'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider, useTheme } from 'next-themes'

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())
	const { systemTheme } = useTheme()

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute='class'>
				{children}
				<ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme={systemTheme}
				/>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
