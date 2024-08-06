import React from 'react'
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'
import { AnalyticsData } from '@/lib/analytics'
import { useTheme } from 'next-themes'

interface Props {
	data: AnalyticsData[]
}

export default function PageViewersChart({ data }: Props) {
	const { theme } = useTheme()

	const formatDate = (dateString: string | undefined) => {
		if (!dateString) {
			return ''
		}
		const month = dateString.substring(4, 6)
		const day = dateString.substring(6, 8)
		return `${month}/${day}`
	}

	const chartData = data.map((item) => ({
		date: formatDate(item.date),
		screenPageViews: item.screenPageViews,
	}))

	return (
		<div className='bg-primaryLightBg dark:bg-primaryDarkBg p-5 rounded-2xl'>
			<p className='text-lg text-primaryDark dark:text-white font-medium mb-3'>
				Page Views
			</p>
			{data.length === 0 && (
				<div className='w-full h-[350px] flex items-center justify-center'>
					<p className='text-primaryDark dark:text-white'>
						No data available
					</p>
				</div>
			)}
			{data.length !== 0 && (
				<ResponsiveContainer width='100%' height={350}>
					<AreaChart
						data={chartData}
						margin={{
							top: 10,
							right: 0,
							left: 0,
							bottom: 0,
						}}
					>
						{/* <CartesianGrid strokeDasharray='3 3' /> */}
						<XAxis dataKey='date' hide />
						<YAxis hide />
						<Tooltip
							contentStyle={{
								color: theme === 'dark' ? '#FFFFFF' : '#31363F',
								backgroundColor:
									theme === 'dark' ? '#31363F' : '#F8FAFC',
								borderColor:
									theme === 'dark'
										? 'rgba(255,255,255,0.2)'
										: '#E5E7EB',
							}}
						/>
						<defs>
							<linearGradient
								id='colorScreenPageViews'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor='#76ABAE'
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor='#76ABAE'
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<Area
							type='monotone'
							dataKey='screenPageViews'
							stroke='#76ABAE'
							fillOpacity={1}
							fill='url(#colorScreenPageViews)'
						/>
					</AreaChart>
				</ResponsiveContainer>
			)}
		</div>
	)
}
