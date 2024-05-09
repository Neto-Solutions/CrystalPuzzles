import styles from './Notification.module.scss';
import Title from '../title/Title';
import Button from '../button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Notification({
	array = Array(2).fill(''),
	isPage = false
}) {
	const navigate = useNavigate();
	return (
		<section className={styles.container}>
			<Title tag="h2" className={styles.title}>
				Уведомления
			</Title>
			<div className={styles.notifications}>
				{array.map((_, index) => (
					<NotificationItem key={index} />
				))}
			</div>
			{!isPage && (
				<Button
					title="Показать все"
					className={styles.button}
					onClick={() => navigate('/notifications')}
				/>
			)}
		</section>
	);
}

function NotificationItem() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div className={styles.notification_item}>
				<p className={styles.notification_item_text}>
					Михаил выполнил все задания
				</p>
				<Button
					title="Открыть"
					className={styles.button}
					onClick={() => setIsOpen(!isOpen)}
				/>
			</div>
			{isOpen && (
				<textarea
					name=""
					id=""
					className={styles.textarea}
					value="Михаил из группы “Пингвинята” выполнил задание 1ой сложности "
				/>
			)}
		</>
	);
}
