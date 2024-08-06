import { AnalyticsSummary } from '@/components/analytics/AnalyticsSummary'
import Greetings from '@/components/Greetings'
import { fetchAnalyticsData } from '../actions/analytics'

export default async function Home() {
	// Fetch initial data for 'all time'
	const initialData = await fetchAnalyticsData('all')

	return (
		<div className='w-full'>
			<Greetings />
			<div className='mt-5'></div>
			<AnalyticsSummary
				initialData={initialData}
				fetchAnalyticsData={fetchAnalyticsData}
			/>
		</div>
	)
}
