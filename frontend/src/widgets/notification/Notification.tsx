import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useResize } from '@shared/hooks';
import { Title } from '@shared/ui';
import { NotificationItem } from './NotificationItem/NotificationItem';
import { NotificationItemSeparate } from './NotificationItemSeparate/NotificationItemSeparate';
import styles from './Notification.module.scss';

export default function Notification({
	array = Array(2).fill(''),
	className
}: any) {
	const navigate = useNavigate();
	const location = useLocation();
	const isMainPage = location.pathname === '/';
	const isMobile = useResize('sm');

	return (
		<section
			className={classNames(
				isMainPage ? styles.container : styles.container_separate,
				className
			)}
			onClick={() => navigate('/notifications')}
		>
			{isMainPage && (
				<Title tag="h2" className={styles.title}>
					Уведомления
				</Title>
			)}
			{isMobile ? (
				<div className={styles.wrapper}>
					<div className={styles.notification_wrapper}>
						<ul className={styles.notifications}>
							{array.map((_: any, index: number) =>
								isMainPage ? (
									<NotificationItem key={index} />
								) : (
									<NotificationItemSeparate key={index} />
								)
							)}
						</ul>
					</div>
				</div>
			) : (
				<ul className={styles.notifications}>
					{array.map((_: any, index: number) =>
						isMainPage ? (
							<NotificationItem key={index} />
						) : (
							<NotificationItemSeparate key={index} />
						)
					)}
				</ul>
			)}
		</section>
	);
}
