import styles from './GroupName.module.scss';

export default function CreateForm({ setShowForm }) {
	return (
		<div className={styles.container}>
			<input
				className={styles.input_text}
				type="text"
				placeholder="Название группы"
			/>
			<input
				className={styles.input_checkbox}
				onChange={() => setShowForm((prev) => !prev)}
				type="checkbox"
			/>
		</div>
	);
}
