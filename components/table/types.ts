import React from 'react'

export type TableProps = {
	title: string
	length: number
	loading: boolean
	headers: readonly { name: string }[]
	datas: { id: number; name: string }[]
	setCreateModalOpen: (value: boolean) => void
	setUpdateModalOpen: (value: boolean) => void
	modal: React.ReactElement
	setSkillId: (value: number) => void
	setSkillName: (value: string) => void
}
