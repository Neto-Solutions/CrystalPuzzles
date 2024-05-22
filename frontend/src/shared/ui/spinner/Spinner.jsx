import styles from './Spinner.module.scss';
export default function Spinner({ children, isLoading }) {
	return (
		<>
			{isLoading ? (
				<div className={styles.container}>
					<span className={styles.loader}></span>
				</div>
			) : (
				children
			)}
		</>
	);
}
