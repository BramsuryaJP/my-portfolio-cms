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

	const queryClient = new QueryClient()

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
