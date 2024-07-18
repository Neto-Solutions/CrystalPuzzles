import { useState } from 'react';
import { Page, Button } from '@shared/ui';
import { Notification } from '@widgets/notification';
import { ScheduleCard } from '@features/schedule';
import { NotificationModal } from '../../../shared/ui/popups/NotificationModal/NotificationModal';
// import { ExerciseList } from '@features/exercise.list';

export default function MainPage() {
	const [notification, setNotification] = useState(true);
	return (
		<Page title="Главная страница">
			{notification && (
				<NotificationModal onHide={() => setNotification(false)} />
			)}
			<Notification />
			<ScheduleCard>
				<Button title="Сформировать чек-лист" />
			</ScheduleCard>
			{/* <ExerciseList /> */}
		</Page>
	);
}
