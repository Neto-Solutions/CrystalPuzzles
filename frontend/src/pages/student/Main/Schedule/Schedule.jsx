import styles from './Schedule.module.scss';
export default function Schedule() {
	const tempArray = Array(2).fill(0);

	return (
		<div className={styles.schedule_container}>
			{tempArray.map((_, index) => (
				<div key={index} className={styles.schedule_item}>
					<span className={styles.shedule_item_time}>12:50</span>
					<span> - </span>
					<span>
						1 площадка, <br /> тренер - Ильина Анастасия
					</span>
				</div>
			))}
		</div>
	);
}
