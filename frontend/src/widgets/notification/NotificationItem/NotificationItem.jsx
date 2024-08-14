import styles from './NotificationItem.module.scss';

export const NotificationItem = () => {
	return (
		<li className={styles.item}>
			<p className={styles.text}>
				<span>Михаил</span>
				выполнил все задания
			</p>
		</li>
	);
};
