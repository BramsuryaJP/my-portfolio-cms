'use client'

import { links } from '@/lib/data'
import { SidebarProps } from './types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBars } from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'
import { ProfileDropdown } from '../auth/ProfileDropdown'
import { useAppSelector } from '@/lib/hooks'

export const Sidebar = ({ children }: SidebarProps) => {
	const pathname = usePathname()
	const userData = useAppSelector((state) => state.user.data)
	const userDataStatus = useAppSelector((state) => state.user.status)

	console.log(userData)
	console.log(userDataStatus)

	if (userDataStatus === 'loading') {
		return null
	}

	if (userData !== null) {
		return (
			<div className='drawer lg:drawer-open'>
				<input
					id='my-drawer-3'
					type='checkbox'
					className='drawer-toggle'
				/>
				<div className='drawer-content flex flex-col overflow-y-auto'>
					{/* Navbar */}
					<div className='navbar bg-primaryLightBg border-b dark:bg-primaryDark border-primaryLightBorder dark:border-primaryDarkBorder w-full fixed top-0 right-0 py-1 px-4'>
						<div className='flex-none lg:hidden'>
							<label
								htmlFor='my-drawer-3'
								aria-label='open sidebar'
								className='btn btn-square btn-ghost text-primaryDarkBg dark:text-white'
							>
								<FaBars size={20} />
							</label>
						</div>
						<div className='mx-2 flex-1 px-2 block text-2xl text-primaryDarkBg dark:text-white font-bold'>
							Portfolio CMS
						</div>
						<div className='flex lg:hidden'>
							<ProfileDropdown username={userData?.username} />
						</div>
						<div className='hidden flex-none lg:block'>
							<ul className='menu menu-horizontal'>
								{/* Navbar menu content here */}

								<ProfileDropdown
									username={userData?.username}
								/>
							</ul>
						</div>
					</div>
					{/* Page content here */}
					<div className='pt-28 pb-8 lg:pt-24 lg:pb-8 px-7 flex flex-1'>
						{children}
					</div>
				</div>
				<div className='drawer-side'>
					<label
						htmlFor='my-drawer-3'
						aria-label='close sidebar'
						className='drawer-overlay'
					></label>
					<ul className='menu dark:bg-[#31363F] bg-primaryLight min-h-full w-80 p-0'>
						{/* Sidebar content here */}

						<div className='p-4 bg-primaryLightBg dark:bg-primaryDark border-b border-primaryLightBorder dark:border-primaryDarkBorder flex items-center justify-between'>
							<p className='ps-4 text-2xl text-primaryDarkBg dark:text-white font-bold'>
								Portfolio CMS
							</p>
							<label
								htmlFor='my-drawer-3'
								aria-label='close sidebar'
								className='btn btn-square btn-ghost text-primaryDarkBg dark:text-white flex lg:hidden'
							>
								<FaTimes size={20} />
							</label>
						</div>

						<div className='flex flex-col gap-2 py-4 ps-4'>
							{links.map((link, index) => (
								<Link
									href={link.url}
									key={index}
									className='flex'
									onClick={() => {
										const drawerCheckbox =
											document.getElementById(
												'my-drawer-3'
											) as HTMLInputElement | null
										if (drawerCheckbox) {
											drawerCheckbox.checked = false
										}
									}}
								>
									<li className='py-1 flex-1'>
										<p className='text-base text-primaryDark dark:text-white hover:bg-transparent focus:!bg-transparent active:!bg-transparent focus:!text-primaryDark active:!text-primaryDark dark:focus:!text-white dark:active:!text-white'>
											{link.name}
										</p>
									</li>
									{link.url === pathname && (
										<div className='my-1 bg-[#76ABAE] w-[4px] rounded-full'></div>
									)}
								</Link>
							))}
						</div>
					</ul>
				</div>
			</div>
		)
	}
}
