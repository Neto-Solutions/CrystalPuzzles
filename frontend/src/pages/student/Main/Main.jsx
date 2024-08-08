import styles from './Main.module.scss';
import { Page, ScheduleCard } from '@shared/ui';
import { useState } from 'react';
import { Feedback } from '@features/feedback';
import { CardLink, Button } from '@shared/ui';
import { useResize } from '@shared/hooks';
import RewardsPopup from './Reward/Reward';
import { useLoaderData } from 'react-router-dom';

export default function MainPage() {
	const [reward, setReward] = useState(false);
	const { lessons } = useLoaderData();
	const isMobile = useResize('sm');

	return (
		<Page title="Главная страница">
			{reward && <RewardsPopup onHide={() => setReward(false)} />}
			<div className={styles.wrapper}>
				<CardLink
					title={'Мои награды'}
					className={styles.reward_card}
					onClick={() => setReward(true)}
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
					to="/schedule"
					title={'Моё расписание на сегодня'}
					className={styles.schedule_card}
				>
					{!isMobile && <ScheduleCard data={lessons} />}
				</CardLink>

				{isMobile ? (
					<Button title="Написать тренеру" className={styles.btn} />
				) : (
					<>
						<Feedback className={styles.feedback} title="Обратная связь" />
						<Button className={styles.btn} title="Отправить комментарий" />
					</>
				)}
			</div>
		</Page>
	);
}
