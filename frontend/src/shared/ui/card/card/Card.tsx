import styles from './Card.module.scss';
export default function Card({ children, className, ...props }) {
	return (
		<div className={styles.card + ' ' + className} {...props}>
			{children}
		</div>
	);
}
