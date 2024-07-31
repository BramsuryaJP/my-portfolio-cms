import { InformationCardProps } from './types'

export default function InformationCard({
	title,
	length,
	loading,
}: InformationCardProps) {
	return (
		<div className='p-4 rounded-lg bg-primaryLight dark:bg-primaryDark border border-primaryLightBorder dark:border-primaryDarkBorder'>
			<p className='text-sm font-medium text-primaryDark dark:text-white/80'>
				{title}
			</p>

			{!loading && (
				<p className='mt-2 text-xl font-bold text-primaryDark dark:text-white'>
					{length}
				</p>
			)}

			{loading && (
				<p className='mt-2 text-xl font-bold text-primaryDark dark:text-white'>
					0
				</p>
			)}
		</div>
	)
}
