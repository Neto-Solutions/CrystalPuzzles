import styles from './Spinner.module.scss';
export default function Spinner({ children, isLoading, height }: any) {
	return (
		<>
			{isLoading ? (
				<div className={styles.container} style={{ height }}>
					<span className={styles.loader}></span>
				</div>
			) : (
				children
			)}
		</>
	);
}
