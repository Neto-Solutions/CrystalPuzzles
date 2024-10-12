import styles from './Train.module.scss';
import { useEffect, useState } from 'react';
import { Page } from '@shared/ui';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { CalendarButton } from '@features';
import { Lesson } from '@shared/api';

interface TrainPageProps {
	title: string;
}

export default function TrainPage({ title }: TrainPageProps) {
	const [data, setData] = useState<any>();
	const [date, setDate]: any = useState({
		from: moment().startOf('week').startOf('day'),
		to: moment().endOf('day')
	});
	useEffect(() => {
		getLessons();
	}, [date]);

	async function getLessons() {
		const [data, err] = await Lesson.get({
			start_date: date.from.toISOString(),
			end_date: date.to.toISOString()
		});
		if (err) return;
		setData(data);
	}

	return (
		<Page title={title} className={styles.container}>
			<div className={styles.wrapper}>
				{data &&
					data.map((item: any, index: number) => {
						return (
							<Link
								to={`/train/${item.id}`}
								key={index}
								className={styles.card}
							>
								<div className={styles.info}>
									<div className={styles.trainer_container}>
										<span className={styles.trainer_title}>Тренер:</span>
										<span className={styles.trainer_content}>
											{item.trainer.firstname}
										</span>
									</div>
									<div className={styles.place_container}>
										<span className={styles.place_title}>Место:</span>
										<span className={styles.place_content}>
											{item.space.name}
										</span>
									</div>
								</div>
								<div className={styles.date}>
									{moment(item.start).format('DD.MM.YYYY')}
								</div>
							</Link>
						);
					})}
			</div>
			<CalendarButton date={date} setDate={setDate} range />
		</Page>
	);
}
