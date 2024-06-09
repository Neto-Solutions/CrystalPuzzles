import styles from './Feedback.module.scss';
import { Button } from '@shared/ui';
export default function Feedback() {
	
	
	return (
		<div className={styles.container}>
			<div className={styles.textarea_container}>
				<div className={styles.title}>Оставить комментарий тренеру</div>
				<textarea className={styles.textarea} name="" id="" />
			</div>
			<Button title="Отправить комментрарий" width="100%" />
		</div>
	);
}
