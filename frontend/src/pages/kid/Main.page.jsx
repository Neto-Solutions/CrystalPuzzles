import styles from './Main.page.module.scss';
import reward_animal from '@assets/svg/reward_animal.svg';
import CardLink from '@components/card/card.link/Card.link';
import Page from '@components/page/Page';
import Feedback from '@components/feedback/kid/';
export default function kidMainPage() {
	const tempArray = Array(2).fill(0);
	return (
		<Page title="Главная страница">
			<CardLink to="/rewards" title={'Мои награды'}>
				<img className={styles.reward_img} src={reward_animal} alt="" />
			</CardLink>
			<CardLink to="/train" title={'Мои тренировки'}>
				<span className={styles.train_text}>тренер оценил вашу тренировку</span>
			</CardLink>
			<CardLink to="/check-list" title={'Мои чек-листы'} />
			<CardLink to="/schedule" title={'Мои расписание на сегодня'}>
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
			<Feedback />
		</Page>
	);
}
