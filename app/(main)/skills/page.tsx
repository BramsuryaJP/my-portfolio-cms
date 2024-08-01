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
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Skills() {
	// skill modal open state
	const [createSkillModalOpen, setCreateSkillModalOpen] = useState(false)
	const [updateSkillModalOpen, setUpdateSkillModalOpen] = useState(false)
	const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
		useState(false)

	// skill delete type state
	const [deleteType, setDeleteType] = useState<'single' | 'multiple'>(
		'single'
	)

	// skill state
	const [skillId, setSkillId] = useState(0)
	const [skillName, setSkillName] = useState('')
	const [selectedSkillId, setSelectedSkillId] = useState<number[]>([])

	// pagination state
	const [currentPage, setCurrentPage] = useState(1)
	const [limit, setLimit] = useState(5)
	const [totalPages, setTotalPages] = useState(1)
	const [totalCount, setTotalCount] = useState(0)

	const {
		data: allSkillsData,
		refetch: refetchSkillsData,
		isLoading: isLoadingSkillsData,
	} = useQuery({
		queryKey: ['all-skills', currentPage, limit],
		queryFn: async () => {
			const response = await getSkillsFn(currentPage, limit)
			setTotalPages(calculateTotalPages(response.totalCount, limit))
			setTotalCount(response.totalCount)
			return response
		},
		placeholderData: keepPreviousData,
	})

	const calculateTotalPages = (totalCount: number, limit: number) => {
		return Math.ceil(totalCount / limit)
	}

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prev) => prev + 1)
		}
	}

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1)
		}
	}

	const handleLimitChange = (newLimit: number) => {
		setLimit(newLimit)
		setCurrentPage(1) // Reset to first page when changing limit
		setTotalPages(calculateTotalPages(totalCount, newLimit)) // Recalculate total pages
	}

	useEffect(() => {
		setTotalPages(calculateTotalPages(totalCount, limit))
	}, [totalCount, limit])

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

	console.log(totalPages)

	return (
		<div className='w-full'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
				<InformationCard
					title='Skills'
					totalCount={totalCount}
					loading={isLoadingSkillsData}
				/>
			</div>
			<div className='mt-5'>
				<Table
					title='Skills Table'
					headers={SkillsTableHeader}
					datas={allSkillsData?.data}
					currentPage={currentPage}
					totalPages={totalPages}
					limit={limit}
					totalCount={totalCount}
					onNextPage={handleNextPage}
					onPrevPage={handlePrevPage}
					onLimitChange={handleLimitChange}
					refetch={refetchSkillsData}
					loading={isLoadingSkillsData}
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
