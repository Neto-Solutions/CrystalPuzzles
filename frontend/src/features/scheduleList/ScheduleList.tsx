import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from '@shared/api';
import styles from './ScheduleList.module.scss';
import ScheduleRouteTo from '@shared/lib/scheduleRouteTo';
import { selectProfile } from '@app/providers/store/profile';
import { useSelector } from 'react-redux';

interface ScheduleListProps {
	today?: boolean;
	link?: boolean;
}

export default function ScheduleList({
	today,
	link = true
}: ScheduleListProps) {
	const profile = useSelector(selectProfile);
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		getSchedule();
	}, []);

	async function getSchedule() {
		if (!today) {
			const [data, err] = await Lesson.get({
				start_date: moment().startOf('day').toISOString(),
				trainer: profile.role === 'trainer' ? profile.id : undefined
			});
			if (err) return;
			setData(data);
			return;
		}
		const [data, err] = await Lesson.get({
			start_date: moment().startOf('day').toISOString(),
			end_date: moment().endOf('day').toISOString(),
			trainer: profile.role === 'trainer' ? profile.id : undefined
		});
		if (err) return;
		setData(data);
	}
	const Tag: any = link ? Link : 'div';
	return (
		<>
			{data
				? data.map((item: any, index: number) => (
						<Tag
							{...(link ? { to: ScheduleRouteTo(item.status) + item.id } : {})}
							// to={ScheduleRouteTo(item.status) + item.id}
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
									{` ${item.trainer.surname} ${item.trainer.firstname} ${item.trainer.lastname?.charAt(0) || ''}.`}
								</div>
							</div>
						</Tag>
					))
				: null}
		</>
	);
}
