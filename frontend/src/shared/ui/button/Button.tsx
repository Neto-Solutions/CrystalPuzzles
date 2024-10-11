import classNames from 'classnames';
import styles from './Button.module.scss';

type ButtonColors = 'dark' | 'light';
interface IButtonProps {
	title?: string | boolean;
	downArrow?: boolean;
	children?: React.ReactNode;
	className?: string;
	width?: string;
	height?: string;
	bgColor?: ButtonColors;
	[rest: string]: any;
}

export default function Button({
	title = false,
	children,
	className,
	width,
	height,
	bgColor = 'light',
	...props
}: IButtonProps) {
	const buttonStyles = classNames(styles.btn, styles[bgColor], className);

	return (
		<button
			className={buttonStyles}
			style={{
				width,
				height
			}}
			{...props}
		>
			{title}
			{children ? <>{children}</> : null}
		</button>
	);
}
