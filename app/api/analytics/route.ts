import { NextResponse } from 'next/server'
import { getAnalyticsData } from '@/lib/analytics'

export async function GET() {
	try {
		const data = await getAnalyticsData()
		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Error fetching analytics data' },
			{ status: 500 }
		)
	}
}
