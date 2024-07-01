import { Page } from '@shared/ui';
import { Notification } from '@widgets/notification';

export default function NotificationPage() {
	return (
		<Page title="Уведомления">
			<Notification isPage array={Array(6).fill('')} />
		</Page>
	);
}
