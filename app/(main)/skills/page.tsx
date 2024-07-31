'use client'

import { getSkillsFn } from '@/api/skills'
import InformationCard from '@/components/card/InformationCard'
import CreateSkillsModal from '@/components/Modal/Skills/CreateSkillsModal'
import UpdateSkillsModal from '@/components/Modal/Skills/UpdateSkillsModal'
import { Table } from '@/components/table'
import { SkillsTableHeader } from '@/lib/tableHeader'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function Skills() {
	const [createSkillModalOpen, setCreateSkillModalOpen] = useState(false)
	const [updateSkillModalOpen, setUpdateSkillModalOpen] = useState(false)
	const [skillId, setSkillId] = useState(0)
	const [skillName, setSkillName] = useState('')

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
					setCreateModalOpen={setCreateSkillModalOpen}
					setUpdateModalOpen={setUpdateSkillModalOpen}
					setSkillId={setSkillId}
					setSkillName={setSkillName}
					modal={
						<>
							<CreateSkillsModal
								isOpen={createSkillModalOpen}
								setIsOpen={setCreateSkillModalOpen}
								refetch={refetchSkillsData}
							/>
							<UpdateSkillsModal
								isOpen={updateSkillModalOpen}
								setIsOpen={setUpdateSkillModalOpen}
								refetch={refetchSkillsData}
								skillId={skillId}
								skillName={skillName}
							/>
						</>
					}
				/>
			</div>
		</div>
	)
}
