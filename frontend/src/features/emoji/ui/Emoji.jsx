import styles from './Emoji.module.scss';
import { Button } from '@shared/ui';

export default function AppraisalPage() {
	return (
		<>
			<div className={styles.buttons_container}>
				<Button title="Добавить эмоцию" />
				<div className={styles.emoji}></div>
				<Button title="Отправить комментарий" />
			</div>
		</>
	);
}
