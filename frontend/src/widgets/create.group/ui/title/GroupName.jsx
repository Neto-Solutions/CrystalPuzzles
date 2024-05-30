import styles from './GroupName.module.scss';

export default function CreateForm() {
	return (
		<div className={styles.input_container}>
			<input
				className={styles.input_text}
				type="text"
				placeholder="Название группы"
			/>
			<input className={styles.input_checkbox} type="checkbox" />
		</div>
	);
}
