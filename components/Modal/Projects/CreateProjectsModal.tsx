import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react'
import { CreateModalProps } from '../types'
import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { showToast } from '@/lib/helper/ReactToastifyHelper'
import axios from 'axios'
import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { createProjectFn } from '@/api/projects'
import { DynamicTextarea } from '@/components/Field/DynamicTextarea'

type CreateProjectMutationInput = FormData

export default function CreateProjectsModal({
	isOpen,
	setIsOpen,
	refetch,
}: CreateModalProps) {
	const [loading, setLoading] = useState(false)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	// New state variables for each field
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [tags, setTags] = useState<string[]>([''])
	const [image, setImage] = useState<File | null>(null)

	const [nameError, setNameError] = useState('')
	const [descriptionError, setDescriptionError] = useState('')
	const [tagsError, setTagsError] = useState('')
	const [imageError, setImageError] = useState('')

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(e.target.value)
	}

	const handleTagChange = (index: number, value: string) => {
		const newTags = [...tags]
		newTags[index] = value
		setTags(newTags)
	}

	const addTag = () => {
		setTags([...tags, ''])
	}

	const removeTag = (index: number) => {
		const newTags = tags.filter((_, i) => i !== index)
		setTags(newTags)
	}

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (files && files.length > 0) {
			setImage(files[0])
			const reader = new FileReader()
			reader.onloadend = () => {
				setImagePreview(reader.result as string)
			}
			reader.readAsDataURL(files[0])
		} else {
			setImage(null)
			setImagePreview(null)
		}
	}

	const resetForm = () => {
		setName('')
		setDescription('')
		setTags([''])
		setImage(null)
		setImagePreview(null)
		setNameError('')
		setDescriptionError('')
		setTagsError('')
		setImageError('')
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleCreateProject = useMutation({
		mutationFn: (data: CreateProjectMutationInput) => createProjectFn(data),
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
			resetForm()
		},
	})

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Reset error messages
		setNameError('')
		setDescriptionError('')
		setTagsError('')
		setImageError('')

		let hasError = false

		if (name.trim() === '') {
			setNameError('Project name is required')
			hasError = true
		}

		if (description.trim() === '') {
			setDescriptionError('Project description is required')
			hasError = true
		}

		if (tags.some((tag) => tag.trim() === '')) {
			setTagsError('All tags must be non-empty')
			hasError = true
		}

		if (!image) {
			setImageError('Project image is required')
			hasError = true
		}

		if (hasError) {
			return
		}

		const formData = new FormData()
		formData.append('name', name)
		formData.append('description', description)

		const filteredTags = tags.filter((tag) => tag.trim() !== '')
		filteredTags.forEach((tag) => {
			formData.append('tags[]', tag)
		})

		if (image) formData.append('image', image)

		handleCreateProject.mutate(formData)
	}

	return (
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
							Create Project
						</DialogTitle>
						<p className='text-sm/6 text-primaryDark/80 dark:text-white/50'>
							Input project data to create a new project
						</p>
						<div className='mt-4'>
							<form
								onSubmit={onSubmit}
								className='mt-5 flex flex-col gap-5'
							>
								<div>
									<label className='text-sm/6 font-medium text-primaryDark dark:text-white'>
										Project Name
									</label>
									<input
										value={name}
										onChange={handleNameChange}
										className={`
                                      mt-3 block w-full rounded-lg border-2 bg-primaryLight dark:bg-white/5 py-3 ps-3 pe-11 text-sm/6 text-primaryDark dark:text-white
                                      ${
											nameError
												? 'border-red-500 focus:border-red-500 outline-none'
												: 'border-transparent focus:border-primaryLightBorder dark:focus:border-primaryDarkBorder outline-none'
										}`}
									/>
									{nameError && (
										<p className='mt-1 text-red-500 text-xs'>
											{nameError}
										</p>
									)}
								</div>

								<div>
									<label className='text-sm/6 font-medium text-primaryDark dark:text-white'>
										Project Description
									</label>
									<DynamicTextarea
										value={description}
										onChange={handleDescriptionChange}
										error={descriptionError}
									/>
									{descriptionError && (
										<p className='mt-1 text-red-500 text-xs'>
											{descriptionError}
										</p>
									)}
								</div>

								<div>
									<div className='flex justify-between items-center gap-5'>
										<label className='text-sm/6 font-medium text-primaryDark dark:text-white'>
											Tags
										</label>
										<button
											type='button'
											onClick={addTag}
											className='inline-flex items-center gap-2 text-sm/6 text-secondary'
										>
											<FaPlus /> Add
										</button>
									</div>
									{tags.map((tag, index) => (
										<div
											key={index}
											className='flex items-center gap-2 mt-2'
										>
											<input
												value={tag}
												onChange={(e) =>
													handleTagChange(
														index,
														e.target.value
													)
												}
												className={`flex-grow mt-1 block w-full rounded-lg border-2 bg-primaryLight dark:bg-white/5 py-3 ps-3 pe-11 text-sm/6 text-primaryDark dark:text-white 
                          ${
								tagsError
									? 'border-red-500 focus:border-red-500'
									: 'border-transparent focus:border-primaryLightBorder dark:focus:border-primaryDarkBorder'
							} 
                          outline-none`}
											/>
											{index > 0 && (
												<button
													type='button'
													onClick={() =>
														removeTag(index)
													}
													className='text-red-500'
												>
													<FaTimes />
												</button>
											)}
										</div>
									))}
									{tagsError && (
										<p className='mt-1 text-red-500 text-xs'>
											{tagsError}
										</p>
									)}
								</div>

								<div>
									<label className='text-sm/6 font-medium text-primaryDark dark:text-white'>
										Project Image
									</label>
									{!imagePreview && (
										<>
											<input
												type='file'
												accept='image/jpeg,image/png,image/jpg'
												onChange={handleImageChange}
												ref={fileInputRef}
												className={`
              mt-3 block w-full rounded-lg border-2 bg-primaryLight dark:bg-white/5 
              py-3 px-3 text-sm leading-6 text-primaryDark dark:text-white
              ${
					imageError
						? 'border-red-500 focus:border-red-500'
						: 'border-transparent focus:border-primaryLightBorder dark:focus:border-primaryDarkBorder'
				}
              outline-none
            `}
											/>
											{imageError && (
												<p className='mt-1 text-red-500 text-xs'>
													{imageError}
												</p>
											)}
										</>
									)}
									{imagePreview && (
										<div className='relative'>
											<button
												onClick={() => {
													setImagePreview(null)
													if (fileInputRef.current) {
														fileInputRef.current.value =
															''
													}
												}}
												className='rounded-full p-2 absolute right-2 top-2 bg-primaryDarkBg/60 backdrop-blur-md text-white'
											>
												<FaTimes size={16} />
											</button>

											<Image
												src={imagePreview}
												alt='Preview'
												width={1980}
												height={1980}
												className='mt-2 max-w-full h-44 rounded-xl'
											/>
										</div>
									)}
								</div>

								<div className='flex w-full gap-5 mt-2'>
									<button
										type='button'
										className='w-full rounded-lg bg-red-500 py-3 px-4 text-base font-medium text-white hover:bg-red-500/60 active:bg-red-500/80 disabled:bg-red-500/60'
										onClick={() => {
											setIsOpen(false)
											resetForm()
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
	)
}
