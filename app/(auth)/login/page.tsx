'use client'

import { useState } from 'react'
import { Button, Field, Input, Label } from '@headlessui/react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

export default function Login(): JSX.Element {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const togglePasswordVisibility = (): void => {
		setShowPassword(!showPassword)
	}

	return (
		<div className='h-full flex items-center justify-center'>
			<div className='max-w-lg p-8 w-full rounded-xl bg-primaryLight/60 dark:bg-primaryDark/60'>
				<p className='text-primaryDark dark:text-white font-bold text-3xl'>
					Sign In
				</p>
				<p className='text-md mt-2'>
					Input your username/email and password to access the CMS
				</p>
				<form className='mt-5 flex flex-col gap-5'>
					<Field>
						<Label className='text-sm/6 font-medium text-white'>
							Username / Email
						</Label>
						<Input
							className={`
                mt-3 block w-full rounded-lg border-none bg-white/5 py-3 px-3 text-sm/6 text-white
                focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`}
						/>
					</Field>
					<Field>
						<Label className='text-sm/6 font-medium text-white'>
							Password
						</Label>
						<div className='relative'>
							<Input
								type={showPassword ? 'text' : 'password'}
								className={`
                  mt-3 block w-full rounded-lg border-none bg-white/5 py-3 ps-3 pe-11 text-sm/6 text-white
                  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`}
							/>
							<Button
								type='button'
								onClick={togglePasswordVisibility}
								className='absolute inset-y-0 right-0 pr-3 flex items-center text-white'
							>
								{showPassword ? (
									<FaRegEyeSlash className='h-5 w-5' />
								) : (
									<FaRegEye className='h-5 w-5' />
								)}
							</Button>
						</div>
					</Field>
					<Button className='mt-3 rounded-lg bg-secondary py-3 px-4 text-base font-medium text-white data-[hover]:bg-secondary/60 data-[active]:bg-secondary/80'>
						Sign In
					</Button>
				</form>
			</div>
		</div>
	)
}
