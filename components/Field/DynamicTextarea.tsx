import React, { useRef, useEffect, ChangeEvent } from 'react'

interface DynamicTextareaProps {
	value: string
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
	error?: string
	[key: string]: any // For any additional props
}

export const DynamicTextarea: React.FC<DynamicTextareaProps> = ({
	value,
	onChange,
	error,
	...props
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const adjustHeight = () => {
		const textarea = textareaRef.current
		if (textarea) {
			textarea.style.height = 'auto'
			textarea.style.height = `${textarea.scrollHeight}px`
		}
	}

	useEffect(() => {
		adjustHeight()
	}, [value])

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e)
		adjustHeight()
	}

	return (
		<textarea
			ref={textareaRef}
			value={value}
			onChange={handleChange}
			className={`
        mt-3 block w-full rounded-lg border-2 bg-primaryLight dark:bg-white/5 py-3 ps-3 pe-11 text-sm/6 text-primaryDark dark:text-white
        ${
			error
				? 'border-red-500 focus:border-red-500 outline-none'
				: 'border-transparent focus:border-primaryLightBorder dark:focus:border-primaryDarkBorder outline-none'
		}
      `}
			style={{ minHeight: '6rem', resize: 'none', overflow: 'hidden' }}
			{...props}
		/>
	)
}
