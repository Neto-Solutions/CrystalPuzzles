import styles from './Main.page.module.scss';
import { CardLink, Page, RewardsPopup } from '@shared/ui';
import { StudentFeedback } from '@features/feedback/';
import { Button } from '@shared/ui';
import { useState } from 'react';

export default function studentMainPage() {
	const [reward, setReward] = useState(false);
	const tempArray = Array(2).fill(0);
	return (
		<Page title="Главная страница">
			<CardLink
				title={'Мои награды'}
				className={styles.reward_img}
				onClick={() => setReward(true)}
			/>
			{reward && <RewardsPopup onHide={() => setReward(false)} />}
			<CardLink to="/train" title={'Мои тренировки'}>
				<span className={styles.train_text}>тренер оценил вашу тренировку</span>
			</CardLink>
			<CardLink
				to="/check-list"
				title={'Мои чек-листы'}
				className={styles.card_cont}
			/>
			<CardLink
				to="/schedule"
				title={'Мои расписание на сегодня'}
				className={styles.card_cont}
			>
				<div className={styles.schedule_container}>
					{tempArray.map((_, index) => (
						<div key={index} className={styles.shedule_item}>
							<span className={styles.shedule_item_time}>12:50</span>
							<span> - </span>
							<span>
								1 площадка, <br /> тренер - Ильина Анастасия
							</span>
						</div>
					))}
				</div>
			</CardLink>
			<StudentFeedback />
			<Button
				title={'Написать тренеру'}
				width="334px"
				height="64px"
				className={styles.btn}
			/>
		</Page>
	);
}
