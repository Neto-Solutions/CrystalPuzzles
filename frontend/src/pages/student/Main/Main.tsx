import styles from './Main.module.scss';
import { Page } from '@shared/ui';
import { Feedback, ScheduleList } from '@features';
import { CardLink, Button } from '@shared/ui';
import { useResize } from '@shared/hooks';
// import { useState } from 'react';

interface MainPageProps {
	title: string;
}

export default function MainPage({ title }: MainPageProps) {
	const isMobile = useResize('sm');

	//TODO: нужен будет рефактор стилей
	return (
		<Page title={title}>
			<div className={styles.wrapper}>
				<CardLink
					to="/reward"
					title={'Мои награды'}
					className={styles.reward_card}
				/>

				<CardLink
					to="/train"
					title={'Мои тренировки'}
					className={styles.train_card}
				>
					{!isMobile && (
						<div className={styles.train_text_container}>
							<span className={styles.train_text}>
								тренер оценил вашу тренировку
							</span>
						</div>
					)}
				</CardLink>

				<CardLink
					title={'Моё расписание на сегодня'}
					className={styles.schedule_card}
					to={'/schedule'}
				>
					{!isMobile && <ScheduleList today />}
				</CardLink>

				{isMobile ? (
					// <Button title="Написать тренеру" className={styles.btn} />
					<CardLink title="Обратная связь" className={styles.btn} />
				) : (
					<>
						<Feedback className={styles.feedback} title="Обратная связь" />
						<Button
							className={styles.btn}
							title="Отправить комментарий"
							bgColor="dark"
						/>
					</>
				)}
			</div>
		</Page>
	);
}
