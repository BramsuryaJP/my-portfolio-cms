import { getSkillsFn } from '@/api/skills'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import Skills from './skills'

export default async function PostsPage() {
	const initialPage = 1
	const initialLimit = 5

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['all-skills', initialPage, initialLimit],
		queryFn: () => getSkillsFn(initialPage, initialLimit),
	})

	return (
		// Neat! Serialization is now as easy as passing props.
		// HydrationBoundary is a Client Component, so hydration will happen there.
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Skills />
		</HydrationBoundary>
	)
}
