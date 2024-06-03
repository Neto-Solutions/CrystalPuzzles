import styles from './Search.module.scss';

export default function Search() {
	return (
		<div className={styles.container}>
			<input
				className={styles.input_text}
				type="text"
				placeholder="Дмитриева Мария"
			/>
		</div>
	);
}
