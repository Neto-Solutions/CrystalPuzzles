import styles from './Main.module.scss';
import { Page, CardLink, ScheduleCard } from '@shared/ui';
import { Notification } from '@widgets/notification';
import { useResize } from '@hooks';

export default function MainPage() {
	const isMobile = useResize('sm');

	return (
		<Page title="Главная страница">
			<div className={styles.wrapper}>
				<Notification className={styles.notifications} />

				<CardLink
					to="/schedule"
					title={'Расписание'}
					className={styles.schedule_card}
				>
					{!isMobile && <ScheduleCard />}
				</CardLink>
			</div>
		</Page>
	);
}
