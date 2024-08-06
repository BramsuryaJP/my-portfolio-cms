import { google } from 'googleapis'
import { JWT } from 'google-auth-library'

const scopes = ['https://www.googleapis.com/auth/analytics.readonly']

export interface AnalyticsData {
	date?: string
	activeUsers?: number
	screenPageViews?: number
	city?: string
	country?: string
}

interface DateRange {
	startDate: string
	endDate: string
}

function getDateRange(timeFilter: string): DateRange {
	const today = new Date()
	let startDate: Date

	switch (timeFilter) {
		case 'all':
		default:
			return { startDate: '2015-08-14', endDate: 'today' } // Default to all time
		case 'today':
			return {
				startDate: today.toISOString().split('T')[0],
				endDate: today.toISOString().split('T')[0],
			}
		case 'yesterday':
			startDate = new Date(today)
			startDate.setDate(today.getDate() - 1)
			return {
				startDate: startDate.toISOString().split('T')[0],
				endDate: startDate.toISOString().split('T')[0],
			}
		case 'last7days':
			startDate = new Date(today)
			startDate.setDate(today.getDate() - 7)
			return {
				startDate: startDate.toISOString().split('T')[0],
				endDate: 'today',
			}
		case 'last14days':
			startDate = new Date(today)
			startDate.setDate(today.getDate() - 14)
			return {
				startDate: startDate.toISOString().split('T')[0],
				endDate: 'today',
			}
		case 'last30days':
			startDate = new Date(today)
			startDate.setDate(today.getDate() - 30)
			return {
				startDate: startDate.toISOString().split('T')[0],
				endDate: 'today',
			}
		case 'thisYear':
			return {
				startDate: `${today.getFullYear()}-01-01`,
				endDate: 'today',
			}
		case 'lastYear':
			const lastYear = today.getFullYear() - 1
			return {
				startDate: `${lastYear}-01-01`,
				endDate: `${lastYear}-12-31`,
			}
	}
}

export async function getPageViewersData(
	timeFilter: string = 'all'
): Promise<AnalyticsData[]> {
	try {
		const auth = new JWT({
			email: process.env.GA_CLIENT_EMAIL,
			key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
			scopes: scopes,
		})

		const analyticsreporting = google.analyticsdata({
			version: 'v1beta',
			auth,
		})

		const dateRange = getDateRange(timeFilter)

		const response = await analyticsreporting.properties.runReport({
			property: `properties/${process.env.GA_PROPERTY_ID}`,
			requestBody: {
				dateRanges: [dateRange],
				metrics: [{ name: 'screenPageViews' }],
				dimensions: [{ name: 'date' }],
			},
		})

		console.log('API Response:', JSON.stringify(response.data, null, 2))

		if (!response.data.rows || response.data.rows.length === 0) {
			console.log('No data returned from Analytics API')
		} else {
			console.log('Data returned:', response.data.rows)
		}

		const data =
			response.data.rows?.map((row) => ({
				date: row.dimensionValues?.[0].value || '',
				screenPageViews: parseInt(row.metricValues?.[0].value || '0'),
			})) || []

		return data.sort((a, b) => a.date.localeCompare(b.date))
	} catch (error) {
		console.error('Error fetching analytics data:', error)
		if (error instanceof Error) {
			console.error('Error message:', error.message)
			console.error('Error stack:', error.stack)
		}
		return []
	}
}

export async function getActiveUsersData(
	timeFilter: string = 'all'
): Promise<AnalyticsData[]> {
	try {
		const auth = new JWT({
			email: process.env.GA_CLIENT_EMAIL,
			key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
			scopes: scopes,
		})

		const analyticsreporting = google.analyticsdata({
			version: 'v1beta',
			auth,
		})

		const dateRange = getDateRange(timeFilter)

		const response = await analyticsreporting.properties.runReport({
			property: `properties/${process.env.GA_PROPERTY_ID}`,
			requestBody: {
				dateRanges: [dateRange],
				metrics: [{ name: 'activeUsers' }],
				dimensions: [
					{ name: 'date' },
					{ name: 'city' },
					{ name: 'country' },
				],
			},
		})

		console.log('API Response:', JSON.stringify(response.data, null, 2))

		if (!response.data.rows || response.data.rows.length === 0) {
			console.log('No data returned from Analytics API')
		} else {
			console.log('Data returned:', response.data.rows)
		}

		const data =
			response.data.rows?.map((row) => ({
				date: row.dimensionValues?.[0].value || '',
				city: row.dimensionValues?.[1].value || '',
				country: row.dimensionValues?.[2].value || '',
				activeUsers: parseInt(row.metricValues?.[0].value || '0'),
			})) || []

		return data.sort((a, b) => a.date.localeCompare(b.date))
	} catch (error) {
		console.error('Error fetching analytics data:', error)
		if (error instanceof Error) {
			console.error('Error message:', error.message)
			console.error('Error stack:', error.stack)
		}
		return []
	}
}
