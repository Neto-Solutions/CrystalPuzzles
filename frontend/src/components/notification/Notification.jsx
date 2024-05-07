import styles from './Notification.module.scss';
import Title from '../title/Title';
import Button from '../button/Button';
export default function Notification({
	array = Array(2).fill(''),
	isPage = false
}) {
	return (
		<section className={styles.container}>
			<Title tag="h2" className={styles.title}>
				Уведомления
			</Title>
			<div className={styles.notifications}>
				{array.map((_, index) => (
					<div key={index} className={styles.notification_item}>
						<p className={styles.notification_item_text}>
							Михаил выполнил все задания
						</p>
						<Button title="Открыть" className={styles.button} />
					</div>
				))}
			</div>
			{!isPage && <Button title="Показать все" className={styles.button} />}
		</section>
	);
}
