export type ProjectsGridProps<T extends { id: number; name: string }> = {
	datas: T[]
	setUpdateModalOpen?: (value: boolean) => void
	setDeleteConfirmationModalOpen?: (value: boolean) => void
	setItemId?: (value: number) => void
	setItemName?: (value: string) => void
	setItemDescription?: (value: string) => void
	setItemTags?: (value: string[]) => void
	setItemImage?: (value: string) => void
	setSelectedItemId?: (value: number[]) => void
	setDeleteType?: (value: 'single' | 'multiple') => void
}
