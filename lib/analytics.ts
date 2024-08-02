import { google } from 'googleapis'
import { JWT } from 'google-auth-library'

const scopes = ['https://www.googleapis.com/auth/analytics.readonly']

export interface AnalyticsData {
	date: string
	activeUsers: number
}

export async function getAnalyticsData(): Promise<AnalyticsData[]> {
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

		const response = await analyticsreporting.properties.runReport({
			property: `properties/${process.env.GA_PROPERTY_ID}`,
			requestBody: {
				dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
				metrics: [
					{ name: 'activeUsers' },
					{ name: 'screenPageViews' },
					{ name: 'sessions' },
				],
				dimensions: [{ name: 'date' }],
			},
		})

		console.log('API Response:', JSON.stringify(response.data, null, 2))

		if (!response.data.rows || response.data.rows.length === 0) {
			console.log('No data returned from Analytics API')
		} else {
			console.log('Data returned:', response.data.rows)
		}

		return (
			response.data.rows?.map((row) => ({
				date: row.dimensionValues?.[0].value || '',
				activeUsers: parseInt(row.metricValues?.[0].value || '0'),
				pageViews: parseInt(row.metricValues?.[1].value || '0'),
				sessions: parseInt(row.metricValues?.[2].value || '0'),
			})) || []
		)
	} catch (error) {
		console.error('Error fetching analytics data:', error)
		if (error instanceof Error) {
			console.error('Error message:', error.message)
			console.error('Error stack:', error.stack)
		}
		return []
	}
}
