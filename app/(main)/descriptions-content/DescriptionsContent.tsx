'use client'

import {
	getContentsDescFn,
	updateContentDescDescriptionFn,
} from '@/api/content-description'
import { updateContentDescDescriptionSchema } from '@/api/content-description/types'
import InformationCard from '@/components/card/InformationCard'
import { DynamicTextarea } from '@/components/Field/DynamicTextarea'
import TiptapEditor from '@/components/Field/TipTapEditor'
import CreateContentDescriptionModal from '@/components/Modal/ContentDescription/CreateContentDescriptionModal'
import { showToast } from '@/lib/helper/ReactToastifyHelper'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import { BsPlus } from 'react-icons/bs'

interface ContentDescription {
	id: number
	name: string
	descriptionEn: string
	descriptionIna: string
}

interface FormData {
	descriptionEn: string
	descriptionIna: string
}

const ContentDescriptionForm: React.FC<{
	contentDesc: ContentDescription
	refetch: () => void
}> = ({ contentDesc, refetch }) => {
	const [loading, setLoading] = useState(false)
	const { control, handleSubmit } = useForm<FormData>({
		defaultValues: {
			descriptionEn: contentDesc.descriptionEn,
			descriptionIna: contentDesc.descriptionIna,
		},
	})

	const updateMutation = useMutation({
		mutationFn: (data: updateContentDescDescriptionSchema) =>
			updateContentDescDescriptionFn(data, contentDesc.id),
		onMutate() {
			setLoading(true)
		},
		onSuccess: (res) => {
			showToast('success', res.message)
			refetch()
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				showToast('error', error.response?.data?.message)
			}
		},
		onSettled: () => {
			setLoading(false)
		},
	})

	const onSubmit = (data: FormData) => {
		updateMutation.mutate(data)
	}

  console.log('ContentDescriptionForm', contentDesc.descriptionIna);
  

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
			<label className='block text-md/6 font-medium text-primaryDark dark:text-white mb-2'>
				{contentDesc.name}
			</label>
			<div className='mb-4'>
				<label className='block text-sm/6 font-medium text-primaryDark dark:text-white mb-2'>
					English Description
				</label>
				<TiptapEditor
					name='descriptionEn'
					control={control as Control<any>}
					defaultValue={contentDesc.descriptionEn}
				/>
			</div>
			<div className='mb-2'>
				<label className='block text-sm/6 font-medium text-primaryDark dark:text-white mb-2'>
					Indonesian Description
				</label>
				<TiptapEditor
					name='descriptionIna'
					control={control as Control<any>}
					defaultValue={contentDesc.descriptionIna}
				/>
			</div>
			<button
				type='submit'
				className='flex items-center justify-center gap-2 mt-4 w-fit rounded-lg bg-secondary py-3 px-8 text-base font-medium text-white hover:bg-secondary/60 active:bg-secondary/80 disabled:bg-secondary/60'
				disabled={loading}
			>
				{loading && (
					<svg
						className='h-5 w-5 animate-spin text-white'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
						></circle>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
						></path>
					</svg>
				)}
				{loading ? 'Saving...' : 'Save'}
			</button>
		</form>
	)
}

export default function DescriptionsContent() {
	const [createModalOpen, setCreateModalOpen] = useState(false)

	const {
		data: allContentDescData,
		refetch: refetchContentDescData,
		isLoading: isLoadingContentDescData,
	} = useQuery({
		queryKey: ['all-content-description'],
		queryFn: async () => {
			const response = await getContentsDescFn()
			return response
		},
	})

	if (isLoadingContentDescData) {
		return (
			<div className='flex flex-col w-full gap-5'>
				<div className='animate-pulse'>
					<div className='bg-primaryLightBg dark:bg-primaryDarkBg h-4'></div>
					<div className='bg-primaryLightBg dark:bg-primaryDarkBg h-20'></div>
				</div>
			</div>
		)
	}

	if (!allContentDescData || allContentDescData.length === 0) {
		return (
			<>
				<div className='flex items-center justify-center h-full w-full gap-5'>
					<div className='flex flex-col items-center justify-center gap-5'>
						<p className='max-w-md text-center text-xl text-primaryDark dark:text-white'>
							There isn&apos;t any content description data yet.
							Create a new content description
						</p>
						<button
							type='button'
							onClick={() => {
								setCreateModalOpen(true)
							}}
							className='w-fit inline-flex items-center justify-center bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-white border dark:border-primaryDarkBorder rounded-md p-2 pr-3'
						>
							<BsPlus size={28} />
							<p>Create Content Description</p>
						</button>
					</div>
				</div>
				<CreateContentDescriptionModal
					isOpen={createModalOpen}
					setIsOpen={setCreateModalOpen}
					refetch={refetchContentDescData}
				/>
			</>
		)
	}

	return (
		<div className='flex flex-col w-full gap-5'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
				<InformationCard
					title='Content Descriptions'
					totalCount={allContentDescData.length}
					loading={isLoadingContentDescData}
				/>
			</div>
			<div className='flex justify-end'>
				<button
					type='button'
					onClick={() => {
						setCreateModalOpen(true)
					}}
					className='bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-white border dark:border-primaryDarkBorder rounded-full p-1'
				>
					<BsPlus size={28} />
				</button>
			</div>
			{allContentDescData.map((contentDesc: ContentDescription) => (
				<ContentDescriptionForm
					key={contentDesc.id}
					contentDesc={contentDesc}
					refetch={refetchContentDescData}
				/>
			))}

			<CreateContentDescriptionModal
				isOpen={createModalOpen}
				setIsOpen={setCreateModalOpen}
				refetch={refetchContentDescData}
			/>
		</div>
	)
}
