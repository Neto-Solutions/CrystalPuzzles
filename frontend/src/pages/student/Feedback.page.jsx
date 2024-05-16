import styles from './Feedback.page.module.scss';
import Page from '@shared/ui/page/Page';
import Button from '@shared/ui/button/Button';
import Feedback from '@widgets/feedback/student/';
export default function FeedbackPage() {
	return (
		<Page title="Обратная связь">
			<Feedback />
			<Button className={styles.button} title="Выберите тренера" downArrow />
		</Page>
	);
}
