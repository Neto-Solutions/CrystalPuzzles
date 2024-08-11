import styles from './Main.module.scss';
import { Page, CardLink, ScheduleCard } from '@shared/ui';
import { Notification } from '@widgets';
import { useResize } from '@hooks';
import { useLoaderData } from 'react-router-dom';

export default function MainPage() {
	const { lessons } = useLoaderData();
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
					{!isMobile && <ScheduleCard data={lessons} />}
				</CardLink>
			</div>
		</Page>
	);
}
