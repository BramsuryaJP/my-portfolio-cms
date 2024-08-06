'use client'

import { useEffect, useState } from 'react'
import ActiveUsersChart from './ActiveUsersChart'
import PageViewersChart from './PageViewsChart'
import { AnalyticsSummaryProps } from './types'
import TimeFilterButton from './TimeFilterButton'

export const AnalyticsSummary = ({
	initialData,
	fetchAnalyticsData,
}: AnalyticsSummaryProps) => {
	const [timeFilter, setTimeFilter] = useState('all')
	const [data, setData] = useState(initialData)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true)
			try {
				const newData = await fetchAnalyticsData(timeFilter)
				setData(newData)
			} catch (error) {
				console.error('Error fetching data:', error)
				// Handle error as needed
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [timeFilter, fetchAnalyticsData])

	const handleTimeFilterChange = (newFilter: string) => {
		setTimeFilter(newFilter)
	}

	return (
		<div className='p-5 bg-primaryLight dark:bg-primaryDark rounded-xl'>
			<div className='flex justify-between items-center gap-5 mb-5'>
				<p className='text-xl text-primaryDark dark:text-white font-semibold'>
					Analytics Summary
				</p>
				<TimeFilterButton
					timeFilter={timeFilter}
					handleTimeFilterChange={handleTimeFilterChange}
				/>
			</div>
			{isLoading && (
				<div className='grid grid-cols-1 xl:grid-cols-2 w-full gap-5 animate-pulse'>
					<div className='w-full h-[350px] bg-primaryLightBg dark:bg-primaryDarkBg rounded-2xl'></div>
					<div className='w-full h-[350px] bg-primaryLightBg dark:bg-primaryDarkBg rounded-2xl'></div>
				</div>
			)}
			{!isLoading && (
				<div className='grid grid-cols-1 xl:grid-cols-2 w-full gap-5'>
					<ActiveUsersChart data={data.userActiveData} />
					<PageViewersChart data={data.pageViewersData} />
				</div>
			)}
		</div>
	)
}
