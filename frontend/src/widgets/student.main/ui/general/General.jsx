import styles from './General.module.scss';
import { useState } from 'react';
import { Feedback } from '@features/feedback';
import { Wrapper } from '@shared/ui';
import { CardLink, RewardsPopup, Button } from '@shared/ui';
import { useResize } from '@shared/hooks';

export default function General() {
	const [reward, setReward] = useState(false);
	const tempArray = Array(2).fill(0);
	const isMobile = useResize('sm');
	return (
		<>
			<CardLink
				title={'Мои награды'}
				className={styles.reward_img + ' ' + styles.card_cont}
				onClick={() => setReward(true)}
			/>
			{reward && <RewardsPopup onHide={() => setReward(false)} />}
			<CardLink
				to="/train"
				title={'Мои тренировки'}
				className={styles.card_cont}
			>
				<span className={styles.train_text}>тренер оценил вашу тренировку</span>
			</CardLink>
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
			{isMobile ? (
				<Button
					title="Написать тренеру"
					width="334px"
					height="64px"
					className={styles.btn}
				/>
			) : (
				<Wrapper width="100%" max_width="714px">
					<Feedback>Обратная связь</Feedback>
					<Button title="Отправить комментарий" width="100%" />
				</Wrapper>
			)}
		</>
	);
}
