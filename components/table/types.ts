import React from 'react'

export type TableProps = {
	title: string
	loading: boolean
	headers: readonly { name: string }[]
	refetch: () => void
	datas: { id: number; name: string }[]
	setCreateModalOpen: (value: boolean) => void
	setUpdateModalOpen: (value: boolean) => void
	setDeleteConfirmationModalOpen: (value: boolean) => void
	modal: React.ReactElement
	setSkillId: (value: number) => void
	setSkillName: (value: string) => void
	selectedSkillId: number[]
	setSelectedSkillId: (value: number[]) => void
	setDeleteType: (value: 'single' | 'multiple') => void
	currentPage: number
	totalPages: number
	limit: number
	totalCount: number
	onNextPage: () => void
	onPrevPage: () => void
	onLimitChange: (limit: number) => void
}
