import styles from './Emoji.module.scss';
import { Button } from '@shared/ui';

export default function AppraisalPage() {
	return (
		<>
			<div className={styles.buttons_container}>
				<Button width="335px" title="Добавить эмоцию" />
				<div className={styles.emoji}></div>
				<Button width="335px" title="Отправить комментарий" />
			</div>
		</>
	);
}
