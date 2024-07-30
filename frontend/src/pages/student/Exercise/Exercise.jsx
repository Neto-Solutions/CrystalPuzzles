import { useLocation } from 'react-router-dom';
import styles from './Exercise.module.scss';
import { Page } from '@shared/ui';
import { useEffect, useState } from 'react';
import { getDataById } from '@entities/schedule';
import { DateChanger } from '../../../features/DateChanger/DateChanger';
import exerciseOneIcon from '../../../shared/assets/exercise/1.svg';
import ExerciseItem from '../../../shared/ui/ExerciseItem/ExerciseItem';

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
				<DateChanger className={styles.date} />
				<ul className={styles.list}>
					{data &&
						data.exercises.map(eckbox}
									type="checkbox"
									checked={item.isComplete}
								/>(item, index) => (
							<li key={index} className={styles.item}>
								<div className={styles.number}>{index + 1}</div>
								<img className={styles.img} />
								<span className={styles.text}>{item.name}</span>
								<input
									className={styles.ch
							</li>
						))}
					{tempArray.map((item, index) => (
						<ExerciseItem
							key={item}
							text={'какое-то упражнение'}
							id={index + 1}
							img={exerciseOneIcon}
						/>
					))}
				</ul>
			</div>
		</Page>
	);
}
