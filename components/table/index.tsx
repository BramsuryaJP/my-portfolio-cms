import React from 'react'
import {
	FaChevronLeft,
	FaChevronRight,
	FaPencil,
	FaTrash,
} from 'react-icons/fa6'
import { TableProps } from './types'
import { BsPlus } from 'react-icons/bs'

export function Table({
	title,
	loading,
	headers,
	datas,
	modal,
	setCreateModalOpen,
	setUpdateModalOpen,
	setDeleteConfirmationModalOpen,
	setSkillId,
	setSkillName,
	selectedSkillId,
	setSelectedSkillId,
	setDeleteType,
	currentPage,
	totalPages,
	limit,
	totalCount,
	onNextPage,
	onPrevPage,
	onLimitChange,
}: TableProps) {
	const handleCheckboxChange = (id: number) => {
		setSelectedSkillId(
			selectedSkillId?.includes(id)
				? selectedSkillId?.filter((skillId) => skillId !== id)
				: [...selectedSkillId, id]
		)
	}

	const handleMainCheckboxChange = () => {
		setSelectedSkillId(
			selectedSkillId?.length === datas?.length
				? []
				: datas?.map((data) => data?.id)
		)
	}

	return (
		<React.Fragment>
			<div className='flex w-full items-center justify-end'>
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
			<div className='mt-5 p-5 bg-primaryLight dark:bg-primaryDark border border-primaryLightBorder dark:border-primaryDarkBorder rounded-lg'>
				<div className='flex flex-col sm:flex-row justify-between gap-3 items-start'>
					<p className='text-lg font-bold text-primaryDark dark:text-white'>
						{title}
					</p>
					{selectedSkillId?.length > 0 && (
						<button
							type='button'
							onClick={() => {
								setDeleteConfirmationModalOpen(true)
								setDeleteType('multiple')
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
						<div className='overflow-x-auto z-0'>
							<table className='table z-0'>
								<thead>
									<tr className='border-b-primaryLightBorder dark:border-b-primaryDarkBorder'>
										<th>
											<label>
												<input
													type='checkbox'
													className='checkbox [--chkbg:theme(colors.secondary)] [--chkfg:theme(colors.primaryDark)] dark:[--chkfg:theme(colors.white)] border-primaryDark dark:border-primaryDarkBorder'
													checked={
														selectedSkillId?.length ===
														datas?.length
													}
													onChange={
														handleMainCheckboxChange
													}
												/>
											</label>
										</th>
										{headers.map((header, index) => (
											<React.Fragment key={index}>
												<th className='text-sm font-medium text-primaryDark dark:text-white/80'>
													{header.name}
												</th>
											</React.Fragment>
										))}
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
															checked={selectedSkillId?.includes(
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
												<td>
													<div>
														<div>
															<div className='text-sm font-bold text-primaryDark dark:text-white'>
																{data.name}
															</div>
														</div>
													</div>
												</td>
												<th>
													<div className='flex flex-row gap-5 text-sm font-bold text-primaryDark dark:text-white'>
														<button
															className='outline-none'
															onClick={() => {
																setUpdateModalOpen(
																	true
																)
																setSkillId(
																	data.id
																)
																setSkillName(
																	data.name
																)
															}}
														>
															<FaPencil />
														</button>
														<button
															className='outline-none'
															onClick={() => {
																setDeleteConfirmationModalOpen(
																	true
																)
																setSkillId(
																	data.id
																)
																setDeleteType(
																	'single'
																)
															}}
														>
															<FaTrash />
														</button>
													</div>
												</th>
											</tr>
										))}
								</tbody>
							</table>

							<div className='mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0'>
								<div className='flex items-center'>
									<span className='mr-2 text-sm font-medium text-primaryDark dark:text-white'>
										Show
									</span>
									<select
										value={limit}
										onChange={(e) =>
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
										Showing {(currentPage - 1) * limit + 1}{' '}
										to{' '}
										{Math.min(
											currentPage * limit,
											totalCount
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
			{modal}
		</React.Fragment>
	)
}
