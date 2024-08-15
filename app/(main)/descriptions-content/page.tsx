import { getContentsDescFn } from '@/api/content-description'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import DescriptionsContent from './DescriptionsContent'

export default async function DescriptionsContentPage() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 10 * 60 * 1000,
				gcTime: 10 * 60 * 1000,
			},
		},
	})

	await queryClient.prefetchQuery({
		queryKey: ['all-content-description'],
		queryFn: getContentsDescFn,
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DescriptionsContent />
		</HydrationBoundary>
	)
}
