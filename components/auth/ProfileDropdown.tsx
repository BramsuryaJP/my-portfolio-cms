import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import ThemeToggler from '../ThemeToggler'
import { BiLogOut } from 'react-icons/bi'
import { useMutation, useQuery } from '@tanstack/react-query'
import { logoutFn, meFn } from '@/api/auth'
import { showToast } from '@/lib/helper/ReactToastifyHelper'
import { useRouter } from 'next/navigation'
import { ProfileTypes } from './types'
import { clearUser } from '@/lib/features/UserSlices'
import { useAppDispatch } from '@/lib/hooks'

export const ProfileDropdown = ({ username }: ProfileTypes) => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const handleLogout = useMutation({
		mutationFn: () => logoutFn(),
		onMutate() {},
		onSuccess: (res) => {
			// Login successful
			showToast('success', res.message)
		},
		onError: () => {
			showToast(
				'error',
				'An unexpected error occurred. Please try again.'
			)
		},
		onSettled: () => {
			router.push('/login')
			dispatch(clearUser())
		},
	})

	return (
		<Menu>
			<MenuButton
				as='button'
				className='w-10 h-10 rounded-full bg-primaryLight/80 dark:bg-primaryDarkBg/80 backdrop-blur-xl border border-primaryLightBorder dark:border-primaryDarkBorder flex items-center justify-center'
			>
				<p className='uppercase text-lg font-semibold text-primaryDark dark:text-white'>
					{username?.charAt(0)}
				</p>
			</MenuButton>
			<MenuItems
				anchor='bottom end'
				className='mt-2 rounded-md dark:bg-primaryDarkBg/50 backdrop-blur-xl border border-primaryLightBorder dark:border-primaryDarkBorder'
			>
				<MenuItem>
					<ThemeToggler />
				</MenuItem>
				<div className='my-1 h-px bg-primaryLightBorder dark:bg-primaryDarkBorder' />
				<MenuItem
					as='button'
					className='flex flex-row items-center gap-2 p-4'
					onClick={() => {
						handleLogout.mutate()
					}}
				>
					<BiLogOut color='#C63C51' size={20} />
					<p className='text-sm font-semibold text-[#C63C51]'>
						Logout
					</p>
				</MenuItem>
			</MenuItems>
		</Menu>
	)
}
