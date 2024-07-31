// Example usage
export type TableProps = {
	title: string
	length: number
	loading: boolean
	headers: readonly { name: string }[]
	datas: { id: number; name: string }[]
}
