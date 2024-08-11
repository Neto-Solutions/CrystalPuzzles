import styles from './GroupName.module.scss';

export default function CreateForm({ setName }) {
	return (
		<div className={styles.container}>
			<input
				className={styles.input_text}
				type="text"
				placeholder="Название группы"
				onChange={(e) => setName(e.target.value)}
			/>
		</div>
	);
}
