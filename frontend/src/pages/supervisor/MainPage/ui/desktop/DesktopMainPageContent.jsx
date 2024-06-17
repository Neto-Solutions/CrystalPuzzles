import { Page } from '@shared/ui';
import { Notification } from '@widgets/notification';
import { ScheduleCard } from '@features/schedule';
import { Button } from '@shared/ui';
import {
	EvaluationCardLink,
	AnalyticCardLink,
	ProgressCardLink
} from '@features/navigationLinks';
import styles from './DesktopMainPageContent.module.scss';

export const DesktopMainPageContent = () => {
	return (
		<Page title="Главная страница">
			<ProgressCardLink />
			<AnalyticCardLink />
			<EvaluationCardLink />
			<Notification />
			<div className={styles.wrapper}>
				<ScheduleCard to={'/schedule'} />
				<Button title="Ученики" width='100%' />
				<Button title="Тренеры" width='100%' />
			</div>
		</Page>
	);
};
