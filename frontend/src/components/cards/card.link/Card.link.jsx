import styles from './Card.link.module.scss';
import { Link } from 'react-router-dom';

export default function CardLink({ title, children, to, className }) {
	return (
		<Link to={to} className={styles.card + ' ' + className}>
			<h1 className={styles.title}>{title}</h1>
			{children && <div className={styles.content}>{children}</div>}
		</Link>
	);
}
