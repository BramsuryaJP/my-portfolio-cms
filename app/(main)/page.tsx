import AnalyticsChart from '@/components/analytics/AnalyticsSummary'
import Greetings from '@/components/Greetings'
import { getAnalyticsData } from '@/lib/analytics'

export default async function Home() {
	const analyticsData = await getAnalyticsData()

  console.log(analyticsData);
  

	return (
		<div>
			<Greetings />
			<div className='mt-5'></div>
			<AnalyticsChart data={analyticsData} />
		</div>
	)
}
