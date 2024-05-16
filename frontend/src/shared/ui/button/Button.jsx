import React from 'react';
import styles from './Button.module.scss';
import { ReactComponent as DownArrow } from '@shared/assets/svg/arrow.svg';

export default function Button({
	title = false,
	downArrow = false,
	children,
	className,
	width,
	height,
	...props
}) {
	return (
		<button
			className={`${styles.btn} ${className}`}
			style={{ width, height }}
			{...props}
		>
			{downArrow ? (
				<>
					{title}
					{<DownArrow />}
				</>
			) : (
				<>
					{title}
					{children}
				</>
			)}
		</button>
	);
}
