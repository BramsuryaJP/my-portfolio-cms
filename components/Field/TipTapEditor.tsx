import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Controller, Control } from 'react-hook-form'
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa'

interface TiptapEditorProps {
	name: string
	control: Control<any>
	defaultValue?: string | null
	error?: string
}

function unescapeHTML(html: string): string {
	const textarea = document.createElement('textarea')
	textarea.innerHTML = html
	return textarea.value
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
	name,
	control,
	defaultValue = '',
	error,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { onChange, value } }) => (
				<TiptapEditorContent
					value={value}
					onChange={onChange}
					error={error}
				/>
			)}
		/>
	)
}

const TiptapEditorContent: React.FC<{
	value: string
	onChange: (value: string) => void
	error?: string
}> = ({ value, onChange, error }) => {
	const unescapedValue = unescapeHTML(value)

	const editor = useEditor({
		extensions: [StarterKit, Underline],
		content: unescapedValue,
		injectCSS: true,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML())
		},
		immediatelyRender: true,
	})

	useEffect(() => {
		if (editor && unescapedValue !== editor.getHTML()) {
			editor.commands.setContent(unescapedValue)
		}
	}, [unescapedValue, editor])

	const toggleFormat = (format: 'bold' | 'italic' | 'underline') => {
		if (!editor) return

		switch (format) {
			case 'bold':
				editor.chain().focus().toggleBold().run()
				break
			case 'italic':
				editor.chain().focus().toggleItalic().run()
				break
			case 'underline':
				editor.chain().focus().toggleUnderline().run()
				break
		}
	}

	return (
		<div>
			<div className='flex space-x-2 mb-0.5 mt-2 text-primaryDark dark:text-white'>
				<button
					type='button'
					onClick={() => toggleFormat('bold')}
					className={`p-2 rounded ${
						editor?.isActive('bold')
							? 'bg-gray-200 dark:bg-gray-700'
							: ''
					}`}
					title='Bold (Ctrl+B)'
				>
					<FaBold size={18} />
				</button>
				<button
					type='button'
					onClick={() => toggleFormat('italic')}
					className={`p-2 rounded ${
						editor?.isActive('italic')
							? 'bg-gray-200 dark:bg-gray-700'
							: ''
					}`}
					title='Italic (Ctrl+I)'
				>
					<FaItalic size={18} />
				</button>
				<button
					type='button'
					onClick={() => toggleFormat('underline')}
					className={`p-2 rounded ${
						editor?.isActive('underline')
							? 'bg-gray-200 dark:bg-gray-700'
							: ''
					}`}
					title='Underline (Ctrl+U)'
				>
					<FaUnderline size={18} />
				</button>
			</div>
			<EditorContent
				editor={editor}
				className={`mt-3 block w-full rounded-lg border-2 bg-primaryLight dark:bg-white/5 py-3 ps-3 pe-11 text-sm/6 text-primaryDark dark:text-white ${
					error
						? 'border-red-500 focus:border-red-500 outline-none'
						: 'border-transparent focus:border-primaryLightBorder dark:focus:border-primaryDarkBorder outline-none'
				}`}
			/>
			{error && <p className='mt-1 text-red-500 text-xs'>{error}</p>}
		</div>
	)
}

export default TiptapEditor
