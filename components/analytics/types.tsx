import { AnalyticsData } from '@/lib/analytics'

export interface AnalyticsSummaryProps {
	initialData: {
		userActiveData: AnalyticsData[]
		pageViewersData: AnalyticsData[]
	}
	fetchAnalyticsData: (timeFilter: string) => Promise<{
		userActiveData: AnalyticsData[]
		pageViewersData: AnalyticsData[]
	}>
}

export type TimeFilterButtonProps = {
	timeFilter: string
	handleTimeFilterChange: (newFilter: string) => void
}
