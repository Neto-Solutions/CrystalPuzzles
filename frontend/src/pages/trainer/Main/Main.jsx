import styles from './Main.module.scss';
import { Page, Button, CardLink } from '@shared/ui';
import { Notification } from '@widgets/notification';
import Schedule from '@features/schedule/Schedule';
import { useResize } from '@hooks';
// import { ExerciseList } from '@features/exercise.list';

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
					{!isMobile && <Schedule />}
				</CardLink>

				<div className={styles.button_container}>
					<Button title="Сформировать чек-лист" className={styles.button} />
				</div>
				{/* <ExerciseList /> */}
			</div>
		</Page>
	);
}
