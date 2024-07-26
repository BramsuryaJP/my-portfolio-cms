'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { links } from '@/lib/data'
import { SidebarProps } from './types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggler from '../ThemeToggler'
import { FaBars, FaCaretLeft } from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'

export const Sidebar = ({ children }: SidebarProps) => {
	const pathname = usePathname()

	return (
		<div className='drawer lg:drawer-open'>
			<input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
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
						<Menu>
							<MenuButton
								as='button'
								className='w-10 h-10 rounded-full bg-primaryLight/80 dark:bg-primaryDarkBg/80 backdrop-blur-xl border border-primaryLightBorder dark:border-primaryDarkBorder flex items-center justify-center'
							>
								<p className='uppercase text-lg font-semibold text-primaryDark dark:text-white'>
									N
								</p>
							</MenuButton>
							<MenuItems
								anchor='bottom end'
								className='mt-2 rounded-md dark:bg-primaryDarkBg/50 backdrop-blur-xl border border-primaryLightBorder dark:border-primaryDarkBorder'
							>
								<MenuItem>
									<ThemeToggler />
								</MenuItem>
								<div className='my-1 h-px bg-white/5' />
							</MenuItems>
						</Menu>
					</div>
					<div className='hidden flex-none lg:block'>
						<ul className='menu menu-horizontal'>
							{/* Navbar menu content here */}
							<Menu>
								<MenuButton
									as='button'
									className='w-10 h-10 rounded-full bg-primaryLight/80 dark:bg-primaryDarkBg/80 backdrop-blur-xl border border-primaryLightBorder dark:border-primaryDarkBorder flex items-center justify-center'
								>
									<p className='uppercase text-lg font-semibold text-primaryDark dark:text-white'>
										N
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
									>
										<BiLogOut color='#C63C51' size={20} />
										<p className='text-sm font-semibold text-[#C63C51]'>
											Logout
										</p>
									</MenuItem>
								</MenuItems>
							</Menu>
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
							<Link href={link.url} key={index} className='flex'>
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
