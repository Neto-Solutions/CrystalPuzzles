import styles from './Feedback.page.module.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';

export default function FeedbackPage() {
	return (
		<>
			<PageContainer.Header title="Обратная связь" />
			<PageContainer.Body>
				<div className={styles.container}>
					<div className={styles.title}>
						Оставить комментарий методисту
					</div>
					<textarea className={styles.textarea} name="" id="" />
				</div>
				<Button title="Отправить" className={styles.button} />
			</PageContainer.Body>
		</>
	);
}
