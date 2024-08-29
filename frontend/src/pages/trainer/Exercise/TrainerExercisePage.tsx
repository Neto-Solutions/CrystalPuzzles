import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { DateChanger, Feedback } from '@features';
import { Exercises } from '@widgets';
import { Button, EmojiCard, Page } from '@shared/ui';
import styles from './TrainerExercisePage.module.scss';

export default function TrainerExercisePage() {
	const { lessons }: any = useLoaderData();

	return (
		<Page title="Занятия">
			<div className={styles.container}>
				<DateChanger className={styles.date} />
				<Exercises
					data={lessons}
					className={styles.exercises}
					checked
					disabled
				/>
				<Button
					title="Выберите учеников"
					downArrow
					width="100%"
					className={styles.btn}
				/>
				<Feedback title="Оставить комментарий" className={styles.feedback} />
				<div className={styles.wrapper}>
					<EmojiCard className={styles.emoji} />
					<Button title="Отправить комментарий" />
				</div>
			</div>
		</Page>
	);
}
