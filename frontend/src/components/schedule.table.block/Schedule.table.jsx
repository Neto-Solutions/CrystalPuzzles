import styles from './Schedule.table.module.scss';
export default function ScheduleTable() {
	const tempArray = Array.from({ length: 7 }, () => ({
		time: '10:15',
		name: ''
	}));
	return (
		<div className={styles.table}>
			{tempArray.map((item, index) => (
				<div key={index} className={styles.table_row}>
					<div className={styles.table_col}>{item.time}</div>
					<div className={styles.table_col}>{item.name}</div>
				</div>
			))}
		</div>
	);
}
