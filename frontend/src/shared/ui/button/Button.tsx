import styles from './Button.module.scss';
import { ReactComponent as DownArrow } from '@shared/assets/svg/arrow.svg';

interface IButtonProps {
	title?: string | boolean;
	downArrow?: boolean;
	children?: React.ReactNode;
	className?: string;
	width?: string;
	height?: string;
	[rest: string]: any;
}

export default function Button({
	title = false,
	downArrow = false,
	children,
	className,
	width,
	height,
	...props
}: IButtonProps) {
	return (
		<button
			className={`${styles.btn} ${className}`}
			style={{
				width,
				height
			}}
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
