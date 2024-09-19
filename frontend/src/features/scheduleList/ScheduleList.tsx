import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from '@shared/api';
import styles from './ScheduleList.module.scss';

export default function ScheduleList({ link }: { link?: string }) {
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		Lesson.get({
			start: moment().add('day', 1).startOf('day').toISOString(),
			end: moment().add('day', 1).endOf('day').toISOString()
		})
			.then(setData)
			.catch();
	}, []);

	return (
		<>
			{data
				? data.map((item: any, index: number) => (
						<Link
							to={link ? link : `/schedule/${item.id}`}
							key={index}
							className={styles.item_container}
						>
							<div className={styles.item}>
								<div className={styles.wrapper}>
									<span className={styles.time}>
										{moment(item.start).format('HH:mm')}
									</span>
									<span> - </span>
									<span className={styles.place}>{item.space.name}</span>
								</div>
								<div className={styles.trainer}>
									Тренер —
									{` ${item.trainer.surname} ${item.trainer.firstname} ${item.trainer.lastname.charAt(0)}.`}
								</div>
							</div>
						</Link>
					))
				: null}
		</>
	);
}
