import styles from './Main.page.module.scss';
import { Page } from '@shared/ui';
import { Notification } from '@widgets/notification';
import { CardLink } from '@shared/ui/card';
import { ScheduleCard } from '@features/schedule';

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
			<ScheduleCard to={'/schedule'} />
		</Page>
	);
}
