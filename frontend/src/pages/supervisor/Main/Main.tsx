import styles from './Main.module.scss';
import { Page, CardLink } from '@shared/ui';
import { Notification } from '@widgets';
import { EvaluationCardLink } from './EvaluationCardLink/EvaluationCardLink';
import { AnalyticCardLink } from './AnalyticCardLink/AnalyticCardLink';
import { ProgressCardLink } from './ProgressCardLink/ProgressCardLink';
import { ScheduleList } from '@features';

export default function MainPage() {
	return (
		<Page title="Главная страница">
			<div className={styles.page_wrapper}>
				<ProgressCardLink className={styles.progress} />
				<AnalyticCardLink className={styles.analytic} />
				<EvaluationCardLink className={styles.evaluation} />
				<CardLink title={'Расписание'} className={styles.schedule_wrapper}>
					<ScheduleList />
				</CardLink>
				<Notification className={styles.notification} />
			</div>
		</Page>
	);
}
