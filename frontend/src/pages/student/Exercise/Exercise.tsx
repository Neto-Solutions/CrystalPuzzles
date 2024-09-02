import styles from './Exercise.module.scss';
import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Page } from '@shared/ui';
import { DateChanger, Feedback } from '@features';
import { Exercises } from '@widgets';

import { Lesson } from '@shared/api';
import { lessons } from '@shared/const';

interface ExercisePageProps {
	title: string;
}

export default function ExercisePage({ title }: ExercisePageProps) {
	const { id, lesson }: any = useLoaderData();
	const [data, setData] = useState<any>(lesson);

	useEffect(() => {
		// Lesson.get(id).then(setData);
	}, []);

	return (
		<Page title={title}>
			<div className={styles.container}>
				<DateChanger className={styles.date} />
				<Exercises
					data={data.checkList.exercises}
					className={styles.list}
					checked
					disabled
				/>
				<section className={styles.mood_wrapper}>
					<div className={styles.title}>Моё настроение после тренировки</div>
					<div className={styles.icon_wrapper}>
						{[...Array(6)].map((_, i) => (
							<div key={i} className={styles.icon}>
								<img src={require(`../Main/assets/svg/${i}.svg`)} />
							</div>
						))}
					</div>
				</section>
				<div className={styles.reward_wrapper}>
					<span>Мои награды</span>
				</div>
				<Feedback className={styles.feedback} title="Комментарий тренера" />
			</div>
		</Page>
	);
}
