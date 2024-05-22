import './Notification.page.scss';
import Page from '@shared/ui/page/Page';
import { Notification } from '@widgets/notification';

export default function NotificationPage() {
	return (
		<Page title="Уведомления">
			<Notification array={Array(6).fill('')} isPage />
		</Page>
	);
}
