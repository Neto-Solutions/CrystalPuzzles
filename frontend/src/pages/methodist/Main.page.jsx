import styles from './Main.page.module.scss';
import Page from '@components/page/Page';
import Notification from '@components/notification/Notification';
import CardLink from '../../components/card/card.link/Card.link';
import Schedule from '../../components/schedule/schedule.card/Schedule';

export default function MainPage() {
	return (
		<Page title="Главная страница">
			<CardLink
				to="/progress"
				title="Графики прогресса"
				className={styles.progress_graph}
			/>
			<CardLink to="/analytic" title="Аналитика" className={styles.analitic} />
			<CardLink
				to="/evaluation"
				title="Таблицы"
				className={styles.evaluation}
			/>
			<Notification />
			<Schedule to={'/schedule'} />
		</Page>
	);
}
