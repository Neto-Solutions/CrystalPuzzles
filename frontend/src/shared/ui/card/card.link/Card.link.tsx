import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Card.link.module.scss';

interface CardLinkProps {
	title: string;
	children?: ReactNode | string;
	to?: any;
	className?: string;
}

export default function CardLink({
	title,
	children,
	to,
	className,
	...props
}: CardLinkProps) {
	const Tag = to ? Link : 'div';
	return (
		<Tag to={to} className={classNames(styles.card, className)} {...props}>
			<h2 className={styles.title}>{title}</h2>
			{children ? <div className={styles.content}>{children}</div> : null}
		</Tag>
	);
}
