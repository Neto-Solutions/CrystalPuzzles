import styles from './Main.module.scss';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Page, CardLink } from '@shared/ui';
import { Notification } from '@widgets';
import { EvaluationCardLink } from './EvaluationCardLink/EvaluationCardLink';
import { AnalyticCardLink } from './AnalyticCardLink/AnalyticCardLink';
import { ProgressCardLink } from './ProgressCardLink/ProgressCardLink';
import ScheduleCard from '@shared/ui/scheduleCard/ScheduleCard';

export default function MainPage() {
	const navigate = useNavigate();
	const { lessons } = useLoaderData();

	return (
		<Page title="Главная страница">
			<div className={styles.page_wrapper}>
				<ProgressCardLink className={styles.progress} />
				<AnalyticCardLink className={styles.analytic} />
				<EvaluationCardLink className={styles.evaluation} />
				<CardLink title={'Расписание'} className={styles.schedule_wrapper}>
					<ScheduleCard data={lessons} />
				</CardLink>
				<Notification className={styles.notification} />
				{/* <div className={styles.btns_wrapper}>
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
							navigate('/trainers');
						}}
					/>
				</div> */}
			</div>
		</Page>
	);
}
