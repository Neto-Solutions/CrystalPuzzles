import React from 'react';
import styles from './Button.module.scss';

export default function Button({
	className,
	children,
	onClick,
	type = 'button'
}) {
	return (
		<button
			className={`${className} ${styles.btn}`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
