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
import { useNavigate } from 'react-router-dom';

export const DesktopMainPageContent = () => {
	const navigate = useNavigate();
	return (
		<Page title="Главная страница">
			<ProgressCardLink />
			<AnalyticCardLink />
			<EvaluationCardLink />
			<Notification />
			<div className={styles.wrapper}>
				<ScheduleCard to={'/schedule'} />
				<Button
					title="Ученики"
					width="100%"
					onClick={() => {
						navigate('/students');
					}}
				/>
				<Button
					title="Тренеры"
					width="100%"
					onClick={() => {
						navigate('/trainers/15752');
					}}
				/>
			</div>
		</Page>
	);
};
