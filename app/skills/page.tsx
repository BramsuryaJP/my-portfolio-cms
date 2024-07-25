import { BsPlus } from 'react-icons/bs'

export default function Skills() {
	return (
		<div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
				<div className='p-4 rounded-lg bg-primaryLight dark:bg-primaryDark border border-primaryLightBorder dark:border-primaryDarkBorder'>
					<p className='text-sm font-medium text-primaryDark dark:text-white/80'>
						Skills
					</p>
					<p className='mt-2 text-xl font-bold text-primaryDark dark:text-white'>
						20
					</p>
				</div>
			</div>
			<div className='mt-5'>
				<div className='flex w-full items-center justify-end'>
					<div className='bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-white border dark:border-primaryDarkBorder rounded-full p-1'>
						<BsPlus size={28} />
					</div>
				</div>
				<div className='mt-5 p-5 bg-primaryLight dark:bg-primaryDark border border-primaryLightBorder dark:border-primaryDarkBorder rounded-lg'></div>
			</div>
		</div>
	)
}
