import { FaPencil, FaTrash } from 'react-icons/fa6'
import { TableProps } from './types'
import React from 'react'
import { BsPlus } from 'react-icons/bs'

export function Table({
	title,
	length,
	loading,
	headers,
	datas,
	modal,
	setModalOpen,
}: TableProps) {
	return (
		<React.Fragment>
			<div className='flex w-full items-center justify-end'>
				<button
					type='button'
					onClick={() => {
						setModalOpen(true)
					}}
					className='bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-white border dark:border-primaryDarkBorder rounded-full p-1'
				>
					<BsPlus size={28} />
				</button>
			</div>
			<div className='mt-5 p-5 bg-primaryLight dark:bg-primaryDark border border-primaryLightBorder dark:border-primaryDarkBorder rounded-lg'>
				<p className='text-lg font-bold text-primaryDark dark:text-white'>
					{title}
				</p>
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
								{/* head */}
								<thead>
									<tr className='border-b-primaryLightBorder dark:border-b-primaryDarkBorder'>
										<th>
											<label>
												<input
													type='checkbox'
													className='checkbox [--chkbg:theme(colors.secondary)] [--chkfg:theme(colors.primaryDark)] dark:[--chkfg:theme(colors.white)]'
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
															className='checkbox [--chkbg:theme(colors.secondary)] [--chkfg:theme(colors.primaryDark)] dark:[--chkfg:theme(colors.white)]'
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
														<button>
															<FaPencil />
														</button>
														<button>
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
