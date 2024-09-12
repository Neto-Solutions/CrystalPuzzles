import styles from './Train.module.scss';
import { useState } from 'react';
import { Page } from '@shared/ui';
import { Link, useLoaderData } from 'react-router-dom';
import moment from 'moment';
import { CalendarButton } from '@features';

interface TrainPageProps {
	title: string;
}

export default function TrainPage({ title }: TrainPageProps) {
	const { lessons }: any = useLoaderData();
	const [data] = useState<any>(lessons);
	const [date, setDate]: any = useState({
		from: new Date().toISOString(),
		to: new Date().toISOString()
	});
	// useEffect(() => {
	// 	Lesson.get({ start: date.from, end: date.to }).then(setData);
	// }, [date]);

	return (
		<Page title={title}>
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
											{item.place.name}
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
