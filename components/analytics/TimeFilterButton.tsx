import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa6'
import { TimeFilterButtonProps } from './types'

export default function TimeFilterButton({
	timeFilter,
	handleTimeFilterChange,
}: TimeFilterButtonProps) {
	return (
		<Menu>
			<MenuButton
				as='button'
				className='inline-flex items-center gap-4 py-2 px-4 text-primaryDark dark:text-white rounded-md bg-primaryLightBg dark:bg-primaryDarkBg backdrop-blur-xl border border-primaryLightBorder dark:border-primaryDarkBorder'
			>
				{timeFilter === 'all'
					? 'All Time'
					: timeFilter === 'today'
					? 'Today'
					: timeFilter === 'yesterday'
					? 'Yesterday'
					: timeFilter === 'last7days'
					? 'Last 7 Days'
					: timeFilter === 'last14days'
					? 'Last 14 Days'
					: timeFilter === 'last30days'
					? 'Last 30 Days'
					: timeFilter === 'thisYear'
					? 'This Year'
					: timeFilter === 'lastYear'
					? 'Last Year'
					: timeFilter}
				<FaChevronDown className='size-4 text-primaryDark dark:text-white' />
			</MenuButton>
			<MenuItems
				anchor='bottom end'
				className='mt-2 rounded-md dark:bg-primaryDarkBg/50 backdrop-blur-xl 
                border border-primaryLightBorder dark:border-primaryDarkBorder text-primaryDark dark:text-white z-30 max-h-40 overflow-y-auto'
			>
				<MenuItem
					as='button'
					onClick={() => handleTimeFilterChange('all')}
					className='flex flex-row items-center gap-2 py-2 px-4 border-b border-primaryLightBorder dark:border-primaryDarkBorder last:border-none w-full text-left'
				>
					All Time
				</MenuItem>
				<MenuItem
					as='button'
					onClick={() => handleTimeFilterChange('today')}
					className='flex flex-row items-center gap-2 py-2 px-4 border-b border-primaryLightBorder dark:border-primaryDarkBorder last:border-none w-full text-left'
				>
					Today
				</MenuItem>
				<MenuItem
					as='button'
					onClick={() => handleTimeFilterChange('yesterday')}
					className='flex flex-row items-center gap-2 py-2 px-4 border-b border-primaryLightBorder dark:border-primaryDarkBorder last:border-none w-full text-left'
				>
					Yesterday
				</MenuItem>
				<MenuItem
					as='button'
					onClick={() => handleTimeFilterChange('last7days')}
					className='flex flex-row items-center gap-2 py-2 px-4 border-b border-primaryLightBorder dark:border-primaryDarkBorder last:border-none w-full text-left'
				>
					Last 7 Days
				</MenuItem>
				<MenuItem
					as='button'
					onClick={() => handleTimeFilterChange('last14days')}
					className='flex flex-row items-center gap-2 py-2 px-4 border-b border-primaryLightBorder dark:border-primaryDarkBorder last:border-none w-full text-left'
				>
					Last 14 Days
				</MenuItem>
				<MenuItem
					as='button'
					onClick={() => handleTimeFilterChange('last30days')}
					className='flex flex-row items-center gap-2 py-2 px-4 border-b border-primaryLightBorder dark:border-primaryDarkBorder last:border-none w-full text-left'
				>
					Last 30 Days
				</MenuItem>
				<MenuItem
					as='button'
					onClick={() => handleTimeFilterChange('thisYear')}
					className='flex flex-row items-center gap-2 py-2 px-4 border-b border-primaryLightBorder dark:border-primaryDarkBorder last:border-none w-full text-left'
				>
					This Year
				</MenuItem>
				<MenuItem
					as='button'
					onClick={() => handleTimeFilterChange('lastYear')}
					className='flex flex-row items-center gap-2 py-2 px-4 border-b border-primaryLightBorder dark:border-primaryDarkBorder last:border-none w-full text-left'
				>
					Last Year
				</MenuItem>
			</MenuItems>
		</Menu>
	)
}
