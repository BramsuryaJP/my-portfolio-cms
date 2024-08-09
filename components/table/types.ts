import React from 'react'

export type TableProps<T extends { id: number; name: string }> = {
	title: string
	loading?: boolean
	headers: readonly { name: string; key: keyof T | 'action' }[]
	refetch?: () => void
	datas?: T[]
	setCreateModalOpen?: (value: boolean) => void
	setUpdateModalOpen?: (value: boolean) => void
	setDeleteConfirmationModalOpen?: (value: boolean) => void
	modal?: React.ReactElement
	setItemId?: (value: number) => void
	setItemName?: (value: string) => void
	setItemDescription?: (value: string) => void
	setItemTags?: (value: string[]) => void
	setItemImage?: (value: string) => void
	selectedItemId?: number[]
	setSelectedItemId?: (value: number[]) => void
	setDeleteType?: (value: 'single' | 'multiple') => void
	currentPage?: number
	totalPages?: number
	limit?: number
	totalCount?: number
	onNextPage?: () => void
	onPrevPage?: () => void
	onLimitChange?: (limit: number) => void
	tableLayout?: boolean
	setTableLayout?: (value: boolean) => void
	gridLayout?: boolean
	setGridLayout?: (value: boolean) => void
	gridComponent?: React.ReactElement
}
