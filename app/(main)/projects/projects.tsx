'use client'

import {
	deleteMultipleProjectsFn,
	deleteSingleProjectFn,
	getProjectsFn,
} from '@/api/projects'
import InformationCard from '@/components/card/InformationCard'
import { ProjectsGrid } from '@/components/grid/ProjectsGrid'
import DeleteConfirmationModal from '@/components/Modal/DeleteConfirmationModal'
import CreateProjectsModal from '@/components/Modal/Projects/CreateProjectsModal'
import UpdateProjectsModal from '@/components/Modal/Projects/UpdateProjectsModal'
import { Table } from '@/components/table'
import { showToast } from '@/lib/helper/ReactToastifyHelper'
import { ProjectsTableHeader } from '@/lib/tableHeader'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'

export default function Projects() {
	const [tableLayout, setTableLayout] = useState(true)
	const [gridLayout, setGridLayout] = useState(false)

	// skill modal open state
	const [createSkillModalOpen, setCreateSkillModalOpen] = useState(false)
	const [updateSkillModalOpen, setUpdateSkillModalOpen] = useState(false)
	const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
		useState(false)

	// skill delete type state
	const [deleteType, setDeleteType] = useState<'single' | 'multiple'>(
		'single'
	)

	// projects state
	const [projectId, setProjectId] = useState(0)
	const [projectName, setProjectName] = useState('')
	const [projectEnglishDescription, setProjectEnglishDescription] =
		useState('')
	const [projectIndonesianDescription, setProjectIndonesianDescription] =
		useState('')
	const [projectTags, setProjectTags] = useState<string[]>([])
	const [projectImage, setProjectImage] = useState('')
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

	const handleSingleSkillDelete = useMutation({
		mutationFn: (id: number) => deleteSingleProjectFn(id),
		onMutate() {},
		onSuccess: (res) => {
			showToast('success', res.message)
			setDeleteConfirmationModalOpen(false)
			if (
				res.skill &&
				res.skill.id &&
				selectedProjectId.includes(res.skill.id)
			) {
				setSelectedProjectId(
					selectedProjectId.filter((id) => id !== res.skill.id)
				)
			}
			refetchProjectsData()
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				showToast('error', error.response?.data?.message)
				setDeleteConfirmationModalOpen(false)
			}
		},
	})

	const handleMultipleSkillsDelete = useMutation({
		mutationFn: (ids: number[]) => deleteMultipleProjectsFn(ids),
		onMutate() {},
		onSuccess: (res) => {
			showToast('success', res.message)
			setDeleteConfirmationModalOpen(false)
			refetchProjectsData()
			setSelectedProjectId([])
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				showToast('error', error.response?.data?.message)
			}
			setDeleteConfirmationModalOpen(false)
		},
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
				<Table<{
					id: number
					name: string
					tags: string[]
					image: string
					descriptionEn: string
					descriptionIna: string
				}>
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
					gridComponent={
						<ProjectsGrid<{
							id: number
							name: string
							tags: string[]
							descriptionEn: string
							descriptionIna: string
							image: string
						}>
							datas={allProjectsData?.data}
							setUpdateModalOpen={setUpdateSkillModalOpen}
							setDeleteConfirmationModalOpen={
								setDeleteConfirmationModalOpen
							}
							setItemId={setProjectId}
							setItemName={setProjectName}
							setItemEnglishDescription={
								setProjectEnglishDescription
							}
							setItemIndonesianDescription={
								setProjectIndonesianDescription
							}
							setItemTags={setProjectTags}
							setItemImage={setProjectImage}
							setSelectedItemId={setSelectedProjectId}
							setDeleteType={setDeleteType}
						/>
					}
					setCreateModalOpen={setCreateSkillModalOpen}
					setUpdateModalOpen={setUpdateSkillModalOpen}
					setDeleteConfirmationModalOpen={
						setDeleteConfirmationModalOpen
					}
					setItemId={setProjectId}
					setItemName={setProjectName}
					setItemEnglishDescription={setProjectEnglishDescription}
					setItemIndonesianDescription={
						setProjectIndonesianDescription
					}
					setItemTags={setProjectTags}
					setItemImage={setProjectImage}
					selectedItemId={selectedProjectId}
					setSelectedItemId={setSelectedProjectId}
					setDeleteType={setDeleteType}
					modal={
						<>
							<CreateProjectsModal
								isOpen={createSkillModalOpen}
								setIsOpen={setCreateSkillModalOpen}
								refetch={refetchProjectsData}
							/>
							<UpdateProjectsModal
								isOpen={updateSkillModalOpen}
								setIsOpen={setUpdateSkillModalOpen}
								refetch={refetchProjectsData}
								projectId={projectId}
								projectName={projectName}
								projectEnglishDescription={
									projectEnglishDescription
								}
								projectIndonesianDescription={
									projectIndonesianDescription
								}
								projectTags={projectTags}
								projectImage={projectImage}
							/>
							<DeleteConfirmationModal
								isOpen={deleteConfirmationModalOpen}
								setIsOpen={setDeleteConfirmationModalOpen}
								title='Delete Project'
								description="Are you sure you want to delete this project? you can't undo this action"
								deleteFn={
									deleteType === 'single'
										? () => {
												handleSingleSkillDelete.mutate(
													projectId
												)
										  }
										: () => {
												handleMultipleSkillsDelete.mutate(
													selectedProjectId
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
