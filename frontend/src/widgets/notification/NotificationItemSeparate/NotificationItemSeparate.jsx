import Button from '@shared/ui/button/Button';
import styles from './NotificationItemSeparate.module.scss';

export const NotificationItemSeparate = () => {
	return (
		<li className={styles.item}>
			<p className={styles.text}>
				<span>Михаил</span>
				выполнил все задания
			</p>
			<Button title="Открыть" className={styles.btn} />
		</li>
	);
};
