import styles from './Exercise.module.scss';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Page } from '@shared/ui';
import { DateChanger } from '@features/DateChanger/DateChanger';
import ExerciseItem from '@shared/ui/ExerciseItem/ExerciseItem';

export default function ExercisePage() {
	const { lessons, id } = useLoaderData();
	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState(lessons.find((item) => item._id === id));

	return (
		<Page title="Мои занятия">
			<div className={styles.container}>
				<DateChanger className={styles.date} />
				<ul className={styles.list}>
					{data &&
						data.checkList.exercises.map((item, index) => (
							<ExerciseItem
								key={item._id}
								text={item.name}
								id={index + 1}
								img={item.img}
								defaultChecked={item.isComplete}
								disabled
							/>
						))}
				</ul>
				<div className={styles.reward_wrapper}>
					<span>Мои награды</span>
				</div>
			</div>
		</Page>
	);
}
