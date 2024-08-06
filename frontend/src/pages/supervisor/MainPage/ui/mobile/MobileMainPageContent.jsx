import styles from './MobileMainPageContent.module.scss';
import { Page } from '@shared/ui';
import { Notification } from '@widgets/notification';
// import { ScheduleCard } from '@features/schedule';
import { Button } from '@shared/ui';
import {
	ProgressCardLink,
	AnalyticCardLink,
	EvaluationCardLink
} from '@features/navigationLinks';

export const MobileMainPageContent = () => {
	return (
		<Page title="Главная страница">
			<div className={styles.wrapper}>
				<Notification />
				<div className={styles.schedule_wrapper}>
					{/* <ScheduleCard to={'/schedule'} /> */}
					<Button title="Ученики" />
					<Button title="Тренеры" />
				</div>
			</div>
			<div className={styles.analytic_wrapper}>
				<ProgressCardLink />
				<AnalyticCardLink />
			</div>
			<EvaluationCardLink />
		</Page>
	);
};
