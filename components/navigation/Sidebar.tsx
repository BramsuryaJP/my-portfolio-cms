'use client'

import { links } from '@/lib/data'
import { SidebarProps } from './types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggler from '../ThemeToggler'

export const Sidebar = ({ children }: SidebarProps) => {
	const pathname = usePathname()

	return (
		<div className='drawer lg:drawer-open'>
			<input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content flex flex-col'>
				{/* Navbar */}
				<div className='navbar bg-primaryLightBg border-b dark:bg-primaryDark border-primaryLightBorder dark:border-primaryDarkBorder w-full fixed top-0 right-0 p-4'>
					<div className='flex-none lg:hidden'>
						<label
							htmlFor='my-drawer-3'
							aria-label='open sidebar'
							className='btn btn-square btn-ghost'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								className='inline-block h-6 w-6 stroke-current'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h16'
								></path>
							</svg>
						</label>
					</div>
					<div className='mx-2 flex-1 px-2 block'>Portfolio CMS</div>
					<div className='hidden flex-none lg:block'>
						<ul className='menu menu-horizontal'>
							{/* Navbar menu content here */}
							<ThemeToggler />
						</ul>
					</div>
				</div>
				{/* Page content here */}
				<div className='h-dvh py-24 px-7'>{children}</div>
			</div>
			<div className='drawer-side'>
				<label
					htmlFor='my-drawer-3'
					aria-label='close sidebar'
					className='drawer-overlay'
				></label>
				<ul className='menu dark:bg-[#31363F] bg-primaryLight border-b min-h-full w-80 p-0'>
					{/* Sidebar content here */}

					<div className='p-4 bg-primaryLightBg dark:bg-primaryDark border-b border-primaryLightBorder dark:border-primaryDarkBorder flex items-center justify-center'>
						<p className='text-2xl text-[#222831] dark:text-white font-bold'>
							Portfolio CMS
						</p>
					</div>

					<div className='flex flex-col gap-2 py-4 ps-4'>
						{links.map((link, index) => (
							<Link href={link.url} key={index} className='flex'>
								<li className='py-1 flex-1'>
									<p className='text-base text-[#222831] dark:text-white hover:bg-transparent focus:!bg-transparent active:!bg-transparent focus:!text-primaryDark active:!text-primaryDark dark:focus:!text-white dark:active:!text-white'>
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
