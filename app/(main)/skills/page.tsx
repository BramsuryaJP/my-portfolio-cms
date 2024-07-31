'use client'

import { getSkillsFn } from '@/api/skills'
import InformationCard from '@/components/card/InformationCard'
import { Table } from '@/components/table'
import { SkillsTableHeader } from '@/lib/tableHeader'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { BsPlus } from 'react-icons/bs'
import { FaPencil, FaTrash } from 'react-icons/fa6'

export default function Skills() {
	const {
		data: allSkillsData,
		refetch: refetchSkillsData,
		isLoading: isLoadingSkillsData,
	} = useQuery({
		queryKey: ['all-skills'],
		queryFn: async () => {
			const response = await getSkillsFn()
			return response
		},
	})

	console.log(allSkillsData)

	return (
		<div className='w-full'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
				<InformationCard
					title='Skills'
					length={allSkillsData?.data.length}
					loading={isLoadingSkillsData}
				/>
			</div>
			<div className='mt-5'>
				<div className='flex w-full items-center justify-end'>
					<button className='bg-primaryLight dark:bg-primaryDark text-primaryDark dark:text-white border dark:border-primaryDarkBorder rounded-full p-1'>
						<BsPlus size={28} />
					</button>
				</div>
				<Table
					title='Skills Table'
					headers={SkillsTableHeader}
					datas={allSkillsData?.data}
					loading={isLoadingSkillsData}
					length={allSkillsData?.data.length}
				/>
			</div>
		</div>
	)
}
