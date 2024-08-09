import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react'
import { DeleteConfirmationModalProps } from './types'

export default function DeleteConfirmationModal({
	isOpen,
	setIsOpen,
	title,
	description,
	deleteFn,
}: DeleteConfirmationModalProps) {
	return (
		<>
			<Dialog
				open={isOpen}
				as='div'
				className='relative z-40 focus:outline-none'
				onClose={() => {}}
			>
				<DialogBackdrop className='fixed inset-0 bg-black/40 backdrop-blur-[7px]' />

				<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4'>
						<DialogPanel
							transition
							className='w-full max-w-md rounded-xl bg-primaryLight/80 dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
						>
							<DialogTitle
								as='h3'
								className='text-xl/7 font-medium text-primaryDark dark:text-white'
							>
								{title}
							</DialogTitle>

							<div className='mt-4'>{description}</div>

							<div className='flex w-full gap-5 mt-5'>
								<button
									type='button'
									className='w-full rounded-lg bg-red-500 py-3 px-4 text-base font-medium text-white hover:bg-red-500/60 active:bg-red-500/80 disabled:bg-red-500/60'
									onClick={() => {
										setIsOpen(false)
									}}
								>
									Cancel
								</button>
								<button
									onClick={() => {
										deleteFn()
									}}
									className='w-full rounded-lg bg-secondary py-3 px-4 text-base font-medium text-white hover:bg-secondary/60 active:bg-secondary/80 disabled:bg-secondary/60'
								>
									Confirm Delete
								</button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	)
}
