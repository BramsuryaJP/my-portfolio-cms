import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react'
import { CreateModalProps } from '../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { showToast } from '@/lib/helper/ReactToastifyHelper'
import axios from 'axios'
import { createContentDescFn } from '@/api/content-description'
import TiptapEditor from '@/components/Field/TipTapEditor'

const createContentDescriptionSchema = z.object({
	name: z.string().min(1, 'Content name is required'),
	description: z.string().min(1, 'Content description is required'),
})

type CreateContentDescriptionData = z.infer<
	typeof createContentDescriptionSchema
>

export default function CreateContentDescriptionModal({
	isOpen,
	setIsOpen,
	refetch,
}: CreateModalProps) {
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		control, // Add control from react-hook-form
		reset,
		formState: { errors },
	} = useForm<CreateContentDescriptionData>({
		resolver: zodResolver(createContentDescriptionSchema),
	})

	const handleCreateContentDesc = useMutation({
		mutationFn: (data: CreateContentDescriptionData) =>
			createContentDescFn(data),
		onMutate() {
			setLoading(true)
		},
		onSuccess: (res) => {
			showToast('success', res.message)
			setIsOpen(false)
			refetch()
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				showToast('error', error.response?.data?.message)
				setLoading(false)
			}
		},
		onSettled: () => {
			setLoading(false)
			reset()
		},
	})

	const onSubmit: SubmitHandler<CreateContentDescriptionData> = (data) => {
		handleCreateContentDesc.mutate(data)
	}

	return (
		<>
			<Dialog
				open={isOpen}
				as='div'
				className='relative z-40 focus:outline-none'
				onClose={() => {}}
			>
				<DialogBackdrop className='fixed inset-0 bg-black/40 backdrop-blur-[7px]' />

				<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4'>
						<DialogPanel
							transition
							className='w-full max-w-md rounded-xl bg-primaryLight/80 dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
						>
							<DialogTitle
								as='h3'
								className='text-xl/7 font-medium text-primaryDark dark:text-white'
							>
								Create Content Description
							</DialogTitle>
							<p className='text-sm/6 text-primaryDark/80 dark:text-white/50'>
								Input content description data to create a new
								content description
							</p>
							<div className='mt-4'>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className='mt-5 flex flex-col gap-5'
								>
									<div>
										<label className='text-sm/6 font-medium text-primaryDark dark:text-white'>
											Content Name
										</label>
										<input
											{...register('name')}
											className={`
                        mt-3 block w-full rounded-lg border-2 bg-primaryLight dark:bg-white/5 py-3 ps-3 pe-11 text-sm/6 text-primaryDark dark:text-white
                        ${
							errors.name
								? 'border-red-500 focus:border-red-500 outline-none'
								: 'border-transparent focus:border-primaryLightBorder dark:focus:border-primaryDarkBorder outline-none'
						}`}
										/>
										{errors.name && (
											<p className='mt-1 text-red-500 text-xs'>
												{errors.name.message}
											</p>
										)}
									</div>

									<div>
										<label className='text-sm/6 font-medium text-primaryDark dark:text-white'>
											Project Description
										</label>
										<TiptapEditor
											name='description'
											control={control}
											error={errors.description?.message}
										/>
									</div>

									<div className='flex w-full gap-5 mt-2'>
										<button
											type='button'
											className='w-full rounded-lg bg-red-500 py-3 px-4 text-base font-medium text-white hover:bg-red-500/60 active:bg-red-500/80 disabled:bg-red-500/60'
											onClick={() => {
												setIsOpen(false)
												reset()
											}}
											disabled={loading}
										>
											Cancel
										</button>
										<button
											type='submit'
											className='w-full rounded-lg bg-secondary py-3 px-4 text-base font-medium text-white hover:bg-secondary/60 active:bg-secondary/80 disabled:bg-secondary/60'
											disabled={loading}
										>
											Create
										</button>
									</div>
								</form>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	)
}