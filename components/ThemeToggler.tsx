'use client'

import { useTheme } from '@/context/ThemeContextProvider'
import React from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

export default function ThemeToggler() {
	const { theme, toggleTheme } = useTheme()

	return (
		<button className='text-[#222831] dark:text-white' onClick={toggleTheme}>
			{theme === 'light' ? <BsMoon size={16} /> : <BsSun size={16} />}
		</button>
	)
}
