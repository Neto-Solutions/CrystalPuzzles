import styles from './Feedback.page.module.scss';
import Page from '@shared/ui/page/Page';
import Button from '@shared/ui/button/Button';

export default function FeedbackPage() {
	return (
		<Page title="Обратная связь">
			<div className={styles.container}>
				<div className={styles.title}>Оставить комментарий методисту</div>
				<textarea className={styles.textarea} name="" id="" />
			</div>
			<Button title="Отправить" className={styles.button} />
		</Page>
	);
}
