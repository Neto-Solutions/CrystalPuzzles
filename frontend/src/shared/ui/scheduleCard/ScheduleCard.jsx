import styles from './ScheduleCard.module.scss';
import moment from 'moment';

export default function ScheduleCard({ data }) {
	return (
		<>
			{data
				? data.map((item, index) => (
						<div key={index} className={styles.item_container}>
							<div className={styles.item}>
								<div className={styles.place_container}>
									<span className={styles.time}>
										{moment(item.start).format('HH:mm')}
									</span>
									<span> - </span>
									<span className={styles.place}>{item.place.name}</span>
								</div>
								<div className={styles.trainer}>
									Тренер -{' '}
									{item.trainer.surname +
										' ' +
										item.trainer.firstname +
										' ' +
										item.trainer.lastname.slice(0, 1) +
										'.'}
								</div>
							</div>
						</div>
					))
				: null}
		</>
	);
}
