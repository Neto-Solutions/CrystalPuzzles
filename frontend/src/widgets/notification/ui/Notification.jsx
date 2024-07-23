import styles from './Notification.module.scss';
import { Title, Button } from '@shared/ui';
import { useRef, useState } from 'react';
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
			<div className={styles.cont_bottom_decor}></div>
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
	const ref = useRef(null);
	return (
		<>
			<div className={styles.notification_item}>
				<p className={styles.notification_item_text}>
					Михаил выполнил все задания
				</p>
				<Button
					title={isOpen ? 'Ответить' : 'Открыть'}
					className={styles.button}
					onClick={() => {
						isOpen ? ref.current.focus() : setIsOpen(!isOpen);
					}}
				/>
			</div>
			{isOpen && (
				<textarea
					ref={ref}
					name=""
					id=""
					className={styles.textarea}
					placeholder="Михаил из группы “Пингвинята” выполнил задание 1ой сложности "
				/>
			)}
		</>
	);
}
