'use client'

import {
	deleteMultipleSkillsFn,
	deleteSingleSkillFn,
	getSkillsFn,
} from '@/api/skills'
import InformationCard from '@/components/card/InformationCard'
import DeleteConfirmationModal from '@/components/Modal/DeleteConfirmationModal'
import CreateSkillsModal from '@/components/Modal/Skills/CreateSkillsModal'
import UpdateSkillsModal from '@/components/Modal/Skills/UpdateSkillsModal'
import { Table } from '@/components/table'
import { showToast } from '@/lib/helper/ReactToastifyHelper'
import { SkillsTableHeader } from '@/lib/tableHeader'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

export default function Skills() {
	const [createSkillModalOpen, setCreateSkillModalOpen] = useState(false)
	const [updateSkillModalOpen, setUpdateSkillModalOpen] = useState(false)
	const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
		useState(false)
	const [deleteType, setDeleteType] = useState<'single' | 'multiple'>(
		'single'
	)
	const [skillId, setSkillId] = useState(0)
	const [skillName, setSkillName] = useState('')
	const [selectedSkillId, setSelectedSkillId] = useState<number[]>([])

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

	const handleSingleSkillDelete = useMutation({
		mutationFn: (id: number) => deleteSingleSkillFn(id),
		onMutate() {},
		onSuccess: (res) => {
			showToast('success', res.message)
			setDeleteConfirmationModalOpen(false)
			if (
				res.skill &&
				res.skill.id &&
				selectedSkillId.includes(res.skill.id)
			) {
				setSelectedSkillId(
					selectedSkillId.filter((id) => id !== res.skill.id)
				)
			}
			refetchSkillsData()
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				showToast('error', error.response?.data?.message)
				setDeleteConfirmationModalOpen(false)
			}
		},
	})

	const handleMultipleSkillsDelete = useMutation({
		mutationFn: (ids: number[]) => deleteMultipleSkillsFn(ids),
		onMutate() {},
		onSuccess: (res) => {
			showToast('success', res.message)
			setDeleteConfirmationModalOpen(false)
			refetchSkillsData()
			setSelectedSkillId([])
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				showToast('error', error.response?.data?.message)
			}
			setDeleteConfirmationModalOpen(false)
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
					refetch={refetchSkillsData}
					loading={isLoadingSkillsData}
					length={allSkillsData?.data.length}
					setCreateModalOpen={setCreateSkillModalOpen}
					setUpdateModalOpen={setUpdateSkillModalOpen}
					setDeleteConfirmationModalOpen={
						setDeleteConfirmationModalOpen
					}
					setSkillId={setSkillId}
					setSkillName={setSkillName}
					selectedSkillId={selectedSkillId}
					setSelectedSkillId={setSelectedSkillId}
					setDeleteType={setDeleteType}
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
							<DeleteConfirmationModal
								isOpen={deleteConfirmationModalOpen}
								setIsOpen={setDeleteConfirmationModalOpen}
								title='Delete Skill'
								description="Are you sure you want to delete this skill? you can't undo this action"
								deleteFn={
									deleteType === 'single'
										? () => {
												handleSingleSkillDelete.mutate(
													skillId
												)
										  }
										: () => {
												handleMultipleSkillsDelete.mutate(
													selectedSkillId
												)
										  }
								}
							/>
						</>
					}
				/>
			</div>
		</div>
	)
}
