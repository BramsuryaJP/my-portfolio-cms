'use client'

import { useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/hooks'

export default function Greetings() {
	const username = useAppSelector((state) => state.user.data?.username)
	const [greeting, setGreeting] = useState<String>('Welcome Back')

	useEffect(() => {
		const updateGreeting = () => {
			const hour = new Date().getHours()
			if (hour >= 5 && hour < 12) {
				setGreeting('Good Morning')
			} else if (hour >= 12 && hour < 18) {
				setGreeting('Good Afternoon')
			} else if (hour >= 18 && hour < 22) {
				setGreeting('Good Evening')
			} else {
				setGreeting('Good Night')
			}
		}

		updateGreeting()
		const intervalId = setInterval(updateGreeting, 60000) // Update every minute

		return () => clearInterval(intervalId)
	}, [])

	return (
		<p className='text-primaryDark dark:text-white text-2xl font-semibold'>
			{greeting}, {username}
		</p>
	)
}