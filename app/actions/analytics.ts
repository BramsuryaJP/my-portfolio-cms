// app/actions/analytics.ts
'use server'

import {
	getActiveUsersData,
	getPageViewersData,
	AnalyticsData,
} from '@/lib/analytics'

export async function fetchAnalyticsData(timeFilter: string = 'all'): Promise<{
	userActiveData: AnalyticsData[]
	pageViewersData: AnalyticsData[]
}> {
	const userActiveData = await getActiveUsersData(timeFilter)
	const pageViewersData = await getPageViewersData(timeFilter)

	return { userActiveData, pageViewersData }
}
