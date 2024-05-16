import Page from '@shared/ui/page/Page';
import Button from '@shared/ui/button/Button';
import Notification from '@widgets/notification/Notification';
import Schedule from '@widgets/schedule/schedule.card/Schedule';
import CheckList from '@widgets/check.list/Check.list';

export default function MainPage() {
	return (
		<Page title="Главная страница">
			<Notification />
			<Schedule>
				<Button title="Сформировать чек-лист" />
			</Schedule>
			<CheckList />
		</Page>
	);
}
