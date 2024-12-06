import classNames from 'classnames';
import styles from './Title.module.scss';

interface TitleProps {
	children: string;
	className?: string;
	tag?: string;
	isHeading?: boolean;
}

export default function Title({
	children,
	tag,
	className,
	isHeading
}: TitleProps) {
	const H = tag === 'h2' ? 'h2' : 'h1';
	const headingClass = isHeading ? styles.heading : '';

	return (
		<H
			className={classNames(
				className,
				headingClass,
				tag === 'h2' ? styles.h2 : styles.h1
			)}
		>
			{children}
		</H>
	);
}
