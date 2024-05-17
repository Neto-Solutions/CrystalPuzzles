import Page from '@shared/ui/page/Page';
import Button from '@shared/ui/button/Button';
import { Notification } from '@widgets/notification';
import { ScheduleCard } from '@widgets/schedule';
import CheckList from '@widgets/check.list';

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
