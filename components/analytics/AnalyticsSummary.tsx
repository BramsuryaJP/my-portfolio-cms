'use client'

import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { AnalyticsData } from '@/lib/analytics'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
	data: AnalyticsData[]
}

export default function AnalyticsChart({ data }: Props) {
	const chartOptions: ApexOptions = {
		chart: {
			type: 'line',
			height: 350,
		},
		title: {
			text: 'Active Users Over Time',
		},
		xaxis: {
			categories: data.map((item) => item.date),
			title: {
				text: 'Date',
			},
		},
		yaxis: {
			title: {
				text: 'Active Users',
			},
		},
	}

	const series = [
		{
			name: 'Active Users',
			data: data.map((item) => item.activeUsers),
		},
	]

	return (
		<Chart
			options={chartOptions}
			series={series}
			type='line'
			height={350}
		/>
	)
}
