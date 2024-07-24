import styles from './Train.module.scss';
import { useEffect, useState } from 'react';
import { Page } from '@shared/ui';
import { Link } from 'react-router-dom';
import { getAllData } from '@entities/schedule';

export default function TrainPage() {
	const [data, setData] = useState([]);
	const [err, setErr] = useState(null);

	useEffect(() => {
		getAllData().then(setData).catch(setErr);
	}, []);

	return (
		<Page title="Мои тренировки">
			{data.map((item, index) => {
				return (
					<Link to="/exercise" key={index} className={styles.card}>
						<div className={styles.info}>
							<div className={styles.name}>{item.name}</div>
							<div className={styles.trainer}>
								<span className={styles.trainer_title}>Тренер:</span>
								{item.trainer.surname +
									' ' +
									item.trainer.firstname +
									' ' +
									item.trainer.lastname}
							</div>
							<div className={styles.combination}>
								<span className={styles.combination_title}>Комбинация 1</span>
								{item.combination}
							</div>
						</div>
						<div className={styles.date}>{item.date}</div>
					</Link>
				);
			})}
		</Page>
	);
}
