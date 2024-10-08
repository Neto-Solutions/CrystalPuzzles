import styles from './Exercise.module.scss';
import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Page } from '@shared/ui';
import { DateChanger, Feedback } from '@features';
import { Exercises } from '@widgets';
import classNames from 'classnames';
import { Lesson } from '@shared/api';

interface ExercisePageProps {
	title: string;
}

export default function ExercisePage({ title }: ExercisePageProps) {
	const { id }: any = useLoaderData();
	const [data, setData] = useState<any>();
	const [exercises, setExercises] = useState<any>([]);

	useEffect(() => {
		getLessons();
	}, [id]);

	async function getLessons() {
		const [data, err] = await Lesson.getById(id);
		if (err) return;
		setData(data);
		setExercises(
			data?.check[0]?.training_data.map((item: any) => ({
				...item,
				name: item.training.name
			}))
		);
	}

	return (
		<Page title={title}>
			<div className={styles.container}>
				<DateChanger className={styles.date} />
				{exercises.length ? (
					<Exercises
						data={exercises.map((item: any) => ({
							...item,
							name: item.training.name
						}))}
						className={styles.list}
						checked
						disabled
					/>
				) : null}
				<section className={styles.mood_wrapper}>
					<div className={styles.title}>Моё настроение после тренировки</div>
					<div className={styles.icon_wrapper}>
						{[...Array(6)].map((_, i) => (
							<div key={i} className={classNames(styles.icon)}>
								<img
									src={require(`../Main/assets/svg/${i}.svg`)}
									className={styles.img}
								/>
							</div>
						))}
					</div>
				</section>
				<div className={styles.reward_wrapper}>
					<span>{data.award || 'Мои награды'}</span>
				</div>
				<Feedback className={styles.feedback} title="Комментарий тренера" />
			</div>
		</Page>
	);
}
