'use client'

import { useTheme } from '@/context/ThemeContextProvider'
import { Switch } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

export default function ThemeToggler() {
	const { theme, toggleTheme } = useTheme()

	const [enabled, setEnabled] = useState(false)

	useEffect(() => {
		if (theme === 'dark') {
			setEnabled(true)
		} else {
			setEnabled(false)
		}
	}, [theme])

	const handleThemeChange = () => {
		toggleTheme()
		setEnabled(!enabled)
	}

	return (
		<div className='text-[#222831] dark:text-white'>
			<div className='flex flex-row items-center gap-3'>
				<BsSun size={16} />
				<Switch
					checked={enabled}
					onChange={handleThemeChange}
					as={Fragment}
				>
					{({ checked, disabled }) => (
						<button
							className={`
								group inline-flex h-6 w-11 items-center rounded-full
								${checked ? 'bg-primaryDark' : 'bg-primaryLight'}
								${disabled && 'cursor-not-allowed opacity-50'} 
							`}
						>
							<span className='sr-only'>Toggle Theme</span>
							<span
								className={`size-4 rounded-full transition ${
									checked
										? 'translate-x-6 bg-primaryLight'
										: 'translate-x-1 bg-primaryDark/80'
								}`}
							/>
						</button>
					)}
				</Switch>
				<BsMoon size={14} />
			</div>
			{/* {theme === 'light' ? <BsMoon size={16} /> : <BsSun size={16} />} */}
		</div>
	)
}
