import { useLocation } from 'react-router-dom';
import styles from './Exercise.module.scss';
import { Page } from '@shared/ui';
import { useEffect, useState } from 'react';
import { getDataById } from '@entities/schedule';

export default function ExercisePage() {
	const [data, setData] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [err, setErr] = useState(null);
	const { pathname } = useLocation();

	useEffect(() => {
		getDataById(pathname.split('/').pop()).then(setData).catch(setErr);
	}, [pathname]);

	return (
		<Page title="Мои занятия">
			<div className={styles.container}>
				<div className={styles.date_picker}>
					{new Date().toLocaleDateString()}
				</div>
				<ul className={styles.list}>
					{data &&
						data.exercises.map((item, index) => (
							<li key={index} className={styles.item}>
								<div className={styles.number}>{index + 1}</div>
								<img className={styles.img} />
								<span className={styles.text}>{item.name}</span>
								<input
									className={styles.checkbox}
									type="checkbox"
									checked={item.isComplete}
								/>
							</li>
						))}
				</ul>
			</div>
		</Page>
	);
}
