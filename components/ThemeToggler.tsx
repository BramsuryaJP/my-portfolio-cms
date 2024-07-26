'use client'

import { Switch } from '@headlessui/react'
import { useTheme } from 'next-themes'
import React, { Fragment, useEffect, useState } from 'react'
import {
	BsFillMoonStarsFill,
	BsFillSunFill,
	BsMoon,
	BsMoonStars,
	BsSun,
} from 'react-icons/bs'
import { FaMoon, FaRegMoon } from 'react-icons/fa6'

export default function ThemeToggler() {
	const { systemTheme, theme, setTheme } = useTheme()

	const [enabled, setEnabled] = useState(false)

	useEffect(() => {
		if (theme === 'dark') {
			setEnabled(true)
		} else {
			setEnabled(false)
		}
	}, [theme])

	const handleThemeChange = () => {
		theme === 'dark' ? setTheme('light') : setTheme('dark')
		setEnabled(!enabled)
	}

	return (
		<div className='text-[#222831] dark:text-white p-4'>
			<div className='flex flex-row items-center gap-3'>
				{enabled ? (
					<BsSun size={18} />
				) : (
					<BsFillSunFill size={18} color='orange' />
				)}
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
				{enabled ? (
					<BsFillMoonStarsFill size={16} color='yellow' />
				) : (
					<BsMoonStars size={16} />
				)}
			</div>
		</div>
	)
}
