import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';
import Notification from '@components/notification.block/Notification';
import Schedule from '@components/schedule.block/Schedule';
import CheckList from '../../components/check.list.block/Check.list';

export default function MainPage() {
	return (
		<>
			<PageContainer.Header title="Главная страница" />
			<PageContainer.Body>
				<Notification />
				<Schedule>
					<Button title="Сформировать чек-лист" />
				</Schedule>
				<CheckList />
			</PageContainer.Body>
		</>
	);
}
