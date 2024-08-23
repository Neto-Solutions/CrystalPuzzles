import styles from './DaysOfWeek.module.scss';

export default function DaysOfWeek() {
	const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

	return (
		<div className={styles.container}>
			{daysOfWeek.map((day, index: number) => {
				return (
					<div key={index} className={styles.day}>
						{day}
					</div>
				);
			})}
		</div>
	);
}
