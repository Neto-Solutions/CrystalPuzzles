import styles from './Student.module.scss';

export default function Students() {
	return (
		<div className={styles.container}>
			<div className={styles.student_name}>ФИО ученика</div>
			<div className={styles.checkbox_container}>
				<input className={styles.checkbox} type="checkbox" />
			</div>
		</div>
	);
}
