import styles from './Schedule.table.module.scss';
export default function ScheduleTable() {
	const tempArray = Array.from({ length: 7 }, () => ({
		time: '10:15',
		name: ''
	}));
	return (
		<div className={styles.table}>
			{tempArray.map((item, index) => (
				<div key={index} className={styles.row}>
					<div className={styles.col}>{item.time}</div>
					<div className={styles.col}>{item.name}</div>
				</div>
			))}
		</div>
	);
}
