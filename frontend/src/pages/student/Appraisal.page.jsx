import styles from './Appraisal.page.module.scss';
import { Page, Button } from '@shared/ui';
import { Feedback } from '@features/feedback';
import { Wrapper } from '@shared/ui';
export default function AppraisalPage() {
	return (
		<Page title="Оценка">
			<Wrapper width="100%" max_width="714px">
				<Feedback>Оставить комментарий тренеру</Feedback>
				<Button title="Отправить комментрарий" width="100%" />
			</Wrapper>
			<div className={styles.buttons_container}>
				<Button title="Добавить эмоцию" />
				<div className={styles.emoji}></div>
				<Button title="Отправить комментарий" />
			</div>
		</Page>
	);
}
