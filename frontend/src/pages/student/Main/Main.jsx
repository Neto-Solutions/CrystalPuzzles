import styles from './Main.module.scss';
import { Page } from '@shared/ui';
import { useState } from 'react';
import { Feedback } from '@features/feedback';
import { CardLink, Button } from '@shared/ui';
import { useResize } from '@shared/hooks';
import Schedule from './Schedule/Schedule';
import RewardsPopup from './Reward/Reward';

export default function studentMainPage() {
	const [reward, setReward] = useState(false);
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
						<span className={styles.train_text}>
							тренер оценил вашу тренировку
						</span>
					)}
				</CardLink>

				<CardLink
					to="/schedule"
					title={'Моё расписание на сегодня'}
					className={styles.schedule_card}
				>
					{!isMobile && <Schedule />}
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
