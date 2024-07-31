export type CreateSkillsModalProps = {
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
