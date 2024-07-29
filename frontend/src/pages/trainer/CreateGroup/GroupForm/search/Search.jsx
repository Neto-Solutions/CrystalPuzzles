import styles from './Search.module.scss';
import { getStudents } from '@entities/student';

export default function Search({ setInit }) {
	function handleSearch(e) {
		const value = e.target.value.trim();
		if (!value) return;
		getStudents(value).then((res) => {
			setInit(res);
		});
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
