import { Page, Button } from '@shared/ui';
import { Notification } from '@widgets/notification';
import { ScheduleCard } from '@features/schedule';
import { CheckList } from '@features/check.list';

export default function MainPage() {
	return (
		<Page title="Главная страница">
			<Notification />
			<ScheduleCard>
				<Button title="Сформировать чек-лист" />
			</ScheduleCard>
			<CheckList />
		</Page>
	);
}
