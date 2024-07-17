import { Page, Button } from '@shared/ui';
import { Notification } from '@widgets/notification';
import { ScheduleCard } from '@features/schedule';
import { ExerciseList } from '@features/exercise.list';

export default function MainPage() {
	return (
		<Page title="Главная страница">
			<Notification />
			<ScheduleCard>
				<Button title="Сформировать чек-лист" />
			</ScheduleCard>
			<ExerciseList />
		</Page>
	);
}
