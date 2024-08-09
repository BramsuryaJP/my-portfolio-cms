export type CreateModalProps = {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
	refetch: () => void
}

export type UpdateSkillsModalProps = {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
	refetch: () => void
	skillId: number | null
	skillName: string
}

export type DeleteConfirmationModalProps = {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
	title: string
	description: string
	deleteFn: () => void
}

export type UpdateProjectsModalProps = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	refetch: () => void
	projectId: number
	projectName: string
	projectDescription: string
	projectTags: string[]
	projectImage: string
}
