import styles from './Card.link.module.scss';
import { Link } from 'react-router-dom';

export default function CardLink({ title, children, to, className, ...props }) {
	const Tag = to ? Link : 'div';
	return (
		<Tag to={to} className={styles.card + ' ' + className} {...props}>
			<h2 className={styles.title}>{title}</h2>
			{children && <div className={styles.content}>{children}</div>}
		</Tag>
	);
}
