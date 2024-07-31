'use client'

import { getSkillsFn } from '@/api/skills'
import InformationCard from '@/components/card/InformationCard'
import CreateSkillsModal from '@/components/Modal/Skills/CreateSkillsModal'
import { Table } from '@/components/table'
import { SkillsTableHeader } from '@/lib/tableHeader'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function Skills() {
	const [createSkillModalOpen, setCreateSkillModalOpen] = useState(false)

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

	console.log(createSkillModalOpen)

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
				<Table
					title='Skills Table'
					headers={SkillsTableHeader}
					datas={allSkillsData?.data}
					loading={isLoadingSkillsData}
					length={allSkillsData?.data.length}
					setModalOpen={setCreateSkillModalOpen}
					modal={
						<CreateSkillsModal
							isOpen={createSkillModalOpen}
							setIsOpen={setCreateSkillModalOpen}
							refetch={refetchSkillsData}
						/>
					}
				/>
			</div>
		</div>
	)
}
