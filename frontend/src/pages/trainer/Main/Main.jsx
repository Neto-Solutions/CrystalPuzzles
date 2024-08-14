import styles from './Main.module.scss';
import { Page, CardLink, ScheduleCard } from '@shared/ui';
import { Notification } from '@widgets/notification';
import { useResize } from '@hooks';
import { Link, useLoaderData } from 'react-router-dom';
import Button from '@shared/ui/button/Button';

export default function MainPage() {
	const { lessons } = useLoaderData();
	const isMobile = useResize('sm');

	return (
		<Page title="Главная страница">
			<div className={styles.wrapper}>
				<CardLink
					to="/schedule"
					title={'Расписание'}
					className={styles.schedule_card}
				>
					<ScheduleCard data={lessons} />
				</CardLink>
				{isMobile ? (
					<Link to={'/notifications'}>
						<Button title="Уведомления" />
					</Link>
				) : (
					<Notification className={styles.notifications} />
				)}
			</div>
		</Page>
	);
}
