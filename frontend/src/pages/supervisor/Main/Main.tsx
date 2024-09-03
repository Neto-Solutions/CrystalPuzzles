import styles from './Main.module.scss';
import { Page, CardLink } from '@shared/ui';
import { Notification } from '@widgets';
import { EvaluationCardLink } from './EvaluationCardLink/EvaluationCardLink';
import { AnalyticCardLink } from './AnalyticCardLink/AnalyticCardLink';
import { ProgressCardLink } from './ProgressCardLink/ProgressCardLink';
import { ScheduleList } from '@features';

interface MainPageProps {
	title: string;
}
export default function MainPage({ title }: MainPageProps) {
	return (
		<Page title={title}>
			<div className={styles.page_wrapper}>
				<ProgressCardLink className={styles.progress} />
				<AnalyticCardLink className={styles.analytic} />
				<EvaluationCardLink className={styles.evaluation} />
				<CardLink title={'Расписание'} className={styles.schedule_wrapper}>
					<ScheduleList link="/schedule" />
				</CardLink>
				<Notification className={styles.notification} />
			</div>
		</Page>
	);
}
