import { Page } from '@shared/ui';
import { Notification } from '@widgets';

export default function NotificationPage() {
	return (
		<Page title="Уведомления">
			<Notification array={Array(6).fill('')} isPage />
		</Page>
	);
}
