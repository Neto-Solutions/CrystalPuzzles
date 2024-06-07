import styles from './Appraisal.page.module.scss';
import { Page, Button } from '@shared/ui';

export default function AppraisalPage() {
	return (
		<Page title="Оценка">
			<div className={styles.input_container}>
				<div className={styles.title}>Оставить комментарий тренеру</div>
				<textarea className={styles.textarea} name="" id="" />
			</div>
			<div className={styles.buttons_container}>
				<Button title="Добавить эмоцию" />
				<div className={styles.emoji}></div>
				<Button title="Отправить комментарий" />
			</div>
		</Page>
	);
}
