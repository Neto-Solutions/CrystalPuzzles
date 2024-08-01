import styles from './Train.module.scss';
import { useEffect, useState } from 'react';
import { Page, Spinner } from '@shared/ui';
import { Link } from 'react-router-dom';
import { getAllData } from '@entities/lesson';
import moment from 'moment';

export default function TrainPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [err, setErr] = useState(null);

	useEffect(() => {
		getAllData(moment().startOf('week').toISOString(), 7)
			.then(setData)
			.then(() => setIsLoading(false))
			.catch(setErr);
	}, []);

	return (
		<Page title="Мои тренировки">
			<div className={styles.wrapper}>
				<Spinner isLoading={isLoading} height="100%">
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
										<div className={styles.comment_container}>
											<span className={styles.comment}>
												{'"' + item.trainer_comment + '"'}
											</span>
										</div>
									</div>
									<div className={styles.date}>
										{moment(item.start).format('DD.MM.YYYY')}
									</div>
								</Link>
							);
						})}
				</Spinner>
			</div>
		</Page>
	);
}
