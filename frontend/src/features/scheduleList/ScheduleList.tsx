import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from '@shared/api';
import styles from './ScheduleList.module.scss';
import ScheduleRouteTo from '@shared/lib/scheduleRouteTo';

interface ScheduleListProps {
	today?: boolean;
}

export default function ScheduleList({ today }: ScheduleListProps) {
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		getSchedule();
	}, []);

	async function getSchedule() {
		if (!today) {
			const [data, err] = await Lesson.get({});
			if (err) return;
			setData(data);
			return;
		}
		const [data, err] = await Lesson.get({
			start_date: moment().add(1, 'day').startOf('day').toISOString(),
			end_date: moment().add(1, 'day').endOf('day').toISOString()
		});
		if (err) return;
		setData(data);
	}

	return (
		<>
			{data
				? data.map((item: any, index: number) => (
						<Link
							to={ScheduleRouteTo(item.status) + item.id}
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
