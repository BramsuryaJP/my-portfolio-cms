'use client'

import { getProjectsFn } from '@/api/projects'
import InformationCard from '@/components/card/InformationCard'
import { Table } from '@/components/table'
import { ProjectsTableHeader } from '@/lib/tableHeader'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function Projects() {
	const [tableLayout, setTableLayout] = useState(true)
	const [gridLayout, setGridLayout] = useState(false)

	// projects state
	const [projectId, setProjectId] = useState(0)
	const [projectName, setProjectName] = useState('')
	const [selectedProjectId, setSelectedProjectId] = useState<number[]>([])

	// pagination state
	const [currentPage, setCurrentPage] = useState(1)
	const [limit, setLimit] = useState(5)
	const [totalPages, setTotalPages] = useState(1)
	const [totalCount, setTotalCount] = useState(0)

	const {
		data: allProjectsData,
		refetch: refetchProjectsData,
		isLoading: isLoadingProjectsData,
	} = useQuery({
		queryKey: ['all-projects', currentPage, limit],
		queryFn: async () => {
			const response = await getProjectsFn(currentPage, limit)
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

	useEffect(() => {
		setTotalCount(allProjectsData?.totalCount)
	}, [allProjectsData])

	return (
		<div className='w-full'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
				<InformationCard
					title='Projects'
					totalCount={totalCount}
					loading={isLoadingProjectsData}
				/>
			</div>
			<div className='mt-5'>
				<Table
        <{ id: number; name: string; tags: string[]; description: string }>
					title={tableLayout ? 'Projects Table' : 'Projects Grid'}
					headers={ProjectsTableHeader}
					tableLayout={tableLayout}
					setTableLayout={setTableLayout}
					gridLayout={gridLayout}
					setGridLayout={setGridLayout}
					datas={allProjectsData?.data}
					currentPage={currentPage}
					totalPages={totalPages}
					limit={limit}
					totalCount={totalCount}
					onNextPage={handleNextPage}
					onPrevPage={handlePrevPage}
					onLimitChange={handleLimitChange}
					refetch={refetchProjectsData}
					loading={isLoadingProjectsData}
					// setCreateModalOpen={setCreateSkillModalOpen}
					// setUpdateModalOpen={setUpdateSkillModalOpen}
					// setDeleteConfirmationModalOpen={
					// 	setDeleteConfirmationModalOpen
					// }
					setItemId={setProjectId}
					setItemName={setProjectName}
					selectedItemId={selectedProjectId}
					setSelectedItemId={setSelectedProjectId}
					// setDeleteType={setDeleteType}
					// modal={
					// 	<>
					// 		<CreateSkillsModal
					// 			isOpen={createSkillModalOpen}
					// 			setIsOpen={setCreateSkillModalOpen}
					// 			refetch={refetchSkillsData}
					// 		/>
					// 		<UpdateSkillsModal
					// 			isOpen={updateSkillModalOpen}
					// 			setIsOpen={setUpdateSkillModalOpen}
					// 			refetch={refetchSkillsData}
					// 			skillId={skillId}
					// 			skillName={skillName}
					// 		/>
					// 		<DeleteConfirmationModal
					// 			isOpen={deleteConfirmationModalOpen}
					// 			setIsOpen={setDeleteConfirmationModalOpen}
					// 			title='Delete Skill'
					// 			description="Are you sure you want to delete this skill? you can't undo this action"
					// 			deleteFn={
					// 				deleteType === 'single'
					// 					? () => {
					// 							handleSingleSkillDelete.mutate(
					// 								skillId
					// 							)
					// 					  }
					// 					: () => {
					// 							handleMultipleSkillsDelete.mutate(
					// 								selectedSkillId
					// 							)
					// 					  }
					// 			}
					// 		/>
					// 	</>
					// }
				/>
			</div>
		</div>
	)
}
