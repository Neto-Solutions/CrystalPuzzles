import styles from './Search.module.scss';

export default function Search({ setInit} : any) {
	function handleSearch(e: any) {
		setInit(e.target.value);
	}

	return (
		<div className={styles.container}>
			<input
				className={styles.input_text}
				type="text"
				placeholder="Дмитриева Мария"
				onChange={handleSearch}
			/>
		</div>
	);
}
