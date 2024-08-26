import moment from 'moment';
import { Link } from 'react-router-dom';
import styles from './ScheduleCard.module.scss';
import { useResize } from '@hooks';

export default function ScheduleCard({ data }: any) {
	const isMobile = useResize('sm');
	return (
		<>
			{data
				? data.map((item: any, index: number) => (
						<Link
							to={`/train/${item._id}`}
							key={index}
							className={styles.item_container}
						>
							<div className={styles.item}>
								<div className={styles.wrapper}>
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
						</Link>
					))
				: null}
		</>
	);
}
