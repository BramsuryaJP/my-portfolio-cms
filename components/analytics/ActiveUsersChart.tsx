import React from 'react'
import { AnalyticsData } from '@/lib/analytics'
import { useTheme } from 'next-themes'
import { Chart } from 'react-google-charts'

interface Props {
	data: AnalyticsData[]
}

export default function ActiveUsersChart({ data }: Props) {
	const { theme } = useTheme()

	const summedData = data.reduce((acc, item) => {
		if (item.country) {
			acc[item.country] =
				(acc[item.country] || 0) + (item.activeUsers || 0)
		}
		return acc
	}, {} as Record<string, number>)

	const chartData = [
		['Country', 'Active Users'],
		...Object.entries(summedData),
	]

	const options = {
		colorAxis: { colors: ['#76ABAE'] },
		backgroundColor: theme === 'dark' ? '#222831' : '#FFFFFF',
		datalessRegionColor: theme === 'dark' ? '#31363F' : '#F8FAFC',
		defaultColor: theme === 'dark' ? '#f5f5f5' : '#31363F',
		legend: 'none',
	}

	return (
		<div className='bg-primaryLightBg dark:bg-primaryDarkBg p-5 rounded-2xl'>
			<p className='text-lg text-primaryDark dark:text-white font-medium mb-3'>
				Active User
			</p>
			{data.length === 0 && (
				<div className='w-full h-[350px] flex items-center justify-center'>
					<p className='text-primaryDark dark:text-white'>
						No data available
					</p>
				</div>
			)}
			{data.length !== 0 && (
				<Chart
					chartEvents={[
						{
							eventName: 'select',
							callback: ({ chartWrapper }) => {
								const chart = chartWrapper.getChart()
								const selection = chart.getSelection()
								if (selection.length === 0) return
								const region = chartData[selection[0].row + 1]
								console.log('Selected : ' + region)
							},
						},
					]}
					chartType='GeoChart'
					width='100%'
					height='350px'
					data={chartData}
					options={options}
				/>
			)}
		</div>
	)
}
