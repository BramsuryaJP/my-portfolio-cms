import { ProjectsGridProps } from './types'
import ImageFallback from '../image/ImageFallback'
import { FaPencil, FaTrash } from 'react-icons/fa6'

export function ProjectsGrid<
	T extends {
		id: number
		name: string
		image: string
		description: string
		tags: string[]
	}
>({
	datas,
	setItemId,
	setItemDescription,
	setItemName,
	setItemTags,
	setItemImage,
	setDeleteConfirmationModalOpen,
	setDeleteType,
	setUpdateModalOpen,
}: ProjectsGridProps<T>) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
			{datas?.map((data) => (
				<div
					key={data.id}
					className='bg-primaryLight dark:bg-primaryDark shadow-md rounded-xl flex flex-col'
				>
					<div className='h-48 lg:h-44 overflow-hidden'>
						<ImageFallback
							src={
								process.env.NEXT_PUBLIC_BACKEND_URL + data.image
							}
							blurDataURL={
								process.env.NEXT_PUBLIC_BACKEND_URL + data.image
							}
							height={1980}
							width={1980}
							quality={95}
							alt={data.name + '-project-image'}
							className='w-full h-48 lg:h-44 rounded-t-xl'
							loading='lazy'
						/>
					</div>

					<div className='p-5'>
						<div className='flex gap-5 justify-between items-center'>
							<p className='text-primaryDark dark:text-white text-xl font-semibold'>
								{data.name}
							</p>
							<div className='flex flex-row gap-3 text-sm font-bold text-primaryDark dark:text-white'>
								<button
									className='outline-none'
									onClick={() => {
										setUpdateModalOpen &&
											setUpdateModalOpen(true)
										setItemId && setItemId(data.id)
										setItemName && setItemName(data.name)
										setItemDescription &&
											setItemDescription(data.description)
										setItemTags && setItemTags(data.tags)
										setItemImage && setItemImage(data.image)
									}}
								>
									<FaPencil />
								</button>
								<button
									className='outline-none'
									onClick={() => {
										setDeleteConfirmationModalOpen &&
											setDeleteConfirmationModalOpen(true)
										setItemId && setItemId(data.id)
										setDeleteType && setDeleteType('single')
									}}
								>
									<FaTrash />
								</button>
							</div>
						</div>
						<div>
							<p className='text-primaryDark dark:text-white text-sm mt-2'>
								{data.description}
							</p>
						</div>
						<div className='flex flex-wrap gap-2 mt-4'>
							{data.tags.map((tag, index) => (
								<div
									key={index}
									className='inline-block bg-primaryLightBg dark:bg-primaryDarkBg text-primaryDark dark:text-white text-xs font-medium px-3 py-2 rounded-full'
								>
									{tag}
								</div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
