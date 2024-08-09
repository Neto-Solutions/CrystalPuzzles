import styles from './Train.module.scss';
import { useState, useEffect } from 'react';
import { Page } from '@shared/ui';
import { Link, useLoaderData } from 'react-router-dom';
import moment from 'moment';
import { CalendarButton } from '@features';

export default function TrainPage() {
	const { lessons: data } = useLoaderData();
	const [date, setDate] = useState({
		from: new Date().toISOString(),
		to: new Date().toISOString()
	});

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log(date);
	}, []);

	return (
		<Page title="Мои тренировки">
			<div className={styles.wrapper}>
				{data &&
					data.map((item, index) => {
						return (
							<Link
								to={`/train/${item._id}`}
								key={index}
								className={styles.card}
							>
								<div className={styles.info}>
									<div className={styles.trainer_container}>
										<span className={styles.trainer_title}>Тренер:</span>
										<span className={styles.trainer_content}>
											{item.trainer.surname +
												' ' +
												item.trainer.firstname +
												' ' +
												item.trainer.lastname}
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
			<CalendarButton date={date} setDate={setDate} />
		</Page>
	);
}
