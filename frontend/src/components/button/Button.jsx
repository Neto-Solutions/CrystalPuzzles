import React from 'react';
import styles from './Button.module.scss';
import { ReactComponent as DownArrow } from '@assets/svg/calendar_arrow_down.svg';

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
			{title ? (
				<>
					{title}
					{downArrow && <DownArrow />}
				</>
			) : (
				<>{children}</>
			)}
		</button>
	);
}
