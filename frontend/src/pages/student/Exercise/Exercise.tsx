import styles from './Exercise.module.scss';
import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Page } from '@shared/ui';
import { DateChanger } from '@features';
import { Exercises } from '@widgets';

import { Lesson } from '@shared/api';

export default function ExercisePage() {
	const [data, setData] = useState<any>();
	const { id }: any = useLoaderData();

	useEffect(() => {
		Lesson.get(id).then(setData);
	}, []);

	return (
		<Page title="Мои занятия">
			<div className={styles.container}>
				<DateChanger className={styles.date} />
				<Exercises
					data={data.checkList.exercises}
					className={styles.list}
					checked
					disabled
				/>
				<div className={styles.reward_wrapper}>
					<span>Мои награды</span>
				</div>
			</div>
		</Page>
	);
}
