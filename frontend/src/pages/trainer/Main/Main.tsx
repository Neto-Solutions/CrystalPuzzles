import styles from './Main.module.scss';
import { Page, CardLink } from '@shared/ui';
import { ScheduleList } from '@features';
import { Notification } from '@widgets';
import { useResize } from '@hooks';
import { Link } from 'react-router-dom';
import Button from '@shared/ui/button/Button';

export default function MainPage() {
	const isMobile = useResize('sm');

	return (
		<Page title="Главная страница">
			<div className={styles.wrapper}>
				<CardLink
					to="/schedule"
					title={'Расписание'}
					className={styles.schedule_card}
				>
					<ScheduleList />
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
