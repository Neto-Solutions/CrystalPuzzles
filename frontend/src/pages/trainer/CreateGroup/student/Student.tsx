import joinName from 'entities/profile/assets/joinName';
import styles from './Student.module.scss';

export default function Students({ data, setStudents, checked = false }: any) {
	function handleChange() {
		setStudents((prev: any) => {
			if (prev.includes(data)) {
				return prev.filter((item: any) => item !== data);
			} else {
				return [...prev, data];
			}
		});
	}
	return (
		<div className={styles.container}>
			<div className={styles.student_name}>{joinName(data)}</div>
			<div className={styles.checkbox_container}>
				<input
					className={styles.checkbox}
					type="checkbox"
					defaultChecked={checked}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
