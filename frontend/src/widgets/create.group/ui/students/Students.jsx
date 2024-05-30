import styles from './Students.module.scss';


export default function Students() {

	
	return (
		<div className={styles.container}>
			<div className={styles.fullname}>
				ФИО ученика
			</div>
			<input
				className={styles.input_checkbox}
				type='checkbox'
			/>
		</div>

	);
}