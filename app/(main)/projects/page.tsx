import { getProjectsFn } from '@/api/projects'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import Projects from './projects'

export default async function PostsPage() {
	const initialPage = 1
	const initialLimit = 5

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
		queryKey: ['all-projects', initialPage, initialLimit],
		queryFn: () => getProjectsFn(initialPage, initialLimit),
	})

	return (
		// Neat! Serialization is now as easy as passing props.
		// HydrationBoundary is a Client Component, so hydration will happen there.
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Projects />
		</HydrationBoundary>
	)
}
