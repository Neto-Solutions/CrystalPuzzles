import styles from './Main.module.scss';
import { Page, CardLink, Button } from '@shared/ui';
import { ScheduleList } from '@features';
import { Notification } from '@widgets';
import { useResize } from '@hooks';
import { Link } from 'react-router-dom';

interface MainPageProps {
	title: string;
}

export default function MainPage({ title }: MainPageProps) {
	const isMobile = useResize('sm');

	return (
		<Page title={title}>
			<div className={styles.wrapper}>
				<CardLink title={'Расписание'} className={styles.schedule_card}>
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
			<Link to={'/exercise'}>Занятия</Link>
		</Page>
	);
}
