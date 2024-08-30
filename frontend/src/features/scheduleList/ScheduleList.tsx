import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ScheduleList.module.scss';
import { Lesson } from '@shared/api';

export default function ScheduleList() {
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		Lesson.get({}).then(setData).catch();
	}, []);

	return (
		<>
			{data
				? data.map((item: any, index: number) => (
						<Link
							to={`/schedule/${item.id}`}
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
