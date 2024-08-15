import React from 'react'
import {
	FaChevronLeft,
	FaChevronRight,
	FaListUl,
	FaPencil,
	FaTrash,
} from 'react-icons/fa6'
import { TableProps } from './types'
import { BsFillGrid3X3GapFill, BsPlus } from 'react-icons/bs'

export function Table<
	T extends {
		id: number
		name: string
		descriptionEn: string
		descriptionIna: string
		tags: string[]
		image: string
	}
>({
	title,
	loading,
	headers,
	datas,
	modal,
	setCreateModalOpen,
	setUpdateModalOpen,
	setDeleteConfirmationModalOpen,
	setItemId,
	setItemName,
	setItemEnglishDescription,
	setItemIndonesianDescription,
	setItemTags,
	setItemImage,
	selectedItemId,
	setSelectedItemId,
	setDeleteType,
	currentPage,
	totalPages,
	limit,
	totalCount,
	onNextPage,
	onPrevPage,
	onLimitChange,
	tableLayout,
	setTableLayout,
	gridLayout,
	setGridLayout,
	gridComponent,
}: TableProps<T>) {
	const handleCheckboxChange = (id: number) => {
		if (setSelectedItemId) {
			setSelectedItemId(
				selectedItemId && selectedItemId?.includes(id)
					? selectedItemId?.filter((skillId) => skillId !== id)
					: [...(selectedItemId || []), id]
			)
		}
	}

	const handleMainCheckboxChange = () => {
		if (setSelectedItemId) {
			setSelectedItemId(
				selectedItemId && selectedItemId?.length === datas?.length
					? []
					: datas?.map((data) => data?.id) || []
			)
		}
	}

	const Tag: React.FC<{ tag: string }> = ({ tag }) => (
		<div className='inline-block bg-primaryLightBg dark:bg-primaryDarkBg text-primaryDark dark:text-white text-xs font-medium px-3 py-2 rounded-full'>
			{tag}
		</div>
	)

	function renderCellContent<T extends { id: number; name: string }>(
		data: T,
		key: keyof T
	): React.ReactNode {
		const value = data[key]
		if (key === 'tags' && Array.isArray(value)) {
			return (
				<div className='flex flex-wrap gap-2'>
					{value.map((tag, index) => (
						<Tag key={index} tag={tag} />
					))}
				</div>
			)
		}
		if (
			typeof value === 'string' ||
			typeof value === 'number' ||
			typeof value === 'boolean'
		) {
			return String(value)
		}
		if (Array.isArray(value)) {
			return value.join(', ')
		}
		// For other types, you might want to implement specific rendering logic
		return JSON.stringify(value)
	}

	return (
		<React.Fragment>
			<div
				className={`flex w-full items-center ${
					gridLayout !== undefined ? 'justify-between' : 'justify-end'
				}`}
			>
				{gridLayout !== undefined && (
					<div className='flex items-center p-0.5 rounded-lg bg-primaryLight dark:bg-primaryDark border border-primaryLightBorder dark:border-primaryDarkBorder'>
						<button
							onClick={() => {
								setTableLayout && setTableLayout(true)
								setGridLayout && setGridLayout(false)
							}}
							className={`${
								tableLayout
									? 'bg-primaryLightBg dark:bg-primaryDarkBg rounded-lg'
									: ''
							} p-2`}
						>
							<FaListUl size={20} />
						</button>
						<button
							onClick={() => {
								setTableLayout && setTableLayout(false)
								setGridLayout && setGridLayout(true)
							}}
							className={`${
								gridLayout
									? 'bg-primaryLightBg dark:bg-primaryDarkBg rounded-lg'
									: ''
							} p-2`}
						>
							<BsFillGrid3X3GapFill size={20} />
						</button>
					</div>
				)}
				<button
					type='button'
					onClick={() => {
						setCreateModalOpen && setCreateModalOpen(true)
					}}
					className='bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-white border dark:border-primaryDarkBorder rounded-full p-1'
				>
					<BsPlus size={28} />
				</button>
			</div>
			{(!gridLayout || gridLayout === undefined) && (
				<div className='mt-5 p-5 bg-primaryLight dark:bg-primaryDark border border-primaryLightBorder dark:border-primaryDarkBorder rounded-lg'>
					<div className='flex flex-col sm:flex-row justify-between gap-3 items-start'>
						<p className='text-lg font-bold text-primaryDark dark:text-white'>
							{title}
						</p>
						{selectedItemId && selectedItemId?.length > 0 && (
							<button
								type='button'
								onClick={() => {
									setDeleteConfirmationModalOpen &&
										setDeleteConfirmationModalOpen(true)
									setDeleteType && setDeleteType('multiple')
								}}
								className='py-2 px-4 bg-red-500 rounded-md text-white text-md flex gap-2 items-center justify-center'
							>
								<FaTrash />
								Delete selected data
							</button>
						)}
					</div>
					<div className='mt-5'>
						{totalCount === 0 && (
							<div className='w-full flex items-center justify-center'>
								<p className='text-primaryDark dark:text-white font-medium text-sm'>
									No Data Available
								</p>
							</div>
						)}
						{totalCount !== 0 && (
							<div className='z-0'>
								<div className='overflow-x-auto'>
									<table className='table z-0'>
										<thead>
											<tr className='border-b-primaryLightBorder dark:border-b-primaryDarkBorder'>
												<th>
													<label>
														<input
															type='checkbox'
															className='checkbox [--chkbg:theme(colors.secondary)] [--chkfg:theme(colors.primaryDark)] dark:[--chkfg:theme(colors.white)] border-primaryDark dark:border-primaryDarkBorder'
															checked={
																selectedItemId?.length ===
																datas?.length
															}
															onChange={
																handleMainCheckboxChange
															}
														/>
													</label>
												</th>
												{headers.map(
													(header, index) => (
														<th
															key={index}
															className='text-sm font-medium text-primaryDark dark:text-white/80'
														>
															{header.name}
														</th>
													)
												)}
											</tr>
										</thead>
										<tbody>
											{!loading &&
												datas?.map((data, index) => (
													<tr
														className='border-b-primaryLightBorder dark:border-b-primaryDarkBorder'
														key={index}
													>
														<th>
															<label>
																<input
																	type='checkbox'
																	className='checkbox [--chkbg:theme(colors.secondary)] [--chkfg:theme(colors.primaryDark)] dark:[--chkfg:theme(colors.white)] border-primaryDark dark:border-primaryDarkBorder'
																	checked={selectedItemId?.includes(
																		data.id
																	)}
																	onChange={() =>
																		handleCheckboxChange(
																			data.id
																		)
																	}
																/>
															</label>
														</th>
														{headers.map(
															(
																header,
																cellIndex
															) => (
																<td
																	key={
																		cellIndex
																	}
																	className={`${
																		header &&
																		header.key ===
																			'name' &&
																		'whitespace-nowrap'
																	} ${
																		header &&
																		header.key ===
																			'tags' &&
																		'w-44'
																	}`}
																>
																	{header.key ===
																	'action' ? (
																		<div className='flex flex-row gap-5 text-sm font-bold text-primaryDark dark:text-white'>
																			<button
																				className='outline-none'
																				onClick={() => {
																					setUpdateModalOpen &&
																						setUpdateModalOpen(
																							true
																						)
																					setItemId &&
																						setItemId(
																							data.id
																						)
																					setItemName &&
																						setItemName(
																							data.name
																						)
																					setItemEnglishDescription &&
																						setItemEnglishDescription(
																							data.descriptionEn
																						)
																					setItemIndonesianDescription &&
																						setItemIndonesianDescription(
																							data.descriptionIna
																						)
																					setItemTags &&
																						setItemTags(
																							data.tags
																						)
																					setItemImage &&
																						setItemImage(
																							data.image
																						)
																				}}
																			>
																				<FaPencil />
																			</button>
																			<button
																				className='outline-none'
																				onClick={() => {
																					setDeleteConfirmationModalOpen &&
																						setDeleteConfirmationModalOpen(
																							true
																						)
																					setItemId &&
																						setItemId(
																							data.id
																						)
																					setDeleteType &&
																						setDeleteType(
																							'single'
																						)
																				}}
																			>
																				<FaTrash />
																			</button>
																		</div>
																	) : (
																		<div className='text-sm font-bold text-primaryDark dark:text-white'>
																			{renderCellContent(
																				data,
																				header.key as keyof T
																			)}
																		</div>
																	)}
																</td>
															)
														)}
													</tr>
												))}
										</tbody>
									</table>
								</div>

								<div className='mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0'>
									<div className='flex items-center'>
										<span className='mr-2 text-sm font-medium text-primaryDark dark:text-white'>
											Show
										</span>
										<select
											value={limit}
											onChange={(e) =>
												onLimitChange &&
												onLimitChange(
													Number(e.target.value)
												)
											}
											className='border outline-none rounded-md px-1 py-1 text-sm bg-primaryLightBg dark:bg-primaryDarkBg text-primaryDark dark:text-white border-primaryLightBorder dark:border-primaryDarkBorder'
										>
											<option value={5}>5</option>
											<option value={10}>10</option>
											<option value={25}>25</option>
											<option value={50}>50</option>
										</select>
									</div>

									<div className='flex justify-between items-center gap-5'>
										<span className='text-sm font-medium text-primaryDark dark:text-white text-center sm:text-left'>
											Showing{' '}
											{((currentPage ?? 1) - 1) * limit! +
												1}{' '}
											to{' '}
											{Math.min(
												(currentPage ?? 1) * limit!,
												totalCount!
											)}{' '}
											of {totalCount}
										</span>
										<div className='flex gap-2 justify-center sm:justify-start'>
											<button
												onClick={onPrevPage}
												disabled={currentPage === 1}
												className='px-3 py-2 outline-none text-sm bg-primaryLightBg dark:bg-primaryDarkBg text-primaryDark dark:text-primaryLight border border-primaryLightBorder dark:border-primaryDarkBorder rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
											>
												<FaChevronLeft />
											</button>
											<button
												onClick={onNextPage}
												disabled={
													currentPage === totalPages
												}
												className='px-3 py-2 outline-none text-sm bg-primaryLightBg dark:bg-primaryDarkBg text-primaryDark dark:text-primaryLight border border-primaryLightBorder dark:border-primaryDarkBorder rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
											>
												<FaChevronRight />
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
			{gridLayout &&
				gridLayout !== undefined &&
				gridComponent !== undefined && (
					<div className='mt-5'>
						<div>
							<p className='text-lg font-bold text-primaryDark dark:text-white'>
								{title}
							</p>
							{gridComponent}
						</div>
					</div>
				)}
			{modal}
		</React.Fragment>
	)
}
