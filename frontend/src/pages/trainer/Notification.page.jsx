import './Notification.page.scss';
import Page from '@components/page/Page';
import Notification from '@components/notification.block/Notification';

export default function NotificationPage() {
	return (
		<Page title="Уведомления">
			<Notification array={Array(6).fill('')} isPage />
		</Page>
	);
}
