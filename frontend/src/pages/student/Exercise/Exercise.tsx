import styles from './Exercise.module.scss';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Page } from '@shared/ui';
import { DateChanger } from '@features';
import { Exercises } from '@widgets';

export default function ExercisePage() {
	const { lessons, id }: any = useLoaderData();
	const [data]: any = useState(lessons.find((item: any) => item._id === id));
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
