import Button from '../button/Button';
import styles from './ScheduleCard.module.scss';
import moment from 'moment';
import { useResize } from '@hooks';

export default function ScheduleCard({ data }) {
	const isMobile = useResize('sm');
	return (
		<>
			{data
				? data.map((item, index) => (
						<div key={index} className={styles.item_container}>
							<div className={styles.item}>
								<div className={styles.wrapper}>
									<span className={styles.date}>
										{moment(item.start).format('DD/MM')}
									</span>
									<span> - </span>
									<span className={styles.place}>{item.place.name}</span>
								</div>

								<div className={styles.wrapper}>
									<span className={styles.time}>
										{moment(item.start).format('HH:mm')}
									</span>
									<span> - </span>
									<span className={styles.place}>Группа 5</span>
								</div>
							</div>
							{!isMobile && <Button title="Подробно" className={styles.btn} />}
						</div>
					))
				: null}
		</>
	);
}
