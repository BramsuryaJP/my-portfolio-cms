import React, { useRef, useEffect, ChangeEvent } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface DynamicTextareaProps {
	value?: string
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
	error?: string
	register?: UseFormRegisterReturn
	[key: string]: any // For any additional props
}

export const DynamicTextarea: React.FC<DynamicTextareaProps> = ({
	value: propValue,
	onChange: propOnChange,
	error,
	register,
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
	}, [propValue])

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (propOnChange) propOnChange(e)
		if (register?.onChange) register.onChange(e)
		adjustHeight()
	}

	// Determine which props to spread
	const textareaProps = register ? { ...register, ...props } : props

	// Use ref from register if available, otherwise use local ref
	const refToUse = register?.ref || textareaRef

	return (
		<textarea
			ref={refToUse}
			value={propValue}
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
			{...textareaProps}
		/>
	)
}
