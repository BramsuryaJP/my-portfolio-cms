import React from 'react'
import { FaPencil, FaTrash } from 'react-icons/fa6'
import { TableProps } from './types'
import { BsPlus } from 'react-icons/bs'

export function Table({
	title,
	length,
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
					{length === 0 && (
						<div className='w-full flex items-center justify-center'>
							<p className='text-primaryDark dark:text-white font-medium text-sm'>
								No Data Available
							</p>
						</div>
					)}
					{length !== 0 && (
						<div className='overflow-x-auto'>
							<table className='table'>
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
										datas.map((data, index) => (
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
						</div>
					)}
				</div>
			</div>
			{modal}
		</React.Fragment>
	)
}
