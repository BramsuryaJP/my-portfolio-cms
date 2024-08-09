import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

interface ImageFallback extends ImageProps {}

export default function ImageFallback({
	className,
	src,
	alt,
	...rest
}: ImageFallback) {
	const [isLoading, setIsLoading] = useState(true)
	const [imgSrc, set_imgSrc] = useState(src)
	const [imgAlt, set_imgAlt] = useState(alt)

	console.log({ isLoading })

	return (
		<>
			{isLoading && (
				<div className={className}>
					<div className='animate-pulse rounded-t-xl h-48 lg:h-44 bg-primaryLight dark:bg-primaryDarkBg'></div>
				</div>
			)}
			<Image
				{...rest}
				src={imgSrc}
				alt={imgAlt}
				className={className}
				onLoadingComplete={(result) => {
					setIsLoading(false)
					if (result.naturalWidth === 0) {
					}
				}}
				onError={() => {}}
			/>
		</>
	)
}
