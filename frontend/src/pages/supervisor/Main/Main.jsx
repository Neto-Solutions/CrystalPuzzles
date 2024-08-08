import styles from './Main.module.scss';
import { useNavigate } from 'react-router-dom';
import { Page, Button } from '@shared/ui';
import { Notification } from '@widgets/notification';
import { EvaluationCardLink } from './EvaluationCardLink/EvaluationCardLink';
import { AnalyticCardLink } from './AnalyticCardLink/AnalyticCardLink';
import { ProgressCardLink } from './ProgressCardLink/ProgressCardLink';

export default function MainPage() {
	const navigate = useNavigate();
	return (
		<Page title="Главная страница">
			<ProgressCardLink />
			<AnalyticCardLink />
			<EvaluationCardLink />
			<Notification />
			<div className={styles.wrapper}>
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
			</div>
		</Page>
	);
}
