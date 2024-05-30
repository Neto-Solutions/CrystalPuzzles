import styles from './FormTitle.module.scss';

export default function FormTitle() {
	return (
		<div className={styles.container}>
			<div className={styles.form_title}>Название группы</div>
			<input className={styles.input_checkbox} type="checkbox" />
		</div>
	);
}
