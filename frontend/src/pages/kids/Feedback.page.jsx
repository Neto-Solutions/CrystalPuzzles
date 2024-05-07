import styles from './Feedback.page.module.scss';
import Page from '@components/page/Page';
import Button from '@components/button/Button';
import Feedback from '@components/feedback.kids/Feedback';
export default function FeedbackPage() {
	return (
		<Page title="Обратная связь">
			<Feedback />
			<Button className={styles.button} title="Выберите тренера" downArrow />
		</Page>
	);
}
