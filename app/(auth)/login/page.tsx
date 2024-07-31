'use client'

import { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginFn } from '@/api/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '@/lib/helper/ReactToastifyHelper'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setStatus, setUser } from '@/lib/features/UserSlices'

// Define the schema for form validation
const loginSchema = z.object({
	usernameOrEmail: z.string().min(1, 'Username or Email is required'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Infer the TypeScript type from the schema
type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
	// state
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	// global state / redux
	const dispatch = useAppDispatch()
	const userData = useAppSelector((state) => state.user.data)
	const userDataStatus = useAppSelector((state) => state.user.status)

	// router
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	})

	const handleLogin = useMutation({
		mutationFn: (data: LoginFormData) => loginFn(data),
		onMutate() {
			setLoading(true)
		},
		onSuccess: (res) => {
			showToast('success', res.message)
			const userData = {
				username: res.username,
				email: res.email,
			}
			dispatch(setUser(userData))
			router.push('/')
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				showToast('error', error.response.data.message)
				setLoading(false)
			}
		},
		onSettled: () => {
			setLoading(false)
		},
	})

	const onSubmit: SubmitHandler<LoginFormData> = (data) => {
		handleLogin.mutate(data)
	}

	const togglePasswordVisibility = (): void => {
		setShowPassword(!showPassword)
	}

	useEffect(() => {
		if (userDataStatus === 'succeeded' && userData !== null) {
			router.back()
		}
	}, [userDataStatus, userData])

	if (userDataStatus === 'loading' || userDataStatus === 'idle') {
		return null
	}

	if (userData === null) {
		return (
			<div className='h-full flex items-center justify-center p-4'>
				<div className='max-w-lg p-8 w-full rounded-xl bg-primaryLight/5 border-primaryLightBorder border shadow-sm dark:border-none dark:shadow-none dark:bg-primaryDark/60'>
					<p className='text-primaryDark dark:text-white font-bold text-3xl'>
						Sign In
					</p>
					<p className='text-md mt-2 text-primaryDark dark:text-white'>
						Input your email and password to access the CMS
					</p>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='mt-5 flex flex-col gap-5'
					>
						<div>
							<label className='text-sm/6 font-medium text-primaryDark dark:text-white'>
								Username or Email
							</label>
							<input
								{...register('usernameOrEmail')}
								className={`
                    mt-3 block w-full rounded-lg border-2 bg-primaryLight dark:bg-white/5 py-3 ps-3 pe-11 text-sm/6 text-primaryDark dark:text-white
                    ${
						errors.usernameOrEmail
							? 'border-red-500 focus:border-red-500 outline-none'
							: 'border-transparent focus:border-primaryLightBorder dark:focus:border-primaryDarkBorder outline-none'
					}`}
							/>
							{errors.usernameOrEmail && (
								<p className='mt-1 text-red-500 text-xs'>
									{errors.usernameOrEmail.message}
								</p>
							)}
						</div>
						<div>
							<label className='text-sm/6 font-medium text-primaryDark dark:text-white'>
								Password
							</label>
							<div className='relative'>
								<input
									{...register('password')}
									type={showPassword ? 'text' : 'password'}
									className={`
                      mt-3 block w-full rounded-lg border-2 bg-primaryLight dark:bg-white/5 py-3 ps-3 pe-11 text-sm/6 text-primaryDark dark:text-white
                      ${
							errors.password
								? 'border-red-500 focus:border-red-500 outline-none'
								: 'border-transparent focus:border-primaryLightBorder dark:focus:border-primaryDarkBorder outline-none'
						}`}
								/>
								<button
									type='button'
									onClick={togglePasswordVisibility}
									className='absolute inset-y-0 right-0 pr-3 flex items-center text-primaryDark dark:text-white'
								>
									{showPassword ? (
										<FaRegEyeSlash className='h-5 w-5' />
									) : (
										<FaRegEye className='h-5 w-5' />
									)}
								</button>
							</div>
							{errors.password && (
								<p className='mt-1 text-red-500 text-xs'>
									{errors.password.message}
								</p>
							)}
						</div>
						<button
							type='submit'
							className='mt-3 rounded-lg bg-secondary py-3 px-4 text-base font-medium text-white data-[hover]:bg-secondary/60 data-[active]:bg-secondary/80 disabled:bg-secondary/60'
							disabled={loading}
						>
							Sign In
						</button>
					</form>
				</div>
			</div>
		)
	}
}
