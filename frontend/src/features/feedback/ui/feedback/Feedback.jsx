import styles from './Feedback.module.scss';
import { Button } from '@shared/ui';
export default function Feedback({ placeholder }) {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.title}>Оставить комментарий методисту</div>
				<textarea
					className={styles.textarea}
					name=""
					id=""
					placeholder={placeholder}
				/>
			</div>
			<Button title="Отправить" className={styles.button} />
		</>
	);
}
