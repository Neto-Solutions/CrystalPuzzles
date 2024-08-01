import styles from './Schedule.module.scss';
import { useState, useEffect } from 'react';
import { getAllData } from '@entities/lesson';
import moment from 'moment';

export default function Schedule() {
	const [data, setData] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [err, setErr] = useState(null);

	useEffect(() => {
		getAllData().then(setData).catch(setErr);
	}, []);

	return (
		<>
			{data.length
				? data.map((item, index) => (
						<div key={index} className={styles.item_container}>
							<div className={styles.item}>
								<div className={styles.place_container}>
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
						</div>
					))
				: null}
		</>
	);
}
