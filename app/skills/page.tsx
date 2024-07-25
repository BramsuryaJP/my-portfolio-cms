import { SkillsTableHeader } from '@/lib/tableHeader'
import React from 'react'
import { BsPlus } from 'react-icons/bs'
import { FaPencil, FaTrash } from 'react-icons/fa6'

export default function Skills() {
	return (
		<div className='w-full'>
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
					<button className='bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-white border dark:border-primaryDarkBorder rounded-full p-1'>
						<BsPlus size={28} />
					</button>
				</div>
				<div className='mt-5 p-5 bg-primaryLight dark:bg-primaryDark border border-primaryLightBorder dark:border-primaryDarkBorder rounded-lg'>
					<p className='text-lg font-bold text-primaryDark dark:text-white'>
						Skills Table
					</p>
					<div className='mt-5'>
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
										{SkillsTableHeader.map(
											(header, index) => (
												<React.Fragment key={index}>
													<th className='text-sm font-medium text-primaryDark dark:text-white/80'>
														{header.name}
													</th>
												</React.Fragment>
											)
										)}
									</tr>
								</thead>
								<tbody>
									<tr className='border-b-primaryLightBorder dark:border-b-primaryDarkBorder'>
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
														Hart Hagerty
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
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
